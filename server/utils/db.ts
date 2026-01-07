import pg from 'pg'
const { Pool } = pg

let pool: pg.Pool | null = null

export const getDb = () => {
  if (!pool) {
    // Prefer private network connection to avoid egress fees on Railway
    // Use DATABASE_PRIVATE_URL if available (Railway private network)
    // Fall back to DATABASE_URL (public endpoint)
    const connectionString = process.env.DATABASE_PRIVATE_URL || process.env.DATABASE_URL
    
    if (!connectionString) {
      // In development, allow graceful degradation
      if (process.env.NODE_ENV === 'development') {
        console.warn('DATABASE_URL not set - database features will be disabled')
        return null as any
      }
      throw new Error('DATABASE_URL or DATABASE_PRIVATE_URL environment variable is not set')
    }

    // Parse connection string to determine if we need SSL
    const isPrivateNetwork = connectionString.includes('railway.internal')
    const needsSSL = !isPrivateNetwork && process.env.NODE_ENV === 'production'

    pool = new Pool({
      connectionString,
      ssl: needsSSL ? { rejectUnauthorized: false } : false
    })

    // Test connection
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
    })
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
    // Create users table if it doesn't exist
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

    // Create index on email for faster lookups
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)
    `)

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  }
}

