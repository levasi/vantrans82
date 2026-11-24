import { requireUser, toPublicAdminUser } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const { user } = await requireUser(event)

    return {
      success: true,
      user: toPublicAdminUser(user)
    }
  } catch (error: unknown) {
    publicServerError(error, 'An error occurred during verification')
  }
})
