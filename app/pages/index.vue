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
        <UPageGrid>
          <UPageCard
            v-for="(card, index) in worksDec"
            :key="index"
            v-bind="card"
          />
        </UPageGrid>
      </template>
    </UPageSection>

    <!-- configureable projects area -->
    <!-- Classification Models -->
    <UPageSection
      v-for="category in worksCollections"
      :id="category.id"
      :key="category.id"
      :title="category.name"
      :features="category.works"
    />

    <!-- Detection Models -->
    <!-- <UPageSection id="detection-models" title="Detection Models" :features="state.detectionModels" /> -->

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

import worksData from '@/json/works.json'

import type { ButtonProps, PageCardProps } from '@nuxt/ui'

const bannerLinks: ButtonProps[] = indexConfig.banner.links as ButtonProps[]
const worksDec: PageCardProps[] = indexConfig.works.items as PageCardProps[]
const ctaLinks: ButtonProps[] = indexConfig.cta.links as ButtonProps[]

const worksCollections = computed(() => {
  const renderableData = worksData.map((category) => {
    const { id, name, works } = category
    const workCards = works.map((work) => {
      return {
        icon: work.icon,
        title: work.name,
        description: work.description,
        to: work.link,
        target: '_blank'
      }
    })
    return {
      id: id,
      name: name,
      works: workCards
    }
  })
  return renderableData
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
