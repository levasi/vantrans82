import type { HomepageSectionKey } from '~/utils/homepage-section-forms'

export const useHomepageSection = <T extends Record<string, any>>(
  section: HomepageSectionKey,
  fallback: T
) => {
  const content = useState<T>(`homepage-section-${section}`, () => ({ ...fallback }))
  const loaded = useState<boolean>(`homepage-section-loaded-${section}`, () => false)

  const isRo = (locale: string) => String(locale).startsWith('ro')

  const pick = (
    roKey: keyof T & string,
    enKey: keyof T & string,
    locale: string,
    fallbackValue = ''
  ) => {
    const value = isRo(locale) ? content.value[roKey] : content.value[enKey]
    return (typeof value === 'string' && value) || fallbackValue
  }

  const load = async () => {
    if (loaded.value) return

    try {
      const response = await $fetch<{ content: T }>(`/api/homepage/${section}`)
      if (response?.content) {
        content.value = {
          ...fallback,
          ...response.content
        }
      }
    } catch (error) {
      console.error(`Failed to load homepage section ${section}:`, error)
      content.value = { ...fallback }
    } finally {
      loaded.value = true
    }
  }

  return {
    content,
    loaded,
    load,
    pick,
    isRo
  }
}
