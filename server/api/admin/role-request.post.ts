import { getAdminUserFromEvent, toPublicAdminUser } from '~/server/utils/admin-session'

export default defineEventHandler(async (event) => {
  try {
    const { db, user } = await getAdminUserFromEvent(event)

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
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to send request'
    })
  }
})
