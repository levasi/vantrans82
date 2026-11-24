<template>
  <div class="admin-access">
    <div class="admin-access__lang">
      <button
        type="button"
        class="admin-access__lang-btn"
        :class="{ 'admin-access__lang-btn--active': locale === 'en' }"
        @click="switchLocale('en')"
      >
        EN
      </button>
      <button
        type="button"
        class="admin-access__lang-btn"
        :class="{ 'admin-access__lang-btn--active': locale === 'ro' }"
        @click="switchLocale('ro')"
      >
        RO
      </button>
    </div>
    <div class="admin-access__wrap">
      <div class="admin-access__card">
        <div class="admin-access__logo">
          <BrandLogo class="admin-access__logo-img" />
        </div>
        <h1 class="admin-access__title">{{ $t('admin.accessTitle') }}</h1>
        <p class="admin-access__subtitle">{{ statusText }}</p>
        <p v-if="error" class="admin-access__error">{{ error }}</p>
        <button
          type="button"
          class="admin-access__submit"
          :disabled="pending || loading"
          @click="requestRole"
        >
          {{ loading ? $t('admin.saving') : $t('admin.requestRole') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

definePageMeta({
  layout: false,
  middleware: 'admin'
})

const { t, locale, setLocale } = useI18n()
const { user, updateUser } = useAuth()

const loading = ref(false)
const error = ref('')

const pending = computed(() => user.value?.roleRequest === 'pending')

const statusText = computed(() => {
  if (pending.value) return t('admin.accessPending')
  if (user.value?.roleRequest === 'rejected') return t('admin.accessRejected')
  return t('admin.accessSubtitle')
})

const switchLocale = (nextLocale: 'en' | 'ro') => {
  if (locale.value === nextLocale) return
  setLocale(nextLocale)
}

const requestRole = async () => {
  error.value = ''
  loading.value = true
  try {
    const response = await $fetch<{ user: { id: number; email: string; name?: string | null; role: 'member'; roleRequest: 'pending' } }>('/api/admin/role-request', {
      method: 'POST'
    })

    updateUser(response.user)
  } catch (err: any) {
    error.value = err.data?.message || t('admin.requestFailed')
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Admin Access - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.admin-access {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  box-sizing: border-box;
  background: linear-gradient(to bottom right, #172554, $color-brand, $color-brand-mid);

  &__lang {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    padding: 0.2rem;
    border: 1px solid rgb(255 255 255 / 0.25);
    border-radius: var(--radius-md);
    background: rgb(255 255 255 / 0.12);
  }

  &__lang-btn {
    border: none;
    background: transparent;
    color: rgb(255 255 255 / 0.75);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 600;
    line-height: 1;
    padding: 0.45rem 0.65rem;
    border-radius: calc(var(--radius-md) - 2px);
    cursor: pointer;

    &--active {
      background: $color-text-inverse;
      color: $color-brand;
    }
  }

  &__wrap {
    width: 100%;
    max-width: 28rem;
  }

  &__card {
    background: var(--color-surface);
    border-radius: $radius-2xl;
    box-shadow: var(--shadow-2xl);
    padding: 2rem;
    text-align: center;
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
    margin: 0 0 0.5rem;
  }

  &__subtitle {
    color: var(--color-text-muted);
    margin: 0 0 1.5rem;
  }

  &__error {
    margin: 0 0 1rem;
    color: var(--color-danger);
    font-size: 0.875rem;
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

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
