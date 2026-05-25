import { getDb } from '~/server/utils/db'
import { getLocaleFromBundle } from '~/server/utils/locale-files'
import {
  ensureTranslationsTable,
  reconstructTranslations,
  syncLocaleFromBundleIfEmpty
} from '~/server/utils/translation-db'

export default defineEventHandler(async (event) => {
  const lang = getRouterParam(event, 'lang')

  if (!lang || !['en', 'ro'].includes(lang)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid language code'
    })
  }

  const bundle = getLocaleFromBundle(lang)
  if (!bundle) {
    throw createError({
      statusCode: 404,
      message: `No translations found for ${lang}`
    })
  }

  const db = getDb()

  if (!db) {
    return { success: true, translations: bundle }
  }

  try {
    await ensureTranslationsTable(db)

    const dbResult = await db.query(
      'SELECT key_path, value FROM translations WHERE lang = $1',
      [lang]
    )

    if (dbResult.rows.length > 0) {
      return { success: true, translations: reconstructTranslations(dbResult.rows) }
    }

    const synced = await syncLocaleFromBundleIfEmpty(db, lang)
    if (synced) {
      return { success: true, translations: synced }
    }

    throw createError({
      statusCode: 404,
      message: `No translations found for ${lang} in database. Use "Import from JSON files" to load defaults.`
    })
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
