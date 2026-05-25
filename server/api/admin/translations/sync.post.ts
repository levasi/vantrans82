import { getDb } from '~/server/utils/db'
import { getSupportedLocaleCodes } from '~/server/utils/locale-files'
import { ensureTranslationsTable, syncLocaleFromBundle } from '~/server/utils/translation-db'

export default defineEventHandler(async (event) => {
  const db = getDb()

  if (!db) {
    throw createError({
      statusCode: 500,
      message: 'Database not available'
    })
  }

  const body = await readBody(event).catch(() => ({}))
  const { lang, force } = body as { lang?: string; force?: boolean }

  await ensureTranslationsTable(db)

  const languages = lang ? [lang] : getSupportedLocaleCodes()
  const synced: string[] = []
  const errors: Array<{ lang: string; error: string }> = []

  for (const language of languages) {
    try {
      const count = await syncLocaleFromBundle(db, language, { force: !!force })
      synced.push(language)
      console.log(`Synced ${count} keys for ${language} (force=${!!force})`)
    } catch (error: any) {
      errors.push({ lang: language, error: error.message || 'Unknown error' })
    }
  }

  return {
    success: true,
    message: `Synced ${synced.length} language(s) from bundled JSON to database`,
    synced,
    errors: errors.length > 0 ? errors : undefined
  }
})
