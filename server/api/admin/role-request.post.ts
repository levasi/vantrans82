import { requireUser, toPublicAdminUser } from '~/server/utils/admin-session'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const { db, user } = await requireUser(event)

    if (user.role !== 'member') {
      throw createError({
        statusCode: 400,
        message: 'This account already has admin access'
      })
    }

    if (user.role_request === 'pending') {
      return {
        success: true,
        user: toPublicAdminUser(user)
      }
    }

    const result = await db.query(
      `UPDATE admin_users
       SET role_request = 'pending', updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, email, name, role, role_request`,
      [user.id]
    )

    return {
      success: true,
      user: toPublicAdminUser(result.rows[0])
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to send request')
  }
})
