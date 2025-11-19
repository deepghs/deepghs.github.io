<template>
  <UContainer>
    <UPage v-if="article">
      <UPageHeader
        :title="article.title"
        :description="article.description"
        :ui="{ headline: 'flex flex-col gap-y-8 items-start' }"
      >
        <template #headline>
          <UBreadcrumb
            :items="[
              { label: 'Blog', icon: 'i-lucide-newspaper', to: '/blog' },
              { label: article.title }
            ]"
            class="max-w-full"
          />
          <div class="flex items-center space-x-2">
            <span>
              {{ article.category }}
            </span>
            <span class="text-muted">&middot;&nbsp;&nbsp;<time>{{
              article.date
            }}</time></span>
          </div>
        </template>

        <div class="mt-4 flex flex-wrap items-center gap-6">
          <UUser
            v-for="(author, index) in article.authors"
            :key="index"
            v-bind="author"
            :description="
              author.to ? `@${author.to.split('/').pop()}` : undefined
            "
          />
        </div>
      </UPageHeader>

      <UPage class="lg:gap-24">
        <UPageBody>
          <ContentRenderer v-if="article.body" :value="article" />

          <div class="flex items-center justify-between mt-12 not-prose">
            <ULink to="/blog" class="text-primary"> ← Back to blog </ULink>
            <div class="flex justify-end items-center gap-1.5">
              <UButton
                icon="i-lucide-link"
                variant="ghost"
                color="neutral"
                @click="copyLink"
              >
                <span class="sr-only">Copy URL</span>
                Copy URL
              </UButton>
              <UButton
                v-for="(link, index) in socialLinks"
                :key="index"
                v-bind="link"
                variant="ghost"
                color="neutral"
                target="_blank"
              >
                <span class="sr-only">Nuxt on {{ link.label }}</span>
              </UButton>
            </div>
          </div>
        </UPageBody>

        <template #right>
          <UContentToc
            v-if="article.body && article.body.toc"
            :links="article.body.toc.links"
            title="Table of Contents"
            highlight
          >
            <template #bottom>
              <div class="hidden lg:block space-y-6">
                <UPageLinks title="Links" :links="links" />
                <USeparator type="dashed" />
              </div>
            </template>
          </UContentToc>
        </template>
      </UPage>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug
const { data: article } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

const { copy } = useClipboard()

if (!article.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Article not found',
    fatal: true
  })
}

const title = article.value.seo?.title || article.value.title
const description = article.value.seo?.description || article.value.description

useSeoMeta({
  titleTemplate: '%s · DeepGHS Blog',
  title,
  description,
  ogDescription: description,
  ogTitle: `${title} · DeepGHS Blog`
})

const socialLinks = computed(() =>
  !article.value
    ? []
    : [
        {
          label: 'Github',
          icon: 'logos:github-icon',
          to: `https://github.com/deepghs`
        },
        {
          label: 'Hugging Face',
          icon: 'logos:hugging-face-icon',
          to: `https://huggingface.co/deepghs`
        },
        {
          label: 'X',
          icon: 'i-simple-icons-x',
          to: `https://x.com/DeepGHS`
        }
      ]
)

function copyLink() {
  copy(`https://nuxt.com${article.value?.path || '/'}`, {
    title: 'Link copied to clipboard',
    icon: 'i-lucide-copy-check'
  })
}

const links = [
  {
    icon: 'mdi:github',
    label: 'Github',
    to: 'https://github.com/deepghs/',
    target: '_blank'
  },
  {
    icon: 'logos:hugging-face-icon',
    label: 'Hugging Face',
    to: 'https://huggingface.co/deepghs',
    target: '_blank'
  }
]
</script>
