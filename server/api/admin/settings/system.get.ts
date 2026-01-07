import { getDb } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    const dbConnected = db !== null

    // Test database connection
    let dbTestResult = false
    if (db) {
      try {
        await db.query('SELECT 1')
        dbTestResult = true
      } catch {
        dbTestResult = false
      }
    }

    // Get Node.js version
    const nodeVersion = process.version

    // Get environment
    const environment = process.env.NODE_ENV || 'development'

    // Calculate uptime (simplified - in production you'd track server start time)
    const uptime = 'Running'

    return {
      dbConnected: dbTestResult,
      environment,
      nodeVersion,
      uptime
    }
  } catch (error: any) {
    return {
      dbConnected: false,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      uptime: 'Unknown'
    }
  }
})

