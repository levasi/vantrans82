import { getDb } from '~/server/utils/db'

export type CoverageRegion = {
  id: number
  sort_order: number
  name_ro: string
  name_en: string
}

export type CoverageContent = {
  title_ro: string
  title_en: string
  subtitle_ro: string
  subtitle_en: string
  callout_title_ro: string
  callout_title_en: string
  callout_desc_ro: string
  callout_desc_en: string
  map_image_url: string
}

export type CoveragePayload = {
  content: CoverageContent
  regions: Array<{
    id?: number
    sort_order?: number
    name_ro: string
    name_en: string
  }>
}

const DEFAULT_CONTENT: CoverageContent = {
  title_ro: 'Acoperirea Noastră',
  title_en: 'Our Coverage',
  subtitle_ro:
    'Oferim acoperire logistică completă în România și pe rutele majore europene. Rețeaua noastră extinsă asigură că marfa ta ajunge la destinație în siguranță și la timp, indiferent de distanță.',
  subtitle_en:
    'We provide comprehensive logistics coverage across Romania and major European routes. Our extensive network ensures your cargo reaches its destination safely and on time, no matter the distance.',
  callout_title_ro: 'Locații Strategice',
  callout_title_en: 'Strategic Locations',
  callout_desc_ro:
    'Centrele noastre de distribuție sunt poziționate strategic pentru a oferi acoperire optimă și a minimiza timpii de tranzit pe toate rutele majore.',
  callout_desc_en:
    'Our distribution centers are strategically positioned to provide optimal coverage and minimize transit times across all major routes.',
  map_image_url:
    'https://images.unsplash.com/photo-1730317195704-29f7ced19356?auto=format&fit=crop&w=1080&q=80'
}

const DEFAULT_REGIONS: Omit<CoverageRegion, 'id'>[] = [
  { sort_order: 0, name_ro: 'București & Ilfov', name_en: 'Bucharest & Ilfov' },
  { sort_order: 1, name_ro: 'Regiunea Transilvania', name_en: 'Transylvania Region' },
  { sort_order: 2, name_ro: 'Muntenia & Oltenia', name_en: 'Muntenia & Oltenia' },
  { sort_order: 3, name_ro: 'Europa', name_en: 'Europe' }
]

export function getDefaultCoverage() {
  return {
    content: { ...DEFAULT_CONTENT },
    regions: DEFAULT_REGIONS.map((region, index) => ({ id: index + 1, ...region }))
  }
}

export async function ensureCoverageTables() {
  const db = getDb()
  if (!db) return null

  await db.query(`
    CREATE TABLE IF NOT EXISTS coverage_content (
      id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      title_ro VARCHAR(255) NOT NULL,
      title_en VARCHAR(255) NOT NULL,
      subtitle_ro TEXT NOT NULL DEFAULT '',
      subtitle_en TEXT NOT NULL DEFAULT '',
      callout_title_ro VARCHAR(255) NOT NULL DEFAULT '',
      callout_title_en VARCHAR(255) NOT NULL DEFAULT '',
      callout_desc_ro TEXT NOT NULL DEFAULT '',
      callout_desc_en TEXT NOT NULL DEFAULT '',
      map_image_url TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await db.query(`
    CREATE TABLE IF NOT EXISTS coverage_regions (
      id SERIAL PRIMARY KEY,
      sort_order INT NOT NULL DEFAULT 0,
      name_ro VARCHAR(255) NOT NULL,
      name_en VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

async function seedCoverageIfEmpty(db: NonNullable<ReturnType<typeof getDb>>) {
  const contentCount = await db.query('SELECT COUNT(*)::int AS count FROM coverage_content')
  if ((contentCount.rows[0]?.count ?? 0) === 0) {
    await db.query(
      `INSERT INTO coverage_content
        (id, title_ro, title_en, subtitle_ro, subtitle_en, callout_title_ro, callout_title_en, callout_desc_ro, callout_desc_en, map_image_url)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        DEFAULT_CONTENT.title_ro,
        DEFAULT_CONTENT.title_en,
        DEFAULT_CONTENT.subtitle_ro,
        DEFAULT_CONTENT.subtitle_en,
        DEFAULT_CONTENT.callout_title_ro,
        DEFAULT_CONTENT.callout_title_en,
        DEFAULT_CONTENT.callout_desc_ro,
        DEFAULT_CONTENT.callout_desc_en,
        DEFAULT_CONTENT.map_image_url
      ]
    )
  }

  const regionCount = await db.query('SELECT COUNT(*)::int AS count FROM coverage_regions')
  if ((regionCount.rows[0]?.count ?? 0) === 0) {
    for (const region of DEFAULT_REGIONS) {
      await db.query(
        `INSERT INTO coverage_regions (sort_order, name_ro, name_en)
         VALUES ($1, $2, $3)`,
        [region.sort_order, region.name_ro, region.name_en]
      )
    }
  }
}

export async function getCoverage() {
  const db = await ensureCoverageTables()
  if (!db) return getDefaultCoverage()

  await seedCoverageIfEmpty(db)

  const contentResult = await db.query(
    `SELECT title_ro, title_en, subtitle_ro, subtitle_en,
            callout_title_ro, callout_title_en, callout_desc_ro, callout_desc_en, map_image_url
     FROM coverage_content
     WHERE id = 1`
  )

  const regionsResult = await db.query(
    `SELECT id, sort_order, name_ro, name_en
     FROM coverage_regions
     ORDER BY sort_order ASC, id ASC`
  )

  return {
    content: contentResult.rows[0] || { ...DEFAULT_CONTENT },
    regions: regionsResult.rows
  }
}

export async function saveCoverage(payload: CoveragePayload) {
  const db = await ensureCoverageTables()
  if (!db) {
    throw createError({ statusCode: 503, message: 'Database not available' })
  }

  const { content, regions } = payload
  const client = await db.connect()

  try {
    await client.query('BEGIN')

    await client.query(
      `INSERT INTO coverage_content
        (id, title_ro, title_en, subtitle_ro, subtitle_en, callout_title_ro, callout_title_en, callout_desc_ro, callout_desc_en, map_image_url, updated_at)
       VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
       ON CONFLICT (id) DO UPDATE SET
         title_ro = EXCLUDED.title_ro,
         title_en = EXCLUDED.title_en,
         subtitle_ro = EXCLUDED.subtitle_ro,
         subtitle_en = EXCLUDED.subtitle_en,
         callout_title_ro = EXCLUDED.callout_title_ro,
         callout_title_en = EXCLUDED.callout_title_en,
         callout_desc_ro = EXCLUDED.callout_desc_ro,
         callout_desc_en = EXCLUDED.callout_desc_en,
         map_image_url = EXCLUDED.map_image_url,
         updated_at = CURRENT_TIMESTAMP`,
      [
        content.title_ro || '',
        content.title_en || '',
        content.subtitle_ro || '',
        content.subtitle_en || '',
        content.callout_title_ro || '',
        content.callout_title_en || '',
        content.callout_desc_ro || '',
        content.callout_desc_en || '',
        content.map_image_url || ''
      ]
    )

    await client.query('DELETE FROM coverage_regions')

    const savedRegions: CoverageRegion[] = []
    for (let i = 0; i < regions.length; i++) {
      const region = regions[i]
      const result = await client.query(
        `INSERT INTO coverage_regions (sort_order, name_ro, name_en)
         VALUES ($1, $2, $3)
         RETURNING id, sort_order, name_ro, name_en`,
        [region.sort_order ?? i, region.name_ro || '', region.name_en || '']
      )
      savedRegions.push(result.rows[0])
    }

    await client.query('COMMIT')

    return {
      content,
      regions: savedRegions
    }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
