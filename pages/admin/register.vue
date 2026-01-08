<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md mx-auto">
      <div class="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <!-- Logo -->
        <div class="flex justify-center mb-8">
          <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-16 w-auto" />
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-gray-900 text-center mb-2">Create Account</h1>
        <p class="text-gray-600 text-center mb-8">Sign up to access the admin area</p>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-sm text-green-600">{{ success }}</p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

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
              minlength="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="Enter your password (min. 6 characters)"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else class="flex items-center gap-2">
              <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <NuxtLink to="/admin/login" class="text-blue-900 font-medium hover:underline">
              Sign in
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

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: false,
  middleware: 'admin'
})

const { login } = useAuth()
const router = useRouter()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  // Validation
  if (formData.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters long'
    loading.value = false
    return
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Passwords do not match'
    loading.value = false
    return
  }

  try {
    // Create account
    const createResponse = await $fetch('/api/admin/create-user', {
      method: 'POST',
      body: {
        email: formData.value.email,
        password: formData.value.password,
        name: formData.value.name || null
      }
    })

    if (createResponse.success) {
      success.value = 'Account created successfully! Logging you in...'
      
      // Automatically log in the user
      try {
        const loginResult = await login(formData.value.email, formData.value.password)
        
        if (loginResult.success) {
          // Redirect to admin dashboard
          await router.push('/admin')
        } else {
          error.value = 'Account created but login failed. Please try logging in manually.'
        }
      } catch (loginErr) {
        error.value = 'Account created but login failed. Please try logging in manually.'
        console.error('Auto-login error:', loginErr)
      }
    }
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'data' in err) {
      const errorData = err as { data?: { statusCode?: number; message?: string } };
      if (errorData.data?.statusCode === 409) {
        error.value = 'An account with this email already exists';
      } else {
        error.value = errorData.data?.message || 'An error occurred while creating your account. Please try again.';
      }
    } else {
      error.value = 'An error occurred while creating your account. Please try again.';
    }
  } finally {
    loading.value = false;
  }
}

useHead({
  title: 'Create Account - Admin - VanTrans82'
})
</script>
