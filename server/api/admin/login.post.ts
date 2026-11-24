import bcrypt from 'bcryptjs'
import { getRequestIP } from 'h3'
import { getAdminSession, toPublicAdminUser } from '~/server/utils/admin-session'
import { getDb } from '~/server/utils/db'
import { publicServerError } from '~/server/utils/http'
import {
  assertLoginAllowed,
  clearLoginFailures,
  recordLoginFailure
} from '~/server/utils/login-attempts'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    const db = getDb()

    if (!db) {
      throw createError({
        statusCode: 503,
        message: 'Database not available'
      })
    }

    const ip = (getRequestIP(event, { xForwardedFor: true }) || 'unknown').slice(0, 64)
    await assertLoginAllowed(db, email, ip)

    const result = await db.query(
      `SELECT id, email, password_hash, name, role, role_request, session_version
       FROM admin_users
       WHERE email = $1`,
      [email]
    )

    const user = result.rows[0]
    const isValidPassword = user
      ? await bcrypt.compare(password, user.password_hash)
      : false

    if (!user || !isValidPassword) {
      await recordLoginFailure(db, email, ip)
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    await clearLoginFailures(db, email)

    const session = await getAdminSession(event)
    await session.update({
      userId: user.id,
      sessionVersion: Number(user.session_version)
    })

    return {
      success: true,
      user: toPublicAdminUser(user)
    }
  } catch (error: unknown) {
    publicServerError(error, 'An error occurred during login')
  }
})
