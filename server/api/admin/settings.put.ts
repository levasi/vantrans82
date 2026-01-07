import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { settings } = body

    if (!settings || typeof settings !== 'object') {
      throw createError({
        statusCode: 400,
        message: 'Invalid settings data'
      })
    }

    const db = getDb()
    
    if (!db) {
      throw createError({
        statusCode: 503,
        message: 'Database not available'
      })
    }

    // Ensure settings table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Save each setting
    for (const [key, value] of Object.entries(settings)) {
      const valueStr = typeof value === 'string' ? value : JSON.stringify(value)
      
      await db.query(
        `INSERT INTO settings (key, value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) 
         DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
        [key, valueStr]
      )
    }

    return {
      success: true,
      message: 'Settings saved successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to save settings'
    })
  }
})

