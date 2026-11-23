import { getAdminUserFromEvent, toPublicAdminUser } from '~/server/utils/admin-session'

export default defineEventHandler(async (event) => {
  try {
    const { db, user } = await getAdminUserFromEvent(event)
    const body = await readBody(event)
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim().toLowerCase()

    if (!email) {
      throw createError({
        statusCode: 400,
        message: 'Email is required'
      })
    }

    const existing = await db.query(
      'SELECT id FROM admin_users WHERE email = $1 AND id <> $2',
      [email, user.id]
    )

    if (existing.rows.length > 0) {
      throw createError({
        statusCode: 409,
        message: 'An account with this email already exists'
      })
    }

    const result = await db.query(
      `UPDATE admin_users
       SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id, email, name, role, role_request`,
      [name || null, email, user.id]
    )

    return {
      success: true,
      user: toPublicAdminUser(result.rows[0])
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update account'
    })
  }
})
