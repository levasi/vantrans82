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

    const filePath = join(process.cwd(), 'locales', `${lang}.json`)
    
    // Write translations to file with proper formatting
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

