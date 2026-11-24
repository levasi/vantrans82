import { requireAdmin } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'
import { getHomepageSectionVisibility } from '~/server/utils/homepage-visibility-db'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)
    const visibility = await getHomepageSectionVisibility()
    return {
      success: true,
      visibility
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to load section visibility')
  }
})
