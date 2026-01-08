import { getDb } from '~/server/utils/db'
import { readFile, writeFile } from 'fs/promises'
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
    const countUpdated = flattened.length

    const db = getDb()
    
    // Save to database if available (upsert only changed translations)
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
      
      // Upsert only the changed translations (don't delete all, just update changed ones)
      for (const item of flattened) {
        await db.query(
          'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO UPDATE SET value = $3',
          [lang, item.key, item.value]
        )
      }
    }
    
    // Also update the file - load existing, merge, and save
    const filePath = join(process.cwd(), 'locales', `${lang}.json`)
    let existingTranslations: Record<string, any> = {}
    
    try {
      const fileContent = await readFile(filePath, 'utf-8')
      existingTranslations = JSON.parse(fileContent)
    } catch (error: any) {
      // File doesn't exist or is invalid, start with empty object
      if (error.code !== 'ENOENT') {
        console.error('Error reading translation file:', error)
      }
    }
    
    // Deep merge translations (only update changed keys)
    const deepMerge = (target: any, source: any): any => {
      const output = { ...target }
      
      for (const key in source) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          output[key] = deepMerge(target[key] || {}, source[key])
        } else {
          output[key] = source[key]
        }
      }
      
      return output
    }
    
    const mergedTranslations = deepMerge(existingTranslations, translations)
    const formattedJson = JSON.stringify(mergedTranslations, null, 2)
    await writeFile(filePath, formattedJson, 'utf-8')
    
    return {
      success: true,
      message: 'Translations updated successfully',
      updated: countUpdated
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update translations'
    })
  }
})
