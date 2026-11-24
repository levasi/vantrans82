import bcrypt from 'bcryptjs'
import { getDb } from '~/server/utils/db'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const email = String(body?.email || '').trim().toLowerCase()
    const password = String(body?.password || '')
    const name = String(body?.name || '').trim()

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email and password are required'
      })
    }

    if (password.length < 8) {
      throw createError({
        statusCode: 400,
        message: 'Password must be at least 8 characters'
      })
    }

    const db = getDb()

    if (!db) {
      throw createError({
        statusCode: 503,
        message: 'Database not available'
      })
    }

    const existingUser = await db.query(
      'SELECT id FROM admin_users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const result = await db.query(
      `INSERT INTO admin_users (email, password_hash, name, role, role_request)
       VALUES ($1, $2, $3, 'member', 'none')
       RETURNING id, email, name, role, role_request`,
      [email, passwordHash, name || null]
    )

    const user = result.rows[0]

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error: unknown) {
    publicServerError(error, 'An error occurred while creating user')
  }
})
