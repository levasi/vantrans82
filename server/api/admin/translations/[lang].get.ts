import { getDb } from '~/server/utils/db'
import { readFile } from 'fs/promises'
import { join } from 'path'

// Helper to reconstruct nested object from flattened key-value pairs
const reconstruct = (flat: Array<{ key_path: string; value: string }>): Record<string, any> => {
  const result: Record<string, any> = {}

  for (const item of flat) {
    const keys = item.key_path.split('.')
    let current = result

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = item.value
  }

  return result
}

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
  const lang = getRouterParam(event, 'lang')
  
  if (!lang || !['en', 'ro'].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid language code'
    })
  }

  const db = getDb()

  if (!db) {
    // Fallback to file system if DB is not available
    try {
      const filePath = join(process.cwd(), 'locales', `${lang}.json`)
      const fileContent = await readFile(filePath, 'utf-8')
      const translations = JSON.parse(fileContent)
      return { success: true, translations }
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        throw createError({
          statusCode: 404,
          message: `Translation file for ${lang} not found`
        })
      }
      throw createError({
        statusCode: 500,
        message: error.message || `Failed to read translations from file for ${lang}`
      })
    }
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

    // Try to fetch from database
    const dbResult = await db.query(
      'SELECT key_path, value FROM translations WHERE lang = $1',
      [lang]
    )

    if (dbResult.rows.length > 0) {
      return { success: true, translations: reconstruct(dbResult.rows) }
    } else {
      // If DB is empty for this language, try to load from file and sync to DB
      // BUT only if no translations exist for ANY language (first-time setup)
      const anyTranslationsResult = await db.query(
        'SELECT COUNT(*) as count FROM translations LIMIT 1'
      )
      const hasAnyTranslations = parseInt(anyTranslationsResult.rows[0]?.count || '0') > 0
      
      if (!hasAnyTranslations) {
        // First-time setup: sync from file to DB
        const filePath = join(process.cwd(), 'locales', `${lang}.json`)
        try {
          const fileContent = await readFile(filePath, 'utf-8')
          const fileTranslations = JSON.parse(fileContent)
          const flattenedFileTranslations = flatten(fileTranslations)

          // Insert into DB - use DO NOTHING to avoid overwriting
          for (const item of flattenedFileTranslations) {
            await db.query(
              'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO NOTHING',
              [lang, item.key, item.value]
            )
          }
          console.log(`Synced translations for ${lang} from file to database (first-time setup).`)
          return { success: true, translations: fileTranslations }
        } catch (fileError: any) {
          if (fileError.code === 'ENOENT') {
            throw createError({
              statusCode: 404,
              message: `No translations found for ${lang} in database or file.`
            })
          }
          throw createError({
            statusCode: 500,
            message: fileError.message || `Failed to read or sync translations for ${lang}`
          })
        }
      } else {
        // Database was already initialized, but this language is empty
        // Return empty object - don't sync from file to avoid overwriting
        return { success: true, translations: {} }
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || `An error occurred while fetching translations for ${lang}`
    })
  }
})

