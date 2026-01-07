import bcrypt from 'bcryptjs'
import { getDb, initDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // Initialize database tables
    await initDb()

    const body = await readBody(event)
    const { email, password, name } = body

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
    
    // Check if any admin users exist
    const existingUsers = await db.query('SELECT COUNT(*) as count FROM admin_users')
    const userCount = parseInt(existingUsers.rows[0].count)

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT id FROM admin_users WHERE email = $1',
      [email.toLowerCase()]
    )

    if (existingUser.rows.length > 0) {
      throw createError({
        statusCode: 409,
        message: 'User with this email already exists'
      })
    }

    // Hash password
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create user
    const result = await db.query(
      'INSERT INTO admin_users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email.toLowerCase(), passwordHash, name || null]
    )

    const user = result.rows[0]

    return {
      success: true,
      message: userCount === 0 ? 'Database initialized and first admin user created' : 'Admin user created',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'An error occurred while initializing'
    })
  }
})

