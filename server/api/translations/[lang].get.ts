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
    return {}
  }

  try {
    const db = getDb()

    if (!db) {
      return bundle
    }

    await ensureTranslationsTable(db)

    const result = await db.query(
      'SELECT key_path, value FROM translations WHERE lang = $1',
      [lang]
    )

    if (result.rows.length > 0) {
      return reconstructTranslations(result.rows)
    }

    const synced = await syncLocaleFromBundleIfEmpty(db, lang)
    return synced ?? bundle
  } catch (error) {
    console.error('Error loading translations:', error)
    return bundle
  }
})
