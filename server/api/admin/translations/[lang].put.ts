import { getDb } from '~/server/utils/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const lang = getRouterParam(event, 'lang')
  
  if (!lang || !['en', 'ro'].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid language code'
    })
  }

  try {
    const body = await readBody(event)
    const { translations } = body
    
    if (!translations || typeof translations !== 'object') {
      throw createError({
        statusCode: 400,
        message: 'Invalid translations data'
      })
    }

    const db = getDb()
    
    // Save to database if available
    if (db) {
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

      // Flatten translations for database storage
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
      
      const flattened = flatten(translations)
      
      // Delete existing translations for this language
      await db.query('DELETE FROM translations WHERE lang = $1', [lang])
      
      // Insert new translations
      for (const item of flattened) {
        await db.query(
          'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)',
          [lang, item.key, item.value]
        )
      }
    }
    
    // Also save to file as backup
    const filePath = join(process.cwd(), 'locales', `${lang}.json`)
    const formattedJson = JSON.stringify(translations, null, 2)
    await writeFile(filePath, formattedJson, 'utf-8')
    
    return {
      success: true,
      message: 'Translations saved successfully'
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to save translations'
    })
  }
})

