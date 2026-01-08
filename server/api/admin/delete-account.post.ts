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

    // Decode token to get user ID
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
    const userResult = await db.query(
      'SELECT id, email FROM admin_users WHERE id = $1',
      [userId]
    )

    if (userResult.rows.length === 0) {
      throw createError({
        statusCode: 404,
        message: 'User not found'
      })
    }

    // Delete the user
    await db.query('DELETE FROM admin_users WHERE id = $1', [userId])

    return {
      success: true,
      message: 'Account deleted successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'An error occurred while deleting the account'
    })
  }
})
