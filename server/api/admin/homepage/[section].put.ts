import { requireAdmin } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'
import {
  isHomepageSectionKey,
  saveHomepageSection
} from '~/server/utils/homepage-sections-db'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
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
  } catch (error: unknown) {
    publicServerError(error, 'Failed to save homepage section')
  }
})
