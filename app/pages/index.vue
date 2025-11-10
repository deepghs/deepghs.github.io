<template>
  <div>
    <UPageHero
      title="We are DeepGHS"
      :links="[
        {
          label: 'View Projects',
          to: 'https://github.com/orgs/deepghs/repositories',
          target: '_blank',
          trailingIcon: 'ph:projector-screen-chart-fill',
          size: 'xl',
        },
        {
          label: 'Learn More',
          to: '#',
          target: '_blank',
          icon: 'material-symbols:info-outline',
          size: 'xl',
          color: 'neutral',
          variant: 'outline',
        },
        {
          label: 'GitHub',
          to: 'https://github.com/deepghs',
          target: '_blank',
          icon: 'i-simple-icons-github',
          size: 'xl',
          color: 'neutral',
          variant: 'subtle',
        },
      ]"
    >
      <template #description>
        <p>
          DeepGHS (Deep Generative anime Hobbyist Syndicate) is a
          passion-driven, non-profit community building anime/2D-focused
          infrastructure—because even otakus deserve robust tooling! 🎨
        </p>
      </template>
    </UPageHero>

    <UPageSection id="works" title="Our Works">
      <template #description>
        <p>
          ✅ 100% non-profit | ✅ Fully open-source | ✅ Zero paywalls
          (forever!)
        </p>
      </template>
      <template #body>
        <UPageGrid>
          <UPageCard
            v-for="(card, index) in cards"
            :key="index"
            v-bind="card"
          />
        </UPageGrid>
      </template>
    </UPageSection>

    <UPageSection
      id="classification-models"
      title="Classification Models"
      :features="classificationModels"
    />

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
            color: 'neutral',
          },
          {
            label: 'View on Hugging Face',
            to: 'https://huggingface.co/deepghs',
            target: '_blank',
            icon: 'fluent-emoji-flat:hugging-face',
            color: 'neutral',
            variant: 'outline',
          },
        ]"
      >
        <template #description>
          <MDC :value="ctaMD" tag="article" />
        </template>
      </UPageCTA>
    </UPageSection>
  </div>
</template>
<script setup lang="ts">
const cards = ref([
  {
    title: "Datasets",
    description: "Danbooru2024, Sankaku, Gelbooru, Yand.re, Rule34, and more.",
    icon: "material-symbols:dataset",
    to: "https://huggingface.co/deepghs/datasets",
    variant: "subtle",
  },
  {
    title: "Models",
    description:
      "models for distinguishing anime from real images, categorizing artwork styles, detecting anthropomorphic characters, predicting visual appeal, and recognizing decade-specific styles",
    icon: "oui:nav-models",
    to: "https://huggingface.co/deepghs/models",
    variant: "subtle",
  },
  {
    title: "Tools",
    description:
      "a specialized toolkit for anime-style image generation and data processing",
    icon: "mdi:tools",
    to: "https://huggingface.co/deepghs/spaces",
    variant: "subtle",
  },
]);
const classificationModels = ref([
  {
    icon: "arcticons:anime-slayer",
    title: "Anime/Real Classifier",
    description: "Distinguish anime from real images",
    to: "https://huggingface.co/deepghs/anime_real_cls",
    target: "_blank",
  },
  {
    icon: "mdi:art",
    title: "Image Type Classifier",
    description: "Categorize artwork styles",
    to: "https://huggingface.co/deepghs/anime_classification",
    target: "_blank",
  },
  {
    icon: "cib:furry-network",
    title: "Furry Detection",
    description: "dentify anthropomorphic characters",
    to: "https://huggingface.co/deepghs/anime_furry",
    target: "_blank",
  },
  {
    icon: "ic:outline-sports-score",
    title: "Aesthetic Scorer ",
    description: "Predict visual appeal",
    to: "https://huggingface.co/deepghs/anime_aesthetic",
    target: "_blank",
  },
  {
    icon: "carbon:classifier-language",
    title: "Style Era Classifier ",
    description: "Decade recognition",
    to: "https://huggingface.co/deepghs/anime_style_ages",
    target: "_blank",
  },
]);
const detectionModels = ref([
  {
    icon: "material-symbols:face",
    title: "Face Detection",
    description: "Precise facial localization",
    to: "https://huggingface.co/deepghs/anime_face_detection",
    target: "_blank",
  },
  {
    icon: "mdi:head",
    title: "Head Detection",
    description: "Head position estimation",
    to: "https://huggingface.co/deepghs/anime_person_detection",
    target: "_blank",
  },
  {
    icon: "ph:person-fill",
    title: "Person Detection",
    description: "Full-body recognition",
    to: "https://huggingface.co/deepghs/anime_person_detection",
    target: "_blank",
  },
  {
    icon: "token:nsfw",
    title: "NSFW Censor",
    description: "Content moderation",
    to: "https://huggingface.co/deepghs/anime_censor_detection",
    target: "_blank",
  },
]);

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
