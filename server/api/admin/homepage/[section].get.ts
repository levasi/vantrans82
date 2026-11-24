import { requireAdmin } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'
import {
  getHomepageSection,
  isHomepageSectionKey
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
    const content = await getHomepageSection(section)
    return {
      success: true,
      section,
      content
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to load homepage section')
  }
})
