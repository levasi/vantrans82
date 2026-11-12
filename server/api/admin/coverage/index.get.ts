import { getCoverage } from '~/server/utils/coverage-db'

export default defineEventHandler(async () => {
  try {
    const coverage = await getCoverage()
    return {
      success: true,
      ...coverage
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to load coverage'
    })
  }
})
