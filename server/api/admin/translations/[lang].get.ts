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
    const filePath = join(process.cwd(), 'locales', `${lang}.json`)
    const fileContent = await readFile(filePath, 'utf-8')
    const translations = JSON.parse(fileContent)
    
    return {
      success: true,
      translations
    }
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      throw createError({
        statusCode: 404,
        message: 'Translation file not found'
      })
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to read translations'
    })
  }
})

