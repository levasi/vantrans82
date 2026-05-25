import { getDb } from '~/server/utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  let db
  try {
    db = getDb()
  } catch (error) {
    console.error('Database unavailable for i18n plugin:', error)
    return
  }

  if (!db) {
    return
  }

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS translations (
        id SERIAL PRIMARY KEY,
        lang VARCHAR(10) NOT NULL,
        key_path VARCHAR(500) NOT NULL,
        value TEXT NOT NULL,
        UNIQUE(lang, key_path)
      )
    `)

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_translations_lang ON translations(lang)
    `)

    const loadTranslationsFromDb = async (lang: string): Promise<Record<string, any>> => {
      const result = await db.query(
        'SELECT key_path, value FROM translations WHERE lang = $1',
        [lang]
      )

      if (result.rows.length === 0) {
        return {}
      }

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

    nitroApp.$loadTranslationsFromDb = loadTranslationsFromDb
  } catch (error) {
    console.error('Error initializing translation database:', error)
  }
})
