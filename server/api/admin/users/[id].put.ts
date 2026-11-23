import { requireOwner, toPublicAdminUser, type AdminRole, type RoleRequestStatus } from '~/server/utils/admin-session'

export default defineEventHandler(async (event) => {
  try {
    const { db } = await requireOwner(event)
    const id = Number(getRouterParam(event, 'id'))

    if (!Number.isInteger(id)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid user'
      })
    }

    const existing = await db.query(
      'SELECT id, email, name, role, role_request FROM admin_users WHERE id = $1',
      [id]
    )

    const current = existing.rows[0] as {
      id: number
      email: string
      name: string | null
      role: AdminRole
      role_request: RoleRequestStatus
    } | undefined

    if (!current) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    const body = await readBody(event)
    const name = String(body?.name || '').trim()
    const email = String(body?.email || '').trim().toLowerCase()
    const requestedRole = body?.role === 'admin' ? 'admin' : 'member'

    if (!email) {
      throw createError({
        statusCode: 400,
        message: 'Email is required'
      })
    }

    if (current.role === 'owner' && body?.role && body.role !== 'owner') {
      throw createError({
        statusCode: 400,
        message: 'The owner account cannot be demoted'
      })
    }

    const duplicate = await db.query(
      'SELECT id FROM admin_users WHERE email = $1 AND id <> $2',
      [email, id]
    )

    if (duplicate.rows.length > 0) {
      throw createError({
        statusCode: 409,
        message: 'An account with this email already exists'
      })
    }

    const role: AdminRole = current.role === 'owner' ? 'owner' : requestedRole
    let roleRequest: RoleRequestStatus = current.role_request

    if (role === 'admin' || role === 'owner') {
      roleRequest = 'none'
    } else if (current.role_request === 'pending') {
      roleRequest = 'rejected'
    }

    const result = await db.query(
      `UPDATE admin_users
       SET name = $1, email = $2, role = $3, role_request = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, email, name, role, role_request, created_at`,
      [name || null, email, role, roleRequest, id]
    )

    const saved = result.rows[0]

    return {
      success: true,
      user: {
        ...toPublicAdminUser(saved),
        createdAt: saved.created_at
      }
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update user'
    })
  }
})
