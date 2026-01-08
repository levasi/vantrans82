import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    // Default settings
    const defaultSettings = {
      showLanguageSwitch: true,
      companyName: 'VanTrans82',
      phoneNumber: '+40 123 456 789',
      contactEmail: 'contact@vantrans82.ro',
      address: 'Str. Logistica nr. 123\nBucharest, Romania'
    }
    
    if (!db) {
      // Return default settings if database is not available
      return {
        success: true,
        ...defaultSettings
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

    // Load all settings from database
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
    return {
      success: true,
      showLanguageSwitch: settings.showLanguageSwitch ?? defaultSettings.showLanguageSwitch,
      companyName: settings.companyName ?? defaultSettings.companyName,
      phoneNumber: settings.phoneNumber ?? defaultSettings.phoneNumber,
      contactEmail: settings.contactEmail ?? defaultSettings.contactEmail,
      address: settings.address ?? defaultSettings.address
    }
  } catch (error: any) {
    // On error, return default values
    return {
      success: true,
      showLanguageSwitch: true,
      companyName: 'VanTrans82',
      phoneNumber: '+40 123 456 789',
      contactEmail: 'contact@vantrans82.ro',
      address: 'Str. Logistica nr. 123\nBucharest, Romania'
    }
  }
})

