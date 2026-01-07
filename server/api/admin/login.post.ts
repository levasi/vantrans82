import bcrypt from 'bcryptjs'
import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

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
    
    // Find user by email
    const result = await db.query(
      'SELECT id, email, password_hash, name FROM admin_users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    const user = result.rows[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid email or password'
      })
    }

    // Create session token (in production, use JWT or proper session management)
    const sessionToken = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

    // Return user data (without password)
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token: sessionToken
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'An error occurred during login'
    })
  }
})

