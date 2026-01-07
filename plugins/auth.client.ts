export default defineNuxtPlugin({
    name: 'auth-restore',
    setup() {
        // Restore auth state from sessionStorage immediately on client
        if (process.client) {
            const token = sessionStorage.getItem('admin_token')
            const storedUser = sessionStorage.getItem('admin_user')

            if (token && storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser)
                    const isAuthenticated = useState('auth.isAuthenticated', () => false)
                    const user = useState('auth.user', () => null)

                    // Restore state synchronously
                    isAuthenticated.value = true
                    user.value = parsedUser
                } catch (e) {
                    // Invalid stored user, clear it
                    sessionStorage.removeItem('admin_token')
                    sessionStorage.removeItem('admin_user')
                }
            }
        }
    }
})

