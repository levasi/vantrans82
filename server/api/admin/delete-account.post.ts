import bcrypt from 'bcryptjs'
import { requireUser } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const { db, user, session } = await requireUser(event)
    const body = await readBody(event)
    const currentPassword = String(body?.currentPassword || '')

    if (!currentPassword) {
      throw createError({
        statusCode: 400,
        message: 'Current password is required'
      })
    }

    const matches = await bcrypt.compare(currentPassword, user.password_hash)
    if (!matches) {
      throw createError({
        statusCode: 401,
        message: 'Current password is incorrect'
      })
    }

    await db.query('DELETE FROM admin_users WHERE id = $1', [user.id])
    await session.clear()

    return {
      success: true,
      message: 'Account deleted successfully'
    }
  } catch (error: unknown) {
    publicServerError(error, 'An error occurred while deleting the account')
  }
})
