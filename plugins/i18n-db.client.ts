export default defineNuxtPlugin(async () => {
  if (!process.client) {
    return
  }

  const { $i18n } = useNuxtApp()
  
  if (!$i18n) {
    return
  }

  // Helper to get locale code (handles both string and object)
  const getLocaleCode = (locale: any): string => {
    if (typeof locale === 'string') {
      return locale
    }
    if (locale && typeof locale === 'object' && locale.code) {
      return locale.code
    }
    return 'ro' // default fallback
  }

  // Function to reload translations from API
  const reloadTranslations = async (locale: any) => {
    const localeCode = getLocaleCode(locale)
    if (!localeCode) {
      return
    }

    try {
      const translations = await $fetch(`/api/translations/${localeCode}`)
      
      if (translations && Object.keys(translations).length > 0) {
        // Update i18n messages
        $i18n.setLocaleMessage(localeCode, translations)
      }
    } catch (error) {
      console.error(`Failed to reload translations for ${localeCode}:`, error)
    }
  }

  // Reload translations on mount
  const currentLocale = $i18n.locale || $i18n.defaultLocale
  if (currentLocale) {
    await reloadTranslations(currentLocale)
  }

  // Reload when language changes
  if ($i18n.onLanguageSwitched) {
    const originalHandler = $i18n.onLanguageSwitched
    $i18n.onLanguageSwitched = async (oldLocale: any, newLocale: any) => {
      await reloadTranslations(newLocale)
      if (originalHandler) {
        originalHandler(oldLocale, newLocale)
      }
    }
  } else {
    $i18n.onLanguageSwitched = async (oldLocale: any, newLocale: any) => {
      await reloadTranslations(newLocale)
    }
  }

  // Also reload on navigation to ensure fresh translations
  const router = useRouter()
  router.afterEach(() => {
    const locale = $i18n.locale || $i18n.defaultLocale
    if (locale) {
      reloadTranslations(locale)
    }
  })
})

