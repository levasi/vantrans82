import { requireAdmin } from '~/server/utils/admin-session'
import { getDb } from '~/server/utils/db'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)
    const db = getDb()
    let dbConnected = false

    if (db) {
      try {
        await db.query('SELECT 1')
        dbConnected = true
      } catch {
        dbConnected = false
      }
    }

    return {
      dbConnected,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      uptime: 'Running'
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to load system settings')
  }
})
