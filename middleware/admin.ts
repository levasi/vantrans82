import { adminHomePath } from '~/composables/useAuth'

const publicPaths = ['/admin/login', '/admin/register']

export default defineNuxtRouteMiddleware(async (to) => {
    // On server side, allow the request to proceed
    // The client will handle auth checking
    if (!process.client) {
        return
    }

    const { isAuthenticated, user, checkAuth } = useAuth()

    // Check if there's a token in sessionStorage first
    const hasToken = sessionStorage.getItem('admin_token')
    const hasStoredUser = sessionStorage.getItem('admin_user')

    // If we have a token, we're likely authenticated (plugin should have restored state)
    // But we still need to verify with server
    if (hasToken && hasStoredUser) {
        // If state isn't restored yet (plugin might not have run), restore it now
        if (!isAuthenticated.value) {
            try {
                const parsedUser = JSON.parse(hasStoredUser)
                isAuthenticated.value = true
                user.value = parsedUser
            } catch (e) {
                // Invalid stored user, clear it
                sessionStorage.removeItem('admin_token')
                sessionStorage.removeItem('admin_user')
            }
        }

        // Verify with server (this will update state if token is valid)
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
    }

    // No token or not authenticated - allow access to login and register pages
    if (!isAuthenticated.value && publicPaths.includes(to.path)) {
        return
    }

    // No token or not authenticated - redirect to login if not on login/register page
    if (!isAuthenticated.value && !publicPaths.includes(to.path)) {
        return navigateTo('/admin/login')
    }
})
