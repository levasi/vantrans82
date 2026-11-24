import { requireAdmin } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'
import { toggleHomepageSectionVisibility } from '~/server/utils/homepage-visibility-db'
import {
  HOMEPAGE_VISIBILITY_KEYS,
  type HomepageVisibilityKey
} from '~/utils/homepage-visibility'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)
    const body = await readBody(event)
    const key = body?.key as HomepageVisibilityKey | undefined

    if (!key || !HOMEPAGE_VISIBILITY_KEYS.includes(key)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid section key'
      })
    }

    const visibility = await toggleHomepageSectionVisibility(key)

    return {
      success: true,
      visibility
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to update section visibility')
  }
})
