import { getHomepageSectionVisibility } from '~/server/utils/homepage-visibility-db'

export default defineEventHandler(async () => {
  try {
    const visibility = await getHomepageSectionVisibility()
    return {
      success: true,
      visibility
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load section visibility'
    })
  }
})
