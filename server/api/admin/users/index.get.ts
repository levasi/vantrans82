import { requireOwner } from '~/server/utils/admin-session'

export default defineEventHandler(async (event) => {
  try {
    const { db } = await requireOwner(event)

    const result = await db.query(
      `SELECT id, email, name, role, role_request, created_at
       FROM admin_users
       ORDER BY CASE WHEN role_request = 'pending' THEN 0 ELSE 1 END, created_at DESC`
    )

    return {
      success: true,
      users: result.rows.map((row) => ({
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        roleRequest: row.role_request,
        createdAt: row.created_at
      }))
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load users'
    })
  }
})
