<template>
  <div>
    <UPageHero :links="state.headerLinks">
      <template #title>
        <BannerLogo class="h-30" />
        <span class="text-2xl text-gray-600 mt-2">AI & ANIME SYNTHESIS</span>
      </template>
      <template #description>
        <p>
          DeepGHS (Deep Generative anime Hobbyist Syndicate) is a
          passion-driven, non-profit community building anime/2D-focused
          infrastructure—because even otakus deserve robust tooling! 🎨
        </p>
      </template>
    </UPageHero>

    <!-- Our Works -->
    <UPageSection id="works">
      <template #title>
        Our Works
      </template>
      <template #description>
        <p>
          ✅ 100% non-profit | ✅ Fully open-source | ✅ Zero paywalls (forever!)
        </p>
      </template>
      <template #body>
        <UPageGrid>
          <UPageCard
            v-for="(card, index) in state.worksDec"
            :key="index"
            v-bind="card"
          />
        </UPageGrid>
      </template>
    </UPageSection>

    <!-- Classification Models -->
    <UPageSection
      id="classification-models"
      title="Classification Models"
      :features="state.classificationModels"
    />

    <!-- Detection Models -->
    <UPageSection
      id="detection-models"
      title="Detection Models"
      :features="detectionModels"
    />

    <UPageSection>
      <UPageCTA
        title="Want to Join?"
        variant="subtle"
        :links="[
          {
            label: 'View on GitHub',
            to: 'https://github.com/deepghs',
            target: '_blank',
            icon: 'i-simple-icons-github',
            color: 'neutral'
          },
          {
            label: 'View on Hugging Face',
            to: 'https://huggingface.co/deepghs',
            target: '_blank',
            icon: 'fluent-emoji-flat:hugging-face',
            color: 'neutral',
            variant: 'outline'
          }
        ]"
      >
        <template #description>
          <MDC
            :value="ctaMD"
            tag="article"
          />
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import headerLinks from '@/json/index/header/links.json'
import worksDec from '@/json/index/works.json'
import classificationModels from '@/json/classification-models.json'
import detectionModels from '@/json/detection-models.json'

const state: any = reactive({
  headerLinks,
  worksDec,
  classificationModels,
  detectionModels
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
