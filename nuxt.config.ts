// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/mdc',
    'nuxt-og-image'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: '2025-11-11',
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  icon: {
    clientBundle: {
      scan: true,
      icons: ['mdi:location-on-outline', 'lucide:chevron-right', 'lucide:newspaper', 'solar:global-outline'] // Here include list of internal icons but has to be in the format: prefix:icon
    }
  }

})
