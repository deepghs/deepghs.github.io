<template>
  <div>
    <UPageHero :links="bannerLinks">
      <template #title>
        <BannerLogo class="h-30" />
        <span class="text-2xl text-gray-600 mt-2">{{
          indexConfig.banner.subTitle
        }}</span>
      </template>
      <template #description>
        <p>
          {{ indexConfig.banner.description }}
        </p>
      </template>
    </UPageHero>

    <!-- Our Works -->
    <UPageSection id="works">
      <template #title>
        {{ indexConfig.works.title }}
      </template>
      <template #description>
        <p>
          {{ indexConfig.works.description }}
        </p>
      </template>
      <template #body>
        <div class="space-y-10">
          <UCard
            v-for="module in featuredWorkModules"
            :key="module.id"
            variant="soft"
            class="space-y-4 rounded-2xl border border-gray-200/60 dark:border-gray-800/60"
            :ui="{
              header: 'p-4'
            }"
          >
            <template #header>
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 class="text-2xl font-semibold">
                    {{ module.title }}
                  </h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ module.description }}
                  </p>
                </div>
                <UButton
                  size="md"
                  color="primary"
                  variant="ghost"
                  :to="module.cta.to"
                  :disabled="module.cta.disabled"
                >
                  {{ module.cta.label }}
                </UButton>
              </div>
            </template>
            <UPageGrid v-if="module.repos && module.repos.length">
              <DWorkCard
                v-for="repo in module.repos"
                :key="repo.repo_id"
                :repo="repo"
              />
            </UPageGrid>
            <p
              v-else
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ module.emptyMessage }}
            </p>
          </UCard>
        </div>
      </template>
    </UPageSection>

    <UPageSection>
      <UPageCTA
        :title="indexConfig.cta.title"
        variant="subtle"
        :links="ctaLinks"
      >
        <template #description>
          <MDC :value="ctaMD" tag="article" />
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import indexConfig from '@/json/index/text.json'

import WorksTemplate from '~/json/index/works.json'

import OurDatasets from '~/json/works/datasets.json'
import OurModels from '~/json/works/models.json'
import OurSpaces from '~/json/works/spaces.json'
// import OurTools from '~/json/works/tools.json'

import type { ButtonProps } from '@nuxt/ui'
import type { DeepGHSProject } from '~/types/projects'
import type { WorkModule } from '~/types'

const bannerLinks: ButtonProps[] = indexConfig.banner.links as ButtonProps[]
const ctaLinks: ButtonProps[] = indexConfig.cta.links as ButtonProps[]

const formatRepoName = (repoId: string) => repoId.split('/')[1] ?? repoId

const normalizeRepo = (repo: DeepGHSProject) => {
  return {
    ...repo,
    name: repo.name ?? formatRepoName(repo.repo_id)
  }
}

const selectTopRepos = (
  items: DeepGHSProject[],
  metric: 'downloads' | 'likes',
  limit = 3
) => {
  return [...items]
    .sort((a, b) => (b[metric] ?? 0) - (a[metric] ?? 0))
    .slice(0, limit)
    .map(normalizeRepo)
}

// 从OurDatasets,OurModels,OurSpaces中各获取下载数最多的前三。
const mostFavoriteDatasets = selectTopRepos(
  OurDatasets as DeepGHSProject[],
  'likes'
)
const mostFavoriteModels = selectTopRepos(
  OurModels as DeepGHSProject[],
  'likes'
)
const mostFavoriteSpaces = selectTopRepos(
  OurSpaces as DeepGHSProject[],
  'likes'
)

const featuredWorkModules = computed<WorkModule[]>(() => {
  const modules: WorkModule[] = WorksTemplate.map((module) => {
    switch (module.id) {
      case 'datasets':
        return {
          ...module,
          repos: mostFavoriteDatasets,
          emptyMessage: 'Datasets will appear here once available.'
        }
      case 'models':
        return {
          ...module,
          repos: mostFavoriteModels,
          emptyMessage: 'Models will appear here once available.'
        }
      case 'spaces':
        return {
          ...module,
          repos: mostFavoriteSpaces,
          emptyMessage: 'No spaces to highlight yet.'
        }
      // case 'tools':
      //   return {
      //     ...module,
      //     repos: OurTools,
      //     emptyMessage: 'No tools to highlight yet.'
      //   }
      default:
        return module
    }
  })

  return modules
})

const ctaMD = `
**We want YOU if**:  
1. You can code *and* name 10 JoJo stands 💪  
2. You’re ready to build—not just consume—anime tech  

**How to apply**:  
- Pitch us via [Discord](https://discord.gg/EAW4WqFdKY)/[Email](mailto:narugo1992@deepghs.org) with:  
  - Your anime-tech portfolio  
  - What you’ll bring to our dojo 🥋  
- OR: Directly request to join our [HuggingFace Org](https://huggingface.co/deepghs) , with the same things above

*Note: We do light vetting to protect our community—it’s faster than a Naruto run, promise!*  `
</script>
