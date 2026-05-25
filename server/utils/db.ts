import pg from 'pg'
const { Pool } = pg

let pool: pg.Pool | null = null

/** Connection string for the active environment (local Docker, Vercel Postgres, Railway, etc.) */
export function resolveDatabaseUrl(): string | undefined {
  const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

  if (isDev) {
    return (
      process.env.DATABASE_LOCAL_URL ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL
    )
  }

  // Production / Vercel: Vercel Postgres injects POSTGRES_URL (pooled, serverless-friendly)
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_PRIVATE_URL ||
    process.env.POSTGRES_URL_NON_POOLING
  )
}

function needsSsl(connectionString: string): boolean {
  if (connectionString.includes('railway.internal')) {
    return false
  }
  if (connectionString.includes('localhost') || connectionString.includes('127.0.0.1')) {
    return false
  }
  // Vercel Postgres (Neon), Railway public, Supabase, etc.
  return (
    process.env.NODE_ENV === 'production' ||
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
      if (isDev) {
        console.warn('DATABASE_LOCAL_URL or DATABASE_URL not set - database features will be disabled')
        console.warn('To use a local database, set DATABASE_LOCAL_URL in your .env file')
        return null as any
      }
      throw new Error(
        'No database URL set. On Vercel, add Vercel Postgres (Storage) or set DATABASE_URL / POSTGRES_URL.'
      )
    }

    if (isDev && (connectionString.includes('railway') || connectionString.includes('railway.internal'))) {
      console.warn('⚠️  WARNING: You are connecting to a Railway database in development mode!')
      console.warn('⚠️  This could affect production data. Consider using DATABASE_LOCAL_URL for local development.')
    }

    pool = new Pool({
      connectionString,
      ssl: needsSsl(connectionString) ? { rejectUnauthorized: false } : false,
      // One connection per serverless instance (Vercel Postgres uses a pooler via POSTGRES_URL)
      max: process.env.VERCEL ? 1 : 10
    })

    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })

    const dbInfo = connectionString.replace(/:[^:@]+@/, ':****@')
    console.log(`📊 Database connection: ${dbInfo.substring(0, 50)}...`)
  }

  return pool
}

// Initialize database tables
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
