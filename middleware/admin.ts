export default defineNuxtRouteMiddleware(async (to, from) => {
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

        // If authenticated and on login page, redirect to admin dashboard
        if (isAuthenticated.value && to.path === '/admin/login') {
            return navigateTo('/admin')
        }

        // If authenticated and not on login page, allow access
        if (isAuthenticated.value && to.path !== '/admin/login') {
            return
        }
    }

    // No token or not authenticated - redirect to login if not already there
    if (!isAuthenticated.value && to.path !== '/admin/login') {
        return navigateTo('/admin/login')
    }
})

