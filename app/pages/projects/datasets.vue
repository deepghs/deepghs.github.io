<template>
  <UPage>
    <UPageHeader
      title="Datasets"
      description="Danbooru2024, Sankaku, Gelbooru, Yand.re, Rule34, and more."
    />
    <UPageBody>
      <DSearchArea
        :data="indexedDatasets"
        :fields="['repo_id', 'name', 'abstract', 'bio']"
        :store-fields="searchStoreFields"
        :show-result="false"
        @after-search="afterSearch"
      />
      <div class="w-full flex flex-row justify-between items-center select-none">
        <div class="inline-flex items-center">
          <span class="mr-2">Modalities:</span>
          <DRadioGroup
            v-model="filterModality"
            orientation="horizontal"
            size="xs"
            :options="modalityOptions"
          >
            <template #right="{ option }">
              <UBadge class="font-bold rounded" size="xs" variant="outline">
                {{ modalityCounts[option.value as string] ?? 0 }}
              </UBadge>
            </template>
          </DRadioGroup>
        </div>
        <div class="inline-flex items-center">
          <span class="mr-2">Sort by:</span>
          <UDropdownMenu
            :items="sortOptions"
            :ui="{
              content: 'w-34'
            }"
          >
            <UButton
              class="w-34"
              :label="currentSortMode"
              :icon="currentSortIcon"
              color="neutral"
              variant="outline"
            />
          </UDropdownMenu>
        </div>
      </div>
      <UEmpty v-if="sortedDatasets.length === 0" title="No projects found" />
      <UPageGrid v-else>
        <DWorkCard
          v-for="(dataset, index) in sortedDatasets"
          :id="dataset.repo_id"
          :key="index"
          class="select-none"
          :repo="dataset"
        />
      </UPageGrid>
    </UPageBody>

    <template #left>
      <UPageAside>
        <template #top>
          <UInput
            ref="input"
            v-model="searchFilter"
            variant="soft"
            placeholder="Filter..."
            class="group ml-5"
          >
            <template #trailing>
              <UKbd
                value="/"
                variant="subtle"
                class="ring-muted bg-transparent text-muted"
              />
            </template>
          </UInput>
        </template>
        <DListCheckboxGroup
          v-model="filterTaskTypeTags"
          class="ml-5 select-none"
          indicator="end"
          variant="table"
          :items="filteredTaskTypes"
        >
          <template #right="{ item }">
            <UBadge class="font-bold rounded" size="sm" variant="outline">
              {{ item.rightText }}
            </UBadge>
          </template>
        </DListCheckboxGroup>
      </UPageAside>
    </template>
    <template #right>
      <UPageAside>
        <UPageLinks :links="rightLinks" />
      </UPageAside>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import OurDatasets from '@/json/works/datasets.json'
import type { DropdownMenuItem } from '@nuxt/ui'
import type { DeepGHSProject } from '~/types/projects'

const currentSortMode = ref('Downloads')
const currentSortIcon = ref('mdi:download')

const searchFilter = ref('')
const filterModality = ref('ALL')
const filterTaskTypeTags = ref<string[]>([])

const searchStoreFields = [
  'repo_id',
  'repo_type',
  'name',
  'abstract',
  'bio',
  'likes',
  'downloads',
  'keywords',
  'task_types',
  'modality',
  'libraries'
]

const rightLinks = [
  {
    label: 'Space',
    icon: 'mdi:application',
    to: '/projects/spaces'
  },
  {
    label: 'Models',
    icon: 'oui:nav-models',
    to: '/projects/models'
  },
  {
    label: 'Datasets',
    icon: 'solar:database-bold',
    to: '/projects/datasets'
  },
  {
    label: 'Tools',
    icon: 'mdi:tools',
    to: '/projects/tools'
  }
]

// 去重后的任务类型集合
const taskTypes = Array.from(
  new Set(OurDatasets.flatMap(dataset => dataset.task_types))
)

// 预计算每个任务类型出现的次数，提升 filteredTaskTypes 计算性能
const taskTypeCounts = computed(() => {
  const map = new Map<string, number>()
  for (const ds of OurDatasets) {
    if (Array.isArray(ds.task_types)) {
      for (const t of ds.task_types) {
        map.set(t, (map.get(t) || 0) + 1)
      }
    }
  }
  return map
})

const modalities = computed(() => {
  const origin = Array.from(
    new Set(OurDatasets.flatMap(dataset => dataset.modality))
  )
  return ['ALL', ...origin]
})

const modalityOptions = computed(() =>
  modalities.value.map(value => ({ label: value, value }))
)

const modalityCounts = computed<Record<string, number>>(() => {
  const counts: Record<string, number> = {
    ALL: OurDatasets.length
  }

  for (const dataset of OurDatasets) {
    const mods = Array.isArray(dataset.modality)
      ? dataset.modality
      : dataset.modality
        ? [dataset.modality]
        : []

    for (const mod of mods) {
      counts[mod] = (counts[mod] || 0) + 1
    }
  }

  return counts
})

const filteredTaskTypes = computed(() => {
  const filter = searchFilter.value.toLowerCase()
  const filtered = taskTypes.filter(taskType =>
    taskType.toLowerCase().includes(filter)
  )

  return filtered.map(taskType => ({
    id: taskType,
    label: taskType,
    count: taskTypeCounts.value.get(taskType) || 0,
    rightText: String(taskTypeCounts.value.get(taskType) || 0)
  })).sort((a, b) => {
    return (b.count || 0) - (a.count || 0)
  })
})

const searchDatasets = ref<Array<DeepGHSProject> | undefined>(undefined)

const indexedDatasets = computed(() => {
  const datasets = OurDatasets.map((dataset, index) => {
    return {
      ...dataset,
      id: index,
      repo_type: 'dataset' as const,
      name: formatRepoName(dataset.repo_id)
    }
  })
  return datasets
})

const sortedDatasets = computed(() => {
  const unSorted = searchDatasets.value || indexedDatasets.value
  let filtered = unSorted.filter((dataset) => {
    return (
      filterTaskTypeTags.value.length === 0
      || dataset.task_types?.some(taskType =>
        filterTaskTypeTags.value.includes(taskType)
      )
    )
  })

  if (filterModality.value !== 'ALL') {
    filtered = filtered.filter(dataset =>
      dataset.modality?.includes(filterModality.value)
    )
  }

  if (currentSortMode.value === 'Likes') {
    return filtered.sort((a, b) => {
      if (b.likes == a.likes) {
        return (b.downloads || 0) - (a.downloads || 0)
      } else {
        return (b.likes || 0) - (a.likes || 0)
      }
    })
  } else {
    return filtered.sort((a, b) => {
      if (b.downloads == a.downloads) {
        return (b.likes || 0) - (a.likes || 0)
      } else {
        return (b.downloads || 0) - (a.downloads || 0)
      }
    })
  }
})

const sortOptions: DropdownMenuItem[] = [
  {
    label: 'Downloads',
    icon: 'mdi:download',
    onSelect: () => onSortChange('Downloads', 'mdi:download')
  },
  {
    label: 'Likes',
    icon: 'basil:heart-solid',
    onSelect: () => onSortChange('Likes', 'basil:heart-solid')
  }
]

function onSortChange(sort: string, icon: string) {
  currentSortMode.value = sort
  currentSortIcon.value = icon
}

function formatRepoName(repo_id: string): string {
  return repo_id
    .replace('deepghs/', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

function afterSearch(result: any) {
  searchDatasets.value = result
}
</script>

<style lang="scss" scoped></style>
