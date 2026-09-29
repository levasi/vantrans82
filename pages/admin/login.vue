<template>
  <div class="admin-login">
    <div class="admin-login__wrap">
      <div class="admin-login__card">
        <!-- Logo -->
        <div class="admin-login__logo">
          <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="admin-login__logo-img" />
        </div>

        <!-- Title -->
        <h1 class="admin-login__title">Admin Login</h1>
        <p class="admin-login__subtitle">Sign in to access the admin area</p>

        <!-- Error Message -->
        <div v-if="error" class="admin-login__alert admin-login__alert--error">
          <p class="admin-login__alert-text">{{ error }}</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="admin-login__form">
          <div class="admin-login__field">
            <label for="email" class="admin-login__label">
              Email Address
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="admin-login__input"
              placeholder="admin@vantrans82.ro"
            />
          </div>

          <div class="admin-login__field">
            <label for="password" class="admin-login__label">
              Password
            </label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              required
              class="admin-login__input"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="admin-login__submit"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else class="admin-login__loading">
              <svg class="admin-login__spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="admin-login__spinner-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="admin-login__spinner-head" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="admin-login__footer-link">
          <p class="admin-login__footer-text">
            Don't have an account?
            <NuxtLink to="/admin/register" class="admin-login__link">
              Create one
            </NuxtLink>
          </p>
        </div>

        <!-- Footer -->
        <p class="admin-login__portal">
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-login {
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
  }

  &__alert-text {
    font-size: 0.875rem;
    color: var(--color-danger);
    margin: 0;
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
    animation: admin-login-spin 1s linear infinite;
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

@keyframes admin-login-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
