export const useAuth = () => {
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const user = useState('auth.user', () => null as { id: number; email: string; name?: string } | null)
  const isCheckingAuth = useState('auth.isChecking', () => false)

  // Note: Auth state restoration is now handled by plugins/auth.client.ts
  // This ensures state is restored before middleware runs

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await $fetch('/api/admin/login', {
        method: 'POST',
        body: {
          email,
          password
        }
      }) as { success: boolean; user: any; token: string }

      if (response.success && response.user) {
        isAuthenticated.value = true
        user.value = response.user
        
        // Store token and user info in sessionStorage
        if (process.client) {
          sessionStorage.setItem('admin_token', response.token)
          sessionStorage.setItem('admin_user', JSON.stringify(response.user))
        }
        
        return { success: true }
      }
      
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      return { 
        success: false, 
        error: error.data?.message || error.message || 'An error occurred during login' 
      }
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    user.value = null
    if (process.client) {
      sessionStorage.removeItem('admin_token')
      sessionStorage.removeItem('admin_user')
    }
  }

  const checkAuth = async () => {
    if (process.client) {
      // If already checking, don't check again
      if (isCheckingAuth.value) {
        return
      }

      // If already authenticated, skip the check to avoid flicker
      if (isAuthenticated.value) {
        return
      }

      isCheckingAuth.value = true

      const token = sessionStorage.getItem('admin_token')
      const storedUser = sessionStorage.getItem('admin_user')
      
      if (token && storedUser) {
        try {
          // Verify token with server
          const response = await $fetch('/api/admin/verify', {
            method: 'GET',
            query: { token }
          }) as { success: boolean; user: any }

          if (response.success && response.user) {
            isAuthenticated.value = true
            user.value = response.user
            // Update stored user in case it changed
            sessionStorage.setItem('admin_user', JSON.stringify(response.user))
          } else {
            // Verification failed, clear storage
            isAuthenticated.value = false
            user.value = null
            sessionStorage.removeItem('admin_token')
            sessionStorage.removeItem('admin_user')
          }
        } catch (error) {
          // Token invalid, clear storage
          isAuthenticated.value = false
          user.value = null
          sessionStorage.removeItem('admin_token')
          sessionStorage.removeItem('admin_user')
        }
      } else {
        // No token or user, ensure state is cleared
        isAuthenticated.value = false
        user.value = null
      }

      isCheckingAuth.value = false
    }
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    isCheckingAuth: readonly(isCheckingAuth),
    login,
    logout,
    checkAuth
  }
}

