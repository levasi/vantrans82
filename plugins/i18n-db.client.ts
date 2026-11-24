export default defineNuxtPlugin(async () => {
  const { $i18n } = useNuxtApp()

  if (!$i18n) {
    return
  }

  const locale = $i18n.locale as string | { value: string }

  const currentCode = () => (typeof locale === 'string' ? locale : locale.value)

  const reloadTranslations = async (localeCode: string) => {
    if (!localeCode) {
      return
    }

    try {
      const translations = await $fetch<Record<string, unknown>>(`/api/translations/${localeCode}`)

      if (translations && Object.keys(translations).length > 0) {
        $i18n.setLocaleMessage(localeCode, translations)
      }
    } catch (error) {
      console.error(`Failed to reload translations for ${localeCode}:`, error)
    }
  }

  if (typeof locale !== 'string') {
    watch(locale, (localeCode) => {
      reloadTranslations(localeCode)
    })
  }

  await reloadTranslations(currentCode())
})
