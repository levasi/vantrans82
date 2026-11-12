import { saveCoverage, type CoveragePayload } from '~/server/utils/coverage-db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const content = body?.content
    const regions = body?.regions

    if (!content || typeof content !== 'object' || !Array.isArray(regions)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid coverage data'
      })
    }

    if (!content.title_ro?.trim() || !content.title_en?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'Coverage title is required in Romanian and English'
      })
    }

    if (!content.map_image_url?.trim()) {
      throw createError({
        statusCode: 400,
        message: 'Map image URL is required'
      })
    }

    for (const region of regions) {
      if (!region.name_ro?.trim() || !region.name_en?.trim()) {
        throw createError({
          statusCode: 400,
          message: 'Each region needs a Romanian and English name'
        })
      }
    }

    const saved = await saveCoverage({ content, regions } as CoveragePayload)

    return {
      success: true,
      message: 'Coverage saved successfully',
      ...saved
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to save coverage'
    })
  }
})
