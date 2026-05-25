// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n'],
  // Vercel: serverless preset (auto when VERCEL=1). Local prod: node-server via `npm run start`.
  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server'
  },
  // @ts-ignore - i18n module types
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'ro',
        iso: 'ro-RO',
        name: 'Română',
        file: 'ro.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ro',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    },
    // Enable dynamic loading
    compilation: {
      strictMessage: false
    }
  }
})

