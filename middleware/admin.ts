import { adminHomePath } from '~/composables/useAuth'

const publicPaths = ['/admin/login', '/admin/register']

export default defineNuxtRouteMiddleware(async (to) => {
  if (!process.client) {
    return
  }

  const { isAuthenticated, user, checkAuth } = useAuth()
  await checkAuth()

  if (isAuthenticated.value) {
    const role = user.value?.role
    const home = adminHomePath(role)

    if (publicPaths.includes(to.path)) {
      return navigateTo(home)
    }

    if (role === 'member' && to.path !== '/admin/access') {
      return navigateTo('/admin/access')
    }

    if (role !== 'member' && to.path === '/admin/access') {
      return navigateTo('/admin')
    }

    if (to.path === '/admin/users' && role !== 'owner') {
      return navigateTo('/admin')
    }

    return
  }

  if (publicPaths.includes(to.path)) {
    return
  }

  return navigateTo('/admin/login')
})
