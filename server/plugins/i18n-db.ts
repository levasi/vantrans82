import { getDb } from '~/server/utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  // Only run on server
  if (!process.server) {
    return
  }

  const db = getDb()
  if (!db) {
    return
  }

  try {
    // Ensure translations table exists
    await db.query(`
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        lang VARCHAR(10) NOT NULL,
        key_path VARCHAR(500) NOT NULL,
        value TEXT NOT NULL,
        UNIQUE(lang, key_path)
      )
    `)

    // Create index for faster lookups
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_translations_lang ON translations(lang)
    `)

    // Function to load translations from database
    const loadTranslationsFromDb = async (lang: string): Promise<Record<string, any>> => {
      const result = await db.query(
        'SELECT key_path, value FROM translations WHERE lang = $1',
        [lang]
      )

      if (result.rows.length === 0) {
        return {}
      }

      // Reconstruct nested object
      const translations: Record<string, any> = {}
      
      for (const row of result.rows) {
        const keys = row.key_path.split('.')
        let current = translations
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {}
          }
          current = current[keys[i]]
        }
        
        current[keys[keys.length - 1]] = row.value
      }
      
      return translations
    }

    // Store function for use in API routes
    nitroApp.hooks.hook('render:route', async (url, result) => {
      // This hook runs for each route, but we'll use it to ensure translations are available
    })

    // Make function available globally
    nitroApp.$loadTranslationsFromDb = loadTranslationsFromDb
  } catch (error) {
    console.error('Error initializing translation database:', error)
  }
})

