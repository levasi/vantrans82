import { requireAdmin } from '~/server/utils/admin-session'
import { listFleetVehicles } from '~/server/utils/fleet-db'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)
    const vehicles = await listFleetVehicles()
    return {
      success: true,
      vehicles
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to load fleet')
  }
})
