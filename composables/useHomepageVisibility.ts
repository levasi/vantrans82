import {
  DEFAULT_HOMEPAGE_SECTION_VISIBILITY,
  normalizeHomepageSectionVisibility,
  type HomepageSectionVisibility,
  type HomepageVisibilityKey
} from '~/utils/homepage-visibility'

export const useHomepageVisibility = () => {
  const visibility = useState<HomepageSectionVisibility>(
    'homepage-section-visibility',
    () => ({ ...DEFAULT_HOMEPAGE_SECTION_VISIBILITY })
  )
  const loaded = useState('homepage-section-visibility-loaded', () => false)
  const loading = useState('homepage-section-visibility-loading', () => false)
  const togglingKey = useState<HomepageVisibilityKey | null>(
    'homepage-section-visibility-toggling',
    () => null
  )

  const loadVisibility = async (force = false) => {
    if (loading.value) return visibility.value
    if (loaded.value && !force) return visibility.value

    loading.value = true
    try {
      const response = await $fetch<{ visibility: HomepageSectionVisibility }>(
        '/api/homepage/visibility'
      )
      visibility.value = normalizeHomepageSectionVisibility(response.visibility)
      loaded.value = true
    } catch {
      visibility.value = { ...DEFAULT_HOMEPAGE_SECTION_VISIBILITY }
    } finally {
      loading.value = false
    }

    return visibility.value
  }

  const isSectionVisible = (key: HomepageVisibilityKey) =>
    visibility.value[key] !== false

  const toggleSectionVisibility = async (key: HomepageVisibilityKey) => {
    const previous = visibility.value[key] !== false
    visibility.value = {
      ...visibility.value,
      [key]: !previous
    }
    togglingKey.value = key

    try {
      const response = await $fetch<{ visibility: HomepageSectionVisibility }>(
        '/api/admin/homepage/visibility',
        {
          method: 'PUT',
          body: { key }
        }
      )
      visibility.value = normalizeHomepageSectionVisibility(response.visibility)
      loaded.value = true
      return visibility.value[key]
    } catch (error) {
      visibility.value = {
        ...visibility.value,
        [key]: previous
      }
      throw error
    } finally {
      togglingKey.value = null
    }
  }

  return {
    visibility,
    loaded,
    loading,
    togglingKey,
    loadVisibility,
    isSectionVisible,
    toggleSectionVisibility
  }
}
