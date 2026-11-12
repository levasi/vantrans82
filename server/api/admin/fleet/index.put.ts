import { replaceFleetVehicles, type FleetVehicleInput } from '~/server/utils/fleet-db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const vehicles = body?.vehicles as FleetVehicleInput[] | undefined

    if (!Array.isArray(vehicles)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid fleet data'
      })
    }

    for (const vehicle of vehicles) {
      if (!vehicle.name_ro?.trim() || !vehicle.name_en?.trim()) {
        throw createError({
          statusCode: 400,
          message: 'Each vehicle needs a Romanian and English name'
        })
      }
      if (!vehicle.image_url?.trim()) {
        throw createError({
          statusCode: 400,
          message: 'Each vehicle needs an image URL'
        })
      }
    }

    const saved = await replaceFleetVehicles(vehicles)

    return {
      success: true,
      message: 'Fleet saved successfully',
      vehicles: saved
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to save fleet'
    })
  }
})
