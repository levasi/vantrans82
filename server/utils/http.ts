export function publicServerError(error: unknown, fallback: string): never {
  if (isHttpError(error)) {
    throw error
  }

  console.error(fallback, error)
  throw createError({
    statusCode: 500,
    message: fallback
  })
}

function isHttpError(error: unknown): error is { statusCode: number } {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'statusCode' in error &&
    typeof (error as { statusCode?: unknown }).statusCode === 'number'
  )
}
