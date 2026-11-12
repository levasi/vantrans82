import { getDb } from '~/server/utils/db'

export type FleetVehicle = {
  id: number
  slug: string
  icon: string
  image_url: string
  sort_order: number
  name_ro: string
  name_en: string
  capacity_ro: string
  capacity_en: string
  description_ro: string
  description_en: string
}

export type FleetVehicleInput = {
  id?: number
  slug?: string
  icon: string
  image_url: string
  sort_order?: number
  name_ro: string
  name_en: string
  capacity_ro: string
  capacity_en: string
  description_ro: string
  description_en: string
}

const DEFAULT_FLEET: Omit<FleetVehicle, 'id'>[] = [
  {
    slug: 'vans',
    icon: 'Package',
    image_url:
      'https://images.unsplash.com/photo-1761454200783-ca533f7928e3?auto=format&fit=crop&w=1080&q=80',
    sort_order: 0,
    name_ro: 'Dubă',
    name_en: 'Vans',
    capacity_ro: 'Până la 1,5 tone',
    capacity_en: 'Up to 1.5 tons',
    description_ro:
      'Perfect pentru livrări urbane și încărcături mai mici. Ideal pentru servicii expres în orașe și transport pe distanțe scurte.',
    description_en:
      'Perfect for urban deliveries and smaller loads. Ideal for express services within cities and short-distance transport.'
  },
  {
    slug: 'trucks',
    icon: 'Truck',
    image_url:
      'https://images.unsplash.com/photo-1738507869660-b44ea20ab037?auto=format&fit=crop&w=1080&q=80',
    sort_order: 1,
    name_ro: 'Camioane',
    name_en: 'Trucks',
    capacity_ro: 'Până la 12 tone',
    capacity_en: 'Up to 12 tons',
    description_ro:
      'Camioane medii versatil pentru transport regional și național. Echipate cu caracteristici moderne de siguranță și urmărire GPS.',
    description_en:
      'Versatile medium-duty trucks for regional and national transport. Equipped with modern safety features and GPS tracking.'
  },
  {
    slug: 'trailers',
    icon: 'Container',
    image_url:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1080&q=80',
    sort_order: 2,
    name_ro: 'Remorci',
    name_en: 'Trailers',
    capacity_ro: 'Până la 24 tone',
    capacity_en: 'Up to 24 tons',
    description_ro:
      'Remorci semiremorci pentru marfă la scară mare și transporturi internaționale. Opțiuni cu control de temperatură disponibile.',
    description_en:
      'Heavy-duty semi-trailers for large-scale freight and international shipments. Temperature-controlled options available.'
  }
]

function slugify(value: string, fallback: string) {
  const base = value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return base || fallback
}

export async function ensureFleetTable() {
  const db = getDb()
  if (!db) return null

  await db.query(`
    CREATE TABLE IF NOT EXISTS fleet_vehicles (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      icon VARCHAR(50) NOT NULL DEFAULT 'Truck',
      image_url TEXT NOT NULL,
      sort_order INT NOT NULL DEFAULT 0,
      name_ro VARCHAR(255) NOT NULL,
      name_en VARCHAR(255) NOT NULL,
      capacity_ro VARCHAR(255) NOT NULL DEFAULT '',
      capacity_en VARCHAR(255) NOT NULL DEFAULT '',
      description_ro TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

export async function seedFleetIfEmpty() {
  const db = await ensureFleetTable()
  if (!db) return []

  const countResult = await db.query('SELECT COUNT(*)::int AS count FROM fleet_vehicles')
  const count = countResult.rows[0]?.count ?? 0

  if (count === 0) {
    for (const vehicle of DEFAULT_FLEET) {
      await db.query(
        `INSERT INTO fleet_vehicles
          (slug, icon, image_url, sort_order, name_ro, name_en, capacity_ro, capacity_en, description_ro, description_en)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          vehicle.slug,
          vehicle.icon,
          vehicle.image_url,
          vehicle.sort_order,
          vehicle.name_ro,
          vehicle.name_en,
          vehicle.capacity_ro,
          vehicle.capacity_en,
          vehicle.description_ro,
          vehicle.description_en
        ]
      )
    }
  }

  return listFleetVehicles()
}

export async function listFleetVehicles(): Promise<FleetVehicle[]> {
  const db = await ensureFleetTable()
  if (!db) return DEFAULT_FLEET.map((v, index) => ({ id: index + 1, ...v }))

  const result = await db.query(
    `SELECT id, slug, icon, image_url, sort_order,
            name_ro, name_en, capacity_ro, capacity_en, description_ro, description_en
     FROM fleet_vehicles
     ORDER BY sort_order ASC, id ASC`
  )

  if (result.rows.length === 0) {
    return seedFleetIfEmpty()
  }

  return result.rows
}

export async function replaceFleetVehicles(vehicles: FleetVehicleInput[]) {
  const db = await ensureFleetTable()
  if (!db) {
    throw createError({ statusCode: 503, message: 'Database not available' })
  }

  const client = await db.connect()
  try {
    await client.query('BEGIN')
    await client.query('DELETE FROM fleet_vehicles')

    const saved: FleetVehicle[] = []
    for (let i = 0; i < vehicles.length; i++) {
      const vehicle = vehicles[i]
      const slug =
        vehicle.slug?.trim() ||
        slugify(vehicle.name_en || vehicle.name_ro || `vehicle-${i + 1}`, `vehicle-${i + 1}`)

      const result = await client.query(
        `INSERT INTO fleet_vehicles
          (slug, icon, image_url, sort_order, name_ro, name_en, capacity_ro, capacity_en, description_ro, description_en)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id, slug, icon, image_url, sort_order,
                   name_ro, name_en, capacity_ro, capacity_en, description_ro, description_en`,
        [
          slug,
          vehicle.icon || 'Truck',
          vehicle.image_url || '',
          vehicle.sort_order ?? i,
          vehicle.name_ro || '',
          vehicle.name_en || '',
          vehicle.capacity_ro || '',
          vehicle.capacity_en || '',
          vehicle.description_ro || '',
          vehicle.description_en || ''
        ]
      )
      saved.push(result.rows[0])
    }

    await client.query('COMMIT')
    return saved
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export function getDefaultFleet() {
  return DEFAULT_FLEET.map((v, index) => ({ id: index + 1, ...v }))
}
