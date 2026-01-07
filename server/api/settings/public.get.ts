import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    if (!db) {
      // Return default settings if database is not available
      return {
        success: true,
        showLanguageSwitch: true
      }
    }

    // Check if settings table exists, if not create it
    await db.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Load showLanguageSwitch setting from database
    const result = await db.query('SELECT value FROM settings WHERE key = $1', ['showLanguageSwitch'])
    
    let showLanguageSwitch = true // default value
    
    if (result.rows.length > 0) {
      try {
        showLanguageSwitch = JSON.parse(result.rows[0].value)
      } catch {
        showLanguageSwitch = result.rows[0].value === 'true'
      }
    }

    return {
      success: true,
      showLanguageSwitch
    }
  } catch (error: any) {
    // On error, return default value
    return {
      success: true,
      showLanguageSwitch: true
    }
  }
})

