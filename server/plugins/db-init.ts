import { initDb } from '~/server/utils/db'

export default defineNitroPlugin(async (nitroApp) => {
  // Only initialize database in production or when DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    try {
      await initDb()
    } catch (error) {
      console.error('Failed to initialize database:', error)
      // Don't throw - allow app to start even if DB init fails
      // This is useful for development when DB might not be available
    }
  } else {
    console.warn('DATABASE_URL not set - database features will be disabled')
  }
})

