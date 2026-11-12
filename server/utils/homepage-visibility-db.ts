import { getDb } from '~/server/utils/db'
import {
  DEFAULT_HOMEPAGE_SECTION_VISIBILITY,
  normalizeHomepageSectionVisibility,
  type HomepageSectionVisibility,
  type HomepageVisibilityKey
} from '~/utils/homepage-visibility'

const SETTINGS_KEY = 'homepageSectionVisibility'

async function ensureSettingsTable() {
  const db = getDb()
  if (!db) return null

  await db.query(`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      key VARCHAR(255) UNIQUE NOT NULL,
      value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

export async function getHomepageSectionVisibility(): Promise<HomepageSectionVisibility> {
  const db = await ensureSettingsTable()
  if (!db) {
    return { ...DEFAULT_HOMEPAGE_SECTION_VISIBILITY }
  }

  const result = await db.query('SELECT value FROM settings WHERE key = $1', [SETTINGS_KEY])
  if (!result.rows[0]) {
    return { ...DEFAULT_HOMEPAGE_SECTION_VISIBILITY }
  }

  let parsed: unknown = result.rows[0].value
  try {
    parsed = JSON.parse(result.rows[0].value)
  } catch {
    // keep raw value
  }

  return normalizeHomepageSectionVisibility(parsed)
}

export async function setHomepageSectionVisibility(
  visibility: HomepageSectionVisibility
): Promise<HomepageSectionVisibility> {
  const db = await ensureSettingsTable()
  if (!db) {
    throw new Error('Database is not available')
  }

  const normalized = normalizeHomepageSectionVisibility(visibility)

  await db.query(
    `INSERT INTO settings (key, value, updated_at)
     VALUES ($1, $2, CURRENT_TIMESTAMP)
     ON CONFLICT (key)
     DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
    [SETTINGS_KEY, JSON.stringify(normalized)]
  )

  return normalized
}

export async function toggleHomepageSectionVisibility(
  key: HomepageVisibilityKey
): Promise<HomepageSectionVisibility> {
  const current = await getHomepageSectionVisibility()
  return setHomepageSectionVisibility({
    ...current,
    [key]: !current[key]
  })
}
