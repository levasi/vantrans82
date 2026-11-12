import { getCoverage, getDefaultCoverage } from '~/server/utils/coverage-db'

export default defineEventHandler(async () => {
  try {
    const coverage = await getCoverage()
    return {
      success: true,
      ...coverage
    }
  } catch (error: any) {
    console.error('Failed to load coverage:', error)
    return {
      success: true,
      ...getDefaultCoverage()
    }
  }
})
