import { requireAdmin } from '~/server/utils/admin-session'
import { getCoverage } from '~/server/utils/coverage-db'
import { publicServerError } from '~/server/utils/http'

export default defineEventHandler(async (event) => {
  try {
    await requireAdmin(event)
    const coverage = await getCoverage()
    return {
      success: true,
      ...coverage
    }
  } catch (error: unknown) {
    publicServerError(error, 'Failed to load coverage')
  }
})
