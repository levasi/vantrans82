<template>
  <div class="admin-account">
    <div class="admin-account__header">
      <h1 class="admin-account__title">{{ $t('admin.account') }}</h1>
      <p class="admin-account__subtitle">{{ $t('admin.accountSubtitle') }}</p>
    </div>

    <div
      v-if="message"
      class="admin-account__alert"
      :class="messageType === 'success' ? 'admin-account__alert--success' : 'admin-account__alert--error'"
    >
      {{ message }}
    </div>

    <div class="admin-account__card">
      <h2 class="admin-account__card-title">
        <User class="icon" />
        {{ $t('admin.profile') }}
      </h2>
      <form class="admin-account__fields" @submit.prevent="saveProfile">
        <div class="admin-account__field">
          <label class="admin-account__label" for="account-name">{{ $t('admin.name') }}</label>
          <input id="account-name" v-model="profile.name" type="text" class="admin-account__input" />
        </div>
        <div class="admin-account__field">
          <label class="admin-account__label" for="account-email">{{ $t('admin.emailAddress') }}</label>
          <input id="account-email" v-model="profile.email" type="email" required class="admin-account__input" />
        </div>
        <div class="admin-account__actions">
          <button type="submit" class="admin-account__btn admin-account__btn--primary" :disabled="savingProfile">
            {{ savingProfile ? $t('admin.saving') : $t('admin.saveProfile') }}
          </button>
        </div>
      </form>
    </div>

    <div class="admin-account__card">
      <h2 class="admin-account__card-title">
        <Lock class="icon" />
        {{ $t('admin.password') }}
      </h2>
      <form class="admin-account__fields" @submit.prevent="savePassword">
        <div class="admin-account__field">
          <label class="admin-account__label" for="current-password">{{ $t('admin.currentPassword') }}</label>
          <input id="current-password" v-model="password.current" type="password" required class="admin-account__input" />
        </div>
        <div class="admin-account__field">
          <label class="admin-account__label" for="new-password">{{ $t('admin.newPassword') }}</label>
          <input id="new-password" v-model="password.next" type="password" required minlength="8" class="admin-account__input" />
        </div>
        <div class="admin-account__field">
          <label class="admin-account__label" for="confirm-password">{{ $t('admin.confirmPassword') }}</label>
          <input id="confirm-password" v-model="password.confirm" type="password" required minlength="8" class="admin-account__input" />
        </div>
        <div class="admin-account__actions">
          <button type="submit" class="admin-account__btn admin-account__btn--primary" :disabled="savingPassword">
            {{ savingPassword ? $t('admin.saving') : $t('admin.updatePassword') }}
          </button>
        </div>
      </form>
    </div>

    <div class="admin-account__card admin-account__card--danger">
      <h2 class="admin-account__card-title">
        <Trash2 class="icon admin-account__danger-icon" />
        <span class="admin-account__danger-text">{{ $t('admin.dangerZone') }}</span>
      </h2>
      <p class="admin-account__danger-desc">{{ $t('admin.deleteAccountDesc') }}</p>
      <form class="admin-account__fields" @submit.prevent="handleDeleteAccount">
        <div class="admin-account__field">
          <label class="admin-account__label" for="delete-password">{{ $t('admin.currentPassword') }}</label>
          <input
            id="delete-password"
            v-model="deletePassword"
            type="password"
            required
            autocomplete="current-password"
            class="admin-account__input"
          />
        </div>
        <button
          type="submit"
          class="admin-account__btn admin-account__btn--danger"
          :disabled="deleting"
        >
          {{ deleting ? $t('admin.deleting') : $t('admin.deleteAccount') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Lock, Trash2, User } from 'lucide-vue-next'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

const { t } = useI18n()
const { user, logout, updateUser } = useAuth()
const router = useRouter()
const savingProfile = ref(false)
const savingPassword = ref(false)
const deleting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

const profile = ref({
  name: '',
  email: ''
})

const password = ref({
  current: '',
  next: '',
  confirm: ''
})
const deletePassword = ref('')

const showMessage = (text: string, type: 'success' | 'error') => {
  message.value = text
  messageType.value = type
}

const saveProfile = async () => {
  savingProfile.value = true
  message.value = ''
  try {
    const response = await $fetch<{ user: { id: number; email: string; name?: string } }>('/api/admin/account', {
      method: 'PUT',
      body: {
        name: profile.value.name,
        email: profile.value.email
      }
    })

    updateUser(response.user)
    showMessage(t('admin.profileSaved'), 'success')
  } catch (error: any) {
    showMessage(error.data?.message || t('admin.profileSaveFailed'), 'error')
  } finally {
    savingProfile.value = false
  }
}

const savePassword = async () => {
  if (password.value.next !== password.value.confirm) {
    showMessage(t('admin.passwordMismatch'), 'error')
    return
  }

  savingPassword.value = true
  message.value = ''
  try {
    await $fetch('/api/admin/account/password', {
      method: 'PUT',
      body: {
        currentPassword: password.value.current,
        newPassword: password.value.next
      }
    })

    password.value = { current: '', next: '', confirm: '' }
    showMessage(t('admin.passwordUpdated'), 'success')
  } catch (error: any) {
    showMessage(error.data?.message || t('admin.passwordUpdateFailed'), 'error')
  } finally {
    savingPassword.value = false
  }
}

const handleDeleteAccount = async () => {
  if (!confirm(t('admin.deleteAccountConfirm'))) return

  deleting.value = true
  message.value = ''
  try {
    await $fetch('/api/admin/delete-account', {
      method: 'POST',
      body: {
        currentPassword: deletePassword.value
      }
    })

    await logout()
    await router.push('/admin/login')
  } catch (error: any) {
    showMessage(error.data?.message || t('admin.deleteAccountFailed'), 'error')
    deleting.value = false
  }
}

onMounted(() => {
  profile.value = {
    name: user.value?.name || '',
    email: user.value?.email || ''
  }
})

useHead({
  title: 'Account - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-account {
  &__header {
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      margin-bottom: 2rem;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0 0 0.5rem;

    @include respond-to(sm) {
      font-size: 1.875rem;
    }
  }

  &__subtitle,
  &__danger-desc {
    margin: 0 0 1rem;
    color: var(--color-text-muted);
  }

  &__alert {
    margin-bottom: 1.5rem;
    padding: 1rem;
    border-radius: var(--radius-md);

    &--success {
      background: var(--color-success-light);
      color: #166534;
      border: 1px solid #bbf7d0;
    }

    &--error {
      background: #fef2f2;
      color: #991b1b;
      border: 1px solid #fecaca;
    }
  }

  &__card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--color-border);
    padding: 1rem;
    margin-bottom: 1.5rem;

    @include respond-to(sm) {
      padding: 1.5rem;
    }

    &--danger {
      border-color: #fecaca;
    }
  }

  &__card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-secondary);
  }

  &__input {
    width: 100%;
    padding: 0.5rem 1rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font: inherit;
    box-sizing: border-box;
    background: var(--color-surface);

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    font: inherit;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    &--primary {
      background: var(--color-brand);
      color: #fff;
    }

    &--danger {
      background: var(--color-danger);
      color: #fff;
    }
  }

  &__danger-icon,
  &__danger-text {
    color: var(--color-danger);
  }
}
</style>
