// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: ['@nuxt/image', '@nuxtjs/i18n'],
  // Admin auth lives in sessionStorage, so the server always rendered the dashboard.
  // A client redirect to /admin/login then hydrated into that HTML and left the
  // login form inside the dashboard layout. Render admin only in the browser.
  routeRules: {
    '/admin': { ssr: false },
    '/admin/**': { ssr: false }
  },
  css: ['~/assets/scss/main.scss'],
  // Vercel: serverless preset (auto when VERCEL=1). Local prod: node-server via `npm run start`.
  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server'
  },
  // @ts-ignore - i18n module types
  i18n: {
    locales: [
      {
        code: 'ro',
        iso: 'ro-RO',
        name: 'Română',
        file: 'ro.json'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'ro',
    strategy: 'prefix_except_default',
    // Keep admin URLs stable (no /en prefix) so refresh never 404s
    customRoutes: 'config',
    pages: {
      'admin/index': false,
      'admin/login': false,
      'admin/register': false,
      'admin/settings': false,
      'admin/account': false,
      'admin/access': false,
      'admin/users': false,
      'admin/fleet': false,
      'admin/coverage': false,
      'admin/homepage/index': false,
      'admin/homepage/hero': false,
      'admin/homepage/features': false,
      'admin/homepage/services': false,
      'admin/homepage/cta': false,
      'admin/homepage/testimonials': false,
      'admin/homepage/about': false,
      'admin/homepage/faq': false,
      'admin/homepage/contact': false,
      'admin/homepage/fleet': false,
      'admin/homepage/coverage': false
    },
    // Homepage stays Romanian by default; users can still switch via the language toggle
    detectBrowserLanguage: false,
    // Enable dynamic loading
    compilation: {
      strictMessage: false
    }
  }
})


