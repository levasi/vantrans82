import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    if (!db) {
      // Return default settings if database is not available
      return {
        success: true,
        settings: {
          companyName: 'VanTrans82',
          contactEmail: 'contact@vantrans82.ro',
          phoneNumber: '+40 123 456 789',
          address: 'Str. Logistica nr. 123\nBucharest, Romania',
          smtpHost: '',
          smtpPort: '587',
          smtpUsername: '',
          smtpPassword: '',
          smtpSecure: false
        }
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

    // Load settings from database
    const result = await db.query('SELECT key, value FROM settings')
    
    const settings: Record<string, any> = {}
    result.rows.forEach((row: any) => {
      try {
        settings[row.key] = JSON.parse(row.value)
      } catch {
        settings[row.key] = row.value
      }
    })

    // Merge with defaults
    const defaultSettings = {
      companyName: 'VanTrans82',
      contactEmail: 'contact@vantrans82.ro',
      phoneNumber: '+40 123 456 789',
      address: 'Str. Logistica nr. 123\nBucharest, Romania',
      smtpHost: '',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      smtpSecure: false
    }

    return {
      success: true,
      settings: { ...defaultSettings, ...settings }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load settings'
    })
  }
})

