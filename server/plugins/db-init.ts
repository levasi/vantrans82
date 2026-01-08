import { initDb } from '~/server/utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  // Check for database connection (local or production)
  const hasLocalDb = process.env.DATABASE_LOCAL_URL
  const hasProductionDb = process.env.DATABASE_PRIVATE_URL || process.env.DATABASE_URL
  
  // In development, prefer local database
  const shouldInit = process.env.NODE_ENV === 'development' 
    ? (hasLocalDb || hasProductionDb)
    : hasProductionDb
  
  if (shouldInit) {
    try {
      await initDb()
    } catch (error) {
      console.error('Failed to initialize database:', error)
      // Don't throw - allow app to start even if DB init fails
      // This is useful for development when DB might not be available
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('DATABASE_LOCAL_URL not set - database features will be disabled')
      console.warn('Set DATABASE_LOCAL_URL in your .env file to use a local database')
    } else {
      console.warn('DATABASE_URL or DATABASE_PRIVATE_URL not set - database features will be disabled')
    }
  }
})

