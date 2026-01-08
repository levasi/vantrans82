import { getDb } from '~/server/utils/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Helper to flatten nested object into key-value pairs
const flatten = (obj: any, prefix = ''): Array<{ key: string; value: string }> => {
  const result: Array<{ key: string; value: string }> = []

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      result.push(...flatten(obj[key], newKey))
    } else {
      result.push({ key: newKey, value: String(obj[key] || '') })
    }
  }

  return result
}

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    
    if (!db) {
      throw createError({
        statusCode: 500,
        message: 'Database not available'
      })
    }

    const body = await readBody(event).catch(() => ({}))
    const { lang, force } = body

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

    const languages = lang ? [lang] : ['en', 'ro']
    const synced: string[] = []
    const errors: Array<{ lang: string; error: string }> = []

    for (const language of languages) {
      try {
        const filePath = join(process.cwd(), 'locales', `${language}.json`)
        const fileContent = await readFile(filePath, 'utf-8')
        const translations = JSON.parse(fileContent)
        const flattened = flatten(translations)

        // If force is true, delete existing translations first
        if (force) {
          await db.query('DELETE FROM translations WHERE lang = $1', [language])
        }

        // Insert translations
        // If force is true, always update
        // If force is false, check if value exists and is empty, then update
        for (const item of flattened) {
          if (force) {
            // Force mode: always update
            await db.query(
              'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO UPDATE SET value = $3',
              [language, item.key, item.value]
            )
          } else {
            // Normal mode: check if entry exists and is empty, then update
            const existing = await db.query(
              'SELECT value FROM translations WHERE lang = $1 AND key_path = $2',
              [language, item.key]
            )
            
            if (existing.rows.length === 0) {
              // Insert new translation
              await db.query(
                'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)',
                [language, item.key, item.value]
              )
            } else if (!existing.rows[0].value || existing.rows[0].value.trim() === '') {
              // Update only if existing value is empty
              await db.query(
                'UPDATE translations SET value = $3 WHERE lang = $1 AND key_path = $2',
                [language, item.key, item.value]
              )
            }
            // If value exists and is not empty, do nothing (preserve user edits)
          }
        }

        synced.push(language)
      } catch (error: any) {
        if (error.code === 'ENOENT') {
          errors.push({ lang: language, error: `Translation file not found: locales/${language}.json` })
        } else {
          errors.push({ lang: language, error: error.message || 'Unknown error' })
        }
      }
    }

    return {
      success: true,
      message: `Synced ${synced.length} language(s) from JSON files to database`,
      synced,
      errors: errors.length > 0 ? errors : undefined
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to sync translations'
    })
  }
})
