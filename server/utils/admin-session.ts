import type { H3Event, SessionConfig } from 'h3'
import { getCookie, useSession } from 'h3'
import { getDb } from '~/server/utils/db'

export type AdminRole = 'member' | 'admin' | 'owner'
export type RoleRequestStatus = 'none' | 'pending' | 'rejected'

export type AdminUserRecord = {
  id: number
  email: string
  name: string | null
  password_hash: string
  role: AdminRole
  role_request: RoleRequestStatus
  session_version: number
}

type AdminSessionData = {
  userId?: number
  sessionVersion?: number
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 7

function sessionConfig(): SessionConfig {
  const password = process.env.NUXT_SESSION_PASSWORD || ''

  if (password.length < 32) {
    throw createError({
      statusCode: 503,
      message: 'Server session is not configured'
    })
  }

  return {
    password,
    name: 'vantrans_admin',
    maxAge: SESSION_MAX_AGE,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/'
    }
  }
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

export async function getAdminSession(event: H3Event) {
  try {
    return await useSession<AdminSessionData>(event, sessionConfig())
  } catch (error) {
    if (isHttpError(error)) {
      throw error
    }

    console.error('Failed to read admin session', error)
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    })
  }
}

export async function requireUser(event: H3Event) {
  if (!getCookie(event, 'vantrans_admin')) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    })
  }

  const session = await getAdminSession(event)
  const userId = Number(session.data.userId)
  const sessionVersion = Number(session.data.sessionVersion)

  if (!Number.isInteger(userId) || userId <= 0 || !Number.isInteger(sessionVersion)) {
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
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
    `SELECT id, email, name, password_hash, role, role_request, session_version
     FROM admin_users
     WHERE id = $1`,
    [userId]
  )

  const user = result.rows[0] as AdminUserRecord | undefined

  if (!user || Number(user.session_version) !== sessionVersion) {
    await session.clear()
    throw createError({
      statusCode: 401,
      message: 'Authentication required'
    })
  }

  return { db, user, session }
}

export const getAdminUserFromEvent = requireUser

export async function requireAdmin(event: H3Event) {
  const session = await requireUser(event)

  if (session.user.role !== 'admin' && session.user.role !== 'owner') {
    throw createError({
      statusCode: 403,
      message: 'Admin access required'
    })
  }

  return session
}

export async function requireOwner(event: H3Event) {
  const session = await requireUser(event)

  if (session.user.role !== 'owner') {
    throw createError({
      statusCode: 403,
      message: 'Owner access required'
    })
  }

  return session
}

function isHttpError(error: unknown): error is { statusCode: number } {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'statusCode' in error &&
    typeof (error as { statusCode?: unknown }).statusCode === 'number'
  )
}
