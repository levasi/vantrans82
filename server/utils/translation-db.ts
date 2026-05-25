import type pg from 'pg'
import { getDb } from '~/server/utils/db'
import { getLocaleFromBundle, getSupportedLocaleCodes } from '~/server/utils/locale-files'

export type FlatTranslation = { key: string; value: string }

export function flattenTranslations(obj: Record<string, unknown>, prefix = ''): FlatTranslation[] {
  const result: FlatTranslation[] = []

  for (const key of Object.keys(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key
    const value = obj[key]

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result.push(...flattenTranslations(value as Record<string, unknown>, newKey))
    } else {
      result.push({ key: newKey, value: String(value ?? '') })
    }
  }

  return result
}

export function reconstructTranslations(flat: Array<{ key_path: string; value: string }>): Record<string, unknown> {
  const result: Record<string, unknown> = {}

  for (const item of flat) {
    const keys = item.key_path.split('.')
    let current = result as Record<string, unknown>

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]] as Record<string, unknown>
    }

    current[keys[keys.length - 1]] = item.value
  }

  return result
}

export async function ensureTranslationsTable(db: pg.Pool) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS translations (
      id SERIAL PRIMARY KEY,
      lang VARCHAR(10) NOT NULL,
      key_path VARCHAR(500) NOT NULL,
      value TEXT NOT NULL,
      UNIQUE(lang, key_path)
    )
  `)

  await db.query(`
    CREATE INDEX IF NOT EXISTS idx_translations_lang ON translations(lang)
  `)
}

export async function syncLocaleFromBundle(
  db: pg.Pool,
  lang: string,
  options: { force?: boolean } = {}
): Promise<number> {
  const bundle = getLocaleFromBundle(lang)
  if (!bundle) {
    throw new Error(`No bundled locale file for "${lang}"`)
  }

  if (options.force) {
    await db.query('DELETE FROM translations WHERE lang = $1', [lang])
  }

  const flattened = flattenTranslations(bundle)
  let inserted = 0

  for (const item of flattened) {
    const result = await db.query(
      options.force
        ? `INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)
           ON CONFLICT (lang, key_path) DO UPDATE SET value = EXCLUDED.value`
        : `INSERT INTO translations (lang, key_path, value) VALUES ($1, $2, $3)
           ON CONFLICT (lang, key_path) DO NOTHING`,
      [lang, item.key, item.value]
    )
    if ((result.rowCount ?? 0) > 0) {
      inserted++
    }
  }

  return inserted
}

/** Seed all locales when DB has no translations (first deploy on Vercel). */
export async function seedTranslationsIfEmpty(): Promise<void> {
  const db = getDb()
  if (!db) {
    return
  }

  await ensureTranslationsTable(db)

  const countResult = await db.query('SELECT COUNT(*)::int AS count FROM translations')
  const total = countResult.rows[0]?.count ?? 0
  if (total > 0) {
    return
  }

  for (const lang of getSupportedLocaleCodes()) {
    const count = await syncLocaleFromBundle(db, lang)
    console.log(`Seeded ${count} translation keys for ${lang}`)
  }
}

/** Sync one language from bundle if it has no rows in DB. */
export async function syncLocaleFromBundleIfEmpty(db: pg.Pool, lang: string): Promise<Record<string, unknown> | null> {
  const langCount = await db.query(
    'SELECT COUNT(*)::int AS count FROM translations WHERE lang = $1',
    [lang]
  )
  if ((langCount.rows[0]?.count ?? 0) > 0) {
    return null
  }

  await syncLocaleFromBundle(db, lang)
  return getLocaleFromBundle(lang)
}
