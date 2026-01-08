<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-16 w-auto" />
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Admin Login</h1>
        <p class="text-gray-600 text-center mb-8">Sign in to access the admin area</p>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="admin@vantrans82.ro"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Don't have an account?
            <NuxtLink to="/admin/register" class="text-blue-900 font-medium hover:underline">
              Create one
            </NuxtLink>
          </p>
        </div>

        <!-- Footer -->
        <p class="mt-6 text-center text-sm text-gray-500">
          VanTrans82 Admin Portal
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Lock, Mail } from 'lucide-vue-next'

definePageMeta({
  layout: false,
  middleware: 'admin'
})

const { login } = useAuth()
const router = useRouter()

const formData = ref({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const result = await login(formData.value.email, formData.value.password)
    
    if (result.success) {
      // Redirect to admin dashboard
      await router.push('/admin')
    } else {
      error.value = result.error || 'Invalid email or password. Please try again.'
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An error occurred. Please try again.'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Admin Login - VanTrans82'
})
</script>

