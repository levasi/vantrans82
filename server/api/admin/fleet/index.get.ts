import { listFleetVehicles } from '~/server/utils/fleet-db'

export default defineEventHandler(async () => {
  try {
    const vehicles = await listFleetVehicles()
    return {
      success: true,
      vehicles
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load fleet'
    })
  }
})
