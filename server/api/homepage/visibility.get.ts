import { getHomepageSectionVisibility } from '~/server/utils/homepage-visibility-db'

export default defineEventHandler(async () => {
  try {
    const visibility = await getHomepageSectionVisibility()
    return {
      success: true,
      visibility
    }
  } catch {
    const { DEFAULT_HOMEPAGE_SECTION_VISIBILITY } = await import(
      '~/utils/homepage-visibility'
    )
    return {
      success: true,
      visibility: { ...DEFAULT_HOMEPAGE_SECTION_VISIBILITY }
    }
  }
})
