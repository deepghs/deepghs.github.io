<template>
  <UPageCard
    :class="{
      'lg:col-span-3': detailOpened
    }"
    :ui="{
      header: 'w-full',
      body: 'w-full',
      footer: 'w-full'
    }"
  >
    <template #header>
      <div>
        <div class="text-base text-pretty font-semibold text-highlighted">
          {{ repo.name }}
        </div>
        <div class="text-[15px] text-pretty text-muted mt-1">
          {{ repo.bio }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex w-full items-center mb-2">
        <div class="flex-1 flex items-center select-none">
          <div class="flex items-center">
            <UIcon name="basil:heart-solid" class="size-5" size="xs" />
            <span class="ml-2 text-xs text-gray-500"> {{ repo.likes }} </span>
          </div>
          <div v-if="repo.repo_type !== 'space'" class="flex items-center ml-4">
            <UIcon name="mdi:download" class="size-5" size="xs" />
            <span class="ml-2 text-xs text-gray-500">
              {{ repo.downloads }}
            </span>
          </div>
        </div>
        <UButton color="primary" size="sm" @click.prevent="onExpandBtnClicked">
          More
        </UButton>
      </div>
      <UCollapsible :open="detailOpened" class="flex flex-col gap-2">
        <template #content>
          <div class="flex flex-row flex-wrap jsutify-start align-center items-center mt-2">
            <span class="text-xs text-gray-500 mr-2">Modality:</span>
            <UButton
              v-for="mod in repo.modality"
              :key="'md-' + mod"
              color="primary"
              variant="subtle"
              size="xs"
              class="rounded-full mr-1 mb-1"
            >
              {{ mod }}
            </UButton>
          </div>
          <USeparator />
          <div class="flex flex-row flex-wrap jsutify-start align-center items-center mt-2">
            <span class="text-xs text-gray-500 mr-2">Task Types:</span>
            <UButton
              v-for="task_type in repo.task_types"
              :key="'tt-' + task_type"
              color="primary"
              variant="subtle"
              size="xs"
              class="rounded-full mr-1 mb-1"
            >
              {{ task_type }}
            </UButton>
          </div>
          <USeparator />
          <div class="flex flex-row flex-wrap jsutify-start align-center items-center mt-2">
            <span class="text-xs text-gray-500 mr-2">Libraries:</span>
            <UButton
              v-for="library in repo.libraries"
              :key="'lr-' + library"
              color="primary"
              variant="subtle"
              size="xs"
              class="rounded-full mr-1 mb-1"
            >
              {{ library }}
            </UButton>
          </div>
          <USeparator />
          <div class="flex flex-row flex-wrap jsutify-start align-center items-center mt-2">
            <span class="text-xs text-gray-500 mr-2">Keywords:</span>
            <UButton
              v-for="keyword in repo.keywords"
              :key="'kw-' + keyword"
              color="primary"
              variant="subtle"
              class="text-xs rounded-full px-2 py-1 mr-2 mb-2"
            >
              {{ keyword }}
            </UButton>
          </div>
          <USeparator />
          <div class="my-2">
            <div class="text-xs text-gray-500">
              {{ repo.abstract }}
            </div>
          </div>
          <USeparator />
          <div class="mt-2">
            <div class="flex flex-row-reverse w-full items-center">
              <UButton
                color="primary"
                icon="logos:hugging-face-icon"
                size="sm"
                :to="`https://huggingface.co/${repo.repo_type}s/${repo.repo_id}`"
                variant="outline"
                trailing-icon="i-lucide-arrow-right"
                target="_blank"
              >
                Repo
              </UButton>
            </div>
          </div>
        </template>
      </UCollapsible>
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
import type { DeepGHSProject } from '@/types/projects'

const { repo } = defineProps({
  repo: {
    type: Object as () => DeepGHSProject,
    required: true
  }
})

const detailOpened = ref(false)

function onExpandBtnClicked() {
  console.log('onExpandBtnClicked')
  detailOpened.value = !detailOpened.value
}
</script>
