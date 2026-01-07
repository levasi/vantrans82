import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const lang = getRouterParam(event, 'lang')
  
  if (!lang || !['en', 'ro'].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid language code'
    })
  }

  try {
    const db = getDb()
    
    // If database is not available, fall back to file system
    if (!db) {
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'locales', `${lang}.json`)
      try {
        const fileContent = await readFile(filePath, 'utf-8')
        return JSON.parse(fileContent)
      } catch {
        return {}
      }
    }

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

    // Load translations from database
    const result = await db.query(
      'SELECT key_path, value FROM translations WHERE lang = $1',
      [lang]
    )

    // If no translations in database, load from file and sync to database
    if (result.rows.length === 0) {
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'locales', `${lang}.json`)
      
      try {
        const fileContent = await readFile(filePath, 'utf-8')
        const translations = JSON.parse(fileContent)
        
        // Flatten and store in database
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
        
        // Insert into database
        for (const item of flattened) {
          await db.query(
            'INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3) ON CONFLICT (lang, key_path) DO UPDATE SET value = $3',
            [lang, item.key, item.value]
          )
        }
        
        return translations
      } catch (fileError: any) {
        if (fileError.code === 'ENOENT') {
          return {}
        }
        throw fileError
      }
    }

    // Reconstruct nested object from database
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
  } catch (error: any) {
    console.error('Error loading translations:', error)
    // Fallback to file system
    try {
      const { readFile } = await import('fs/promises')
      const { join } = await import('path')
      const filePath = join(process.cwd(), 'locales', `${lang}.json`)
      const fileContent = await readFile(filePath, 'utf-8')
      return JSON.parse(fileContent)
    } catch {
      return {}
    }
  }
})

