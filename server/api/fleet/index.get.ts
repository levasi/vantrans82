import { listFleetVehicles, getDefaultFleet } from '~/server/utils/fleet-db'

export default defineEventHandler(async () => {
  try {
    const vehicles = await listFleetVehicles()
    return {
      success: true,
      vehicles
    }
  } catch (error: any) {
    console.error('Failed to load fleet:', error)
    return {
      success: true,
      vehicles: getDefaultFleet()
    }
  }
})
