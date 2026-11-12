import {
  isHomepageSectionKey,
  saveHomepageSection
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
    const body = await readBody(event)
    const content = body?.content

    if (!content || typeof content !== 'object' || Array.isArray(content)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid section content'
      })
    }

    const saved = await saveHomepageSection(section, content)

    return {
      success: true,
      message: 'Section saved successfully',
      section,
      content: saved
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to save homepage section'
    })
  }
})
