import { getAdminSession } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const session = await getAdminSession(event)
    await session.clear()

    return {
      success: true
    }
  } catch (error: unknown) {
    publicServerError(error, 'An error occurred during logout')
  }
})
