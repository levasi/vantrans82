import pg from 'pg'
const { Pool } = pg

let pool: pg.Pool | null = null

/** All Postgres URL env vars Vercel/Neon may inject */
export function resolveDatabaseUrl(): string | undefined {
  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

  const vercelNeon =
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.DATABASE_URL ||
    process.env.DATABASE_PRIVATE_URL ||
    process.env.STORAGE_URL

  if (isDev) {
    return process.env.DATABASE_LOCAL_URL || vercelNeon
  }

  return vercelNeon
}

function needsSsl(connectionString: string): boolean {
  if (connectionString.includes('railway.internal')) {
    return false
  }
  if (connectionString.includes('localhost') || connectionString.includes('127.0.0.1')) {
    return false
  }
  return (
    process.env.NODE_ENV === 'production' ||
    process.env.VERCEL === '1' ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('vercel') ||
    connectionString.includes('sslmode=require') ||
    connectionString.includes('ssl=true')
  )
}

export const getDb = () => {
  if (!pool) {
    const connectionString = resolveDatabaseUrl()
    const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

    if (!connectionString) {
      console.warn(
        isDev
          ? 'DATABASE_LOCAL_URL or POSTGRES_URL not set - database features disabled'
          : 'POSTGRES_URL / DATABASE_URL not set - database features disabled'
      )
      return null as any
    }

    if (isDev && (connectionString.includes('railway') || connectionString.includes('railway.internal'))) {
      console.warn('⚠️  WARNING: Connecting to Railway in development — use DATABASE_LOCAL_URL locally.')
    }

    try {
      pool = new Pool({
        connectionString,
        ssl: needsSsl(connectionString) ? { rejectUnauthorized: false } : false,
        max: process.env.VERCEL ? 1 : 10
      })

      pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err)
      })

      const dbInfo = connectionString.replace(/:[^:@]+@/, ':****@')
      console.log(`📊 Database: ${dbInfo.substring(0, 50)}...`)
    } catch (error) {
      console.error('Failed to create database pool:', error)
      return null as any
    }
  }

  return pool
}

export const initDb = async () => {
  const db = getDb()

  if (!db) {
    console.warn('Database not available - skipping initialization')
    return
  }

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)
    `)

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}
