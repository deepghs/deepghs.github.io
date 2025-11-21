<template>
  <UPage>
    <UPageHeader
      title="Models"
      description="models for distinguishing anime from real images, categorizing artwork styles, detecting anthropomorphic characters, predicting visual appeal, and recognizing decade-specific styles"
    />
    <UPageBody>
      <DSearchArea
        :data="indexedModels"
        :fields="['repo_id', 'name', 'abstract', 'bio']"
        :store-fields="searchStoreFields"
        :show-result="false"
        @after-search="afterSearch"
      />
      <div class="w-full flex flex-row justify-between items-center select-none">
        <div class="inline-flex items-center">
          <span class="mr-2">Modalities:</span>
          <URadioGroup
            v-model="filterModality"
            orientation="horizontal"
            variant="table"
            size="xs"
            default-value="ALL"
            :items="modalities"
          />
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
      <UEmpty v-if="sortedModels.length === 0" title="No projects found" />
      <UPageGrid v-else>
        <DWorkCard
          v-for="(model, index) in sortedModels"
          :id="model.repo_id"
          :key="index"
          class="select-none"
          :repo="model"
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
        <UCheckboxGroup
          v-model="filterTaskTypeTags"
          class="ml-5 select-none"
          indicator="end"
          variant="table"
          :items="filteredTaskTypes"
          :ui="{
            label: 'text-xs'
          }"
        />
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
import OurModels from '@/json/works/models.json'
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

const taskTypes = Array.from(
  new Set(OurModels.flatMap(model => model.task_types))
)

const modalities = computed(() => {
  const origin = Array.from(
    new Set(OurModels.flatMap(model => model.modality))
  )
  return ['ALL', ...origin]
})

const filteredTaskTypes = computed(() => {
  const filter = searchFilter.value.toLowerCase()
  return taskTypes.filter(taskType =>
    taskType.toLowerCase().includes(filter)
  )
})

const searchModels = ref<Array<DeepGHSProject> | undefined>(undefined)

const indexedModels = computed(() => {
  const datasets = OurModels.map((model, index) => {
    return {
      ...model,
      id: index,
      repo_type: 'model' as const,
      name: formatRepoName(model.repo_id)
    }
  })
  return datasets
})

const sortedModels = computed(() => {
  const unSorted = searchModels.value || indexedModels.value
  let filtered = unSorted.filter((model) => {
    return (
      filterTaskTypeTags.value.length === 0
      || model.task_types?.some(taskType =>
        filterTaskTypeTags.value.includes(taskType)
      )
    )
  })

  if (filterModality.value !== 'ALL') {
    filtered = filtered.filter(model =>
      model.modality?.includes(filterModality.value)
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
  searchModels.value = result
}
</script>

<style lang="scss" scoped></style>
