export default defineNuxtPlugin({
  name: 'auth-restore',
  setup() {
    sessionStorage.removeItem('admin_token')
    sessionStorage.removeItem('admin_user')

    const { checkAuth } = useAuth()
    checkAuth()
  }
})
