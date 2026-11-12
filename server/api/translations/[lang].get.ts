import { getDb } from '~/server/utils/db'
import { getLocaleFromBundle } from '~/server/utils/locale-files'
import {
  ensureTranslationsTable,
  reconstructTranslations,
  syncLocaleFromBundle,
  syncLocaleFromBundleIfEmpty
} from '~/server/utils/translation-db'

function deepMerge(
  base: Record<string, unknown>,
  overlay: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base }

  for (const [key, value] of Object.entries(overlay)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      result[key] &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key])
    ) {
      result[key] = deepMerge(
        result[key] as Record<string, unknown>,
        value as Record<string, unknown>
      )
    } else {
      result[key] = value
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

    // Insert any new keys from locale files without overwriting edited DB values
    await syncLocaleFromBundle(db, lang)

    const refreshed = await db.query(
      'SELECT key_path, value FROM translations WHERE lang = $1',
      [lang]
    )

    if (refreshed.rows.length > 0) {
      const fromDb = reconstructTranslations(refreshed.rows)
      return deepMerge(bundle as Record<string, unknown>, fromDb as Record<string, unknown>)
    }

    const synced = await syncLocaleFromBundleIfEmpty(db, lang)
    return synced ?? bundle
  } catch (error) {
    console.error('Error loading translations:', error)
    return bundle
  }
})
