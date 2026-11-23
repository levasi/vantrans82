import type { H3Event } from 'h3'
import { getDb } from '~/server/utils/db'

export const OWNER_EMAIL = 'vasileeduardbogdan@gmail.com'

export type AdminRole = 'member' | 'admin' | 'owner'
export type RoleRequestStatus = 'none' | 'pending' | 'rejected'

export type AdminUserRecord = {
  id: number
  email: string
  name: string | null
  password_hash: string
  role: AdminRole
  role_request: RoleRequestStatus
}

export function toPublicAdminUser(user: {
  id: number
  email: string
  name?: string | null
  role: AdminRole
  role_request: RoleRequestStatus
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    roleRequest: user.role_request
  }
}

export async function getAdminUserFromEvent(event: H3Event) {
  const query = getQuery(event)
  const token = (query.token as string) || ''

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'No token provided'
    })
  }

  const decoded = Buffer.from(token, 'base64').toString('utf-8')
  const [userId] = decoded.split(':')

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token'
    })
  }

  const db = getDb()
  if (!db) {
    throw createError({
      statusCode: 503,
      message: 'Database not available'
    })
  }

  const result = await db.query(
    'SELECT id, email, name, password_hash, role, role_request FROM admin_users WHERE id = $1',
    [userId]
  )

  if (!result.rows[0]) {
    throw createError({
      statusCode: 404,
      message: 'User not found'
    })
  }

  return { db, user: result.rows[0] as AdminUserRecord }
}

export async function requireOwner(event: H3Event) {
  const session = await getAdminUserFromEvent(event)

  if (session.user.role !== 'owner') {
    throw createError({
      statusCode: 403,
      message: 'Owner access required'
    })
  }

  return session
}
