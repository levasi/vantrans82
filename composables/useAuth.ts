export type AuthUser = {
  id: number
  email: string
  name?: string | null
  role?: 'member' | 'admin' | 'owner'
  roleRequest?: 'none' | 'pending' | 'rejected'
}

export const adminHomePath = (role?: AuthUser['role']) =>
  role === 'member' ? '/admin/access' : '/admin'

let authCheck: Promise<void> | null = null

export const useAuth = () => {
  const isAuthenticated = useState('auth.isAuthenticated', () => false)
  const user = useState('auth.user', () => null as AuthUser | null)
  const isCheckingAuth = useState('auth.isChecking', () => false)

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await $fetch('/api/admin/login', {
        method: 'POST',
        body: {
          email,
          password
        }
      }) as { success: boolean; user: AuthUser }

      if (response.success && response.user) {
        isAuthenticated.value = true
        user.value = response.user
        return { success: true }
      }

      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.message || 'An error occurred during login'
      }
    }
  }

  const updateUser = (nextUser: AuthUser) => {
    user.value = {
      ...user.value,
      ...nextUser,
      role: nextUser.role ?? user.value?.role,
      roleRequest: nextUser.roleRequest ?? user.value?.roleRequest
    }
  }

  const logout = async () => {
    try {
      await $fetch('/api/admin/logout', { method: 'POST' })
    } catch {
      // Clear local state even if the cookie was already gone.
    }

    isAuthenticated.value = false
    user.value = null
  }

  const checkAuth = () => {
    if (!process.client) {
      return Promise.resolve()
    }

    if (!authCheck) {
      isCheckingAuth.value = true
      authCheck = verifySession().finally(() => {
        isCheckingAuth.value = false
        authCheck = null
      })
    }

    return authCheck
  }

  const verifySession = async () => {
    try {
      const response = await $fetch('/api/admin/verify') as { success: boolean; user: AuthUser }

      if (response.success && response.user) {
        isAuthenticated.value = true
        user.value = response.user
        return
      }
    } catch {
      // A missing or expired cookie is a logged-out session.
    }

    isAuthenticated.value = false
    user.value = null
  }

  return {
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    isCheckingAuth: readonly(isCheckingAuth),
    login,
    logout,
    updateUser,
    checkAuth
  }
}
