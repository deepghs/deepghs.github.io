<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/">
          <AppLogo class="w-auto h-9 shrink-0" />
        </NuxtLink>
      </template>
      <UNavigationMenu :items="items" />
      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/deepghs"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
import NavMenuItems from '@/json/navigation-menu.json'
import type { NavigationMenuItem } from '@nuxt/ui'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'DeepGHS'
const description = 'description'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '1',
  twitterImage: '1',
  twitterCard: 'summary_large_image'
})

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => {
  const menuItems = NavMenuItems.map((item) => {
    let isActived = false
    if (item.label === 'Home') {
      isActived = route.path === '/'
    } else if (!item.to && item.children && item.children.length > 0) {
      isActived = item.children.some(child => route.path.startsWith(child.to || ''))
    } else if (item.to) {
      isActived = route.path.startsWith(item.to)
    } else {
      isActived = false
    }

    return {
      label: item.label,
      to: item.to,
      active: isActived,
      children: item.children ? item.children : []
    }
  })
  return menuItems
})
</script>
