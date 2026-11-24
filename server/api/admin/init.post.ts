export default defineEventHandler(() => {
  throw createError({
    statusCode: 410,
    message: 'Account setup is closed'
  })
})
