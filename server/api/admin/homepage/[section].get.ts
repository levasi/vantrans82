import {
  getHomepageSection,
  isHomepageSectionKey
} from '~/server/utils/homepage-sections-db'

export default defineEventHandler(async (event) => {
  const section = getRouterParam(event, 'section') || ''

  if (!isHomepageSectionKey(section)) {
    throw createError({
      statusCode: 404,
      message: 'Unknown homepage section'
    })
  }

  try {
    const content = await getHomepageSection(section)
    return {
      success: true,
      section,
      content
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load homepage section'
    })
  }
})
