<template>
  <div class="admin-register">
    <div class="admin-register__wrap">
      <div class="admin-register__card">
        <!-- Logo -->
        <div class="admin-register__logo">
          <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="admin-register__logo-img" />
        </div>

        <!-- Title -->
        <h1 class="admin-register__title">Create Account</h1>
        <p class="admin-register__subtitle">Sign up to access the admin area</p>

        <!-- Error Message -->
        <div v-if="error" class="admin-register__alert admin-register__alert--error">
          <p class="admin-register__alert-text admin-register__alert-text--error">{{ error }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="success" class="admin-register__alert admin-register__alert--success">
          <p class="admin-register__alert-text admin-register__alert-text--success">{{ success }}</p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="handleRegister" class="admin-register__form">
          <div class="admin-register__field">
            <label for="name" class="admin-register__label">
              Full Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              class="admin-register__input"
              placeholder="John Doe"
            />
          </div>

          <div class="admin-register__field">
            <label for="email" class="admin-register__label">
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="admin-register__input"
              placeholder="admin@vantrans82.ro"
            />
          </div>

          <div class="admin-register__field">
            <label for="password" class="admin-register__label">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              minlength="6"
              class="admin-register__input"
              placeholder="Enter your password (min. 6 characters)"
            />
          </div>

          <div class="admin-register__field">
            <label for="confirmPassword" class="admin-register__label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              required
              class="admin-register__input"
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="admin-register__submit"
          >
            <span v-if="!loading">Create Account</span>
            <span v-else class="admin-register__loading">
              <svg class="admin-register__spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="admin-register__spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="admin-register__spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating account...
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="admin-register__footer-link">
          <p class="admin-register__footer-text">
            Already have an account?
            <NuxtLink to="/admin/login" class="admin-register__link">
              Sign in
            </NuxtLink>
          </p>
        </div>

        <!-- Footer -->
        <p class="admin-register__portal">
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-register {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(to bottom right, #172554, $color-brand, $color-brand-mid);

  &__wrap {
    width: 100%;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
  }

  &__card {
    background: var(--color-surface);
    border-radius: $radius-2xl;
    box-shadow: var(--shadow-2xl);
    padding: 1.5rem;

    @include respond-to(sm) {
      padding: 2rem;
    }
  }

  &__logo {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  &__logo-img {
    height: 4rem;
    width: auto;
  }

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text);
    text-align: center;
    margin: 0 0 0.5rem;
  }

  &__subtitle {
    color: var(--color-text-muted);
    text-align: center;
    margin: 0 0 2rem;
  }

  &__alert {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: var(--radius-md);

    &--error {
      background: #fef2f2;
      border: 1px solid #fecaca;
    }

    &--success {
      background: var(--color-success-light);
      border: 1px solid #bbf7d0;
    }
  }

  &__alert-text {
    font-size: 0.875rem;
    margin: 0;

    &--error {
      color: var(--color-danger);
    }

    &--success {
      color: var(--color-success);
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__field {
    display: block;
  }

  &__label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
    margin-bottom: 0.5rem;
  }

  &__input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    transition: box-shadow 0.15s, border-color 0.15s;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__submit {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background: var(--color-brand);
    color: $color-text-inverse;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background: var(--color-brand-dark);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__spinner {
    height: 1.25rem;
    width: 1.25rem;
    animation: admin-register-spin 1s linear infinite;
  }

  &__spinner-track {
    opacity: 0.25;
  }

  &__spinner-head {
    opacity: 0.75;
  }

  &__footer-link {
    margin-top: 1.5rem;
    text-align: center;
  }

  &__footer-text {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  &__link {
    color: var(--color-brand);
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  &__portal {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: var(--color-text-faint);
  }
}

@keyframes admin-register-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
