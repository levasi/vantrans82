import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const token = query.token as string

    if (!token) {
      throw createError({
        statusCode: 401,
        message: 'No token provided'
      })
    }

    // Decode token (simple implementation - use JWT in production)
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
    
    // Verify user exists
    const result = await db.query(
      'SELECT id, email, name FROM admin_users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      throw createError({
        statusCode: 401,
        message: 'User not found'
      })
    }

    const user = result.rows[0]

    return {
      success: true,
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
      message: error.message || 'An error occurred during verification'
    })
  }
})

