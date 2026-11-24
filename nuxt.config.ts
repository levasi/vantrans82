// https://nuxt.com/docs/api/configuration/nuxt-config
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: ws: wss:",
    "frame-src https://www.openstreetmap.org",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'"
  ].join('; ')
}

export default defineNuxtConfig({
  app: {
    head: {
      // The logo file is 1503px wide. This lands in every document head,
      // including the client-only admin shell, before component CSS loads.
      style: [
        {
          key: 'brand-logo',
          innerHTML: '.brand-logo{height:3rem;width:auto;max-width:12rem}'
        }
      ]
    }
  },
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: ['@nuxt/image', '@nuxtjs/i18n'],
  // Admin auth is an httpOnly cookie. The server still cannot know the session
  // during the first HTML render of these client-only routes, so keep admin
  // pages browser-rendered and let middleware send guests to login.
  routeRules: {
    '/**': { headers: securityHeaders },
    '/admin': { ssr: false, headers: securityHeaders },
    '/admin/**': { ssr: false, headers: securityHeaders },
    '/admin/fleet': { redirect: '/admin/homepage/fleet', ssr: false, headers: securityHeaders },
    '/admin/coverage': { redirect: '/admin/homepage/coverage', ssr: false, headers: securityHeaders }
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
      'admin/homepage/index': false,
      'admin/homepage/[section]': false,
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


