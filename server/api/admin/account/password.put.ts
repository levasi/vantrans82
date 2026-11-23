import bcrypt from 'bcryptjs'
import { getAdminUserFromEvent } from '~/server/utils/admin-session'

export default defineEventHandler(async (event) => {
  try {
    const { db, user } = await getAdminUserFromEvent(event)
    const body = await readBody(event)
    const currentPassword = String(body?.currentPassword || '')
    const newPassword = String(body?.newPassword || '')

    if (!currentPassword || !newPassword) {
      throw createError({
        statusCode: 400,
        message: 'Current password and new password are required'
      })
    }

    if (newPassword.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'New password must be at least 8 characters'
      })
    }

    const matches = await bcrypt.compare(currentPassword, user.password_hash)
    if (!matches) {
      throw createError({
        statusCode: 401,
        message: 'Current password is incorrect'
      })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    await db.query(
      'UPDATE admin_users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [passwordHash, user.id]
    )

    return {
      success: true,
      message: 'Password updated'
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update password'
    })
  }
})
