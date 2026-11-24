import bcrypt from 'bcryptjs'
import { requireUser } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const { db, user, session } = await requireUser(event)
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

    const nextVersion = Number(user.session_version) + 1
    const passwordHash = await bcrypt.hash(newPassword, 10)
    await db.query(
      `UPDATE admin_users
       SET password_hash = $1, session_version = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3`,
      [passwordHash, nextVersion, user.id]
    )

    await session.update({
      userId: user.id,
      sessionVersion: nextVersion
    })

    return {
      success: true,
      message: 'Password updated'
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to update password')
  }
})
