<template>
  <div class="admin-users">
    <div class="admin-users__header">
      <h1 class="admin-users__title">{{ $t('admin.users') }}</h1>
      <p class="admin-users__subtitle">{{ $t('admin.usersSubtitle') }}</p>
    </div>

    <p v-if="error" class="admin-users__alert admin-users__alert--error">{{ error }}</p>
    <p v-else-if="message" class="admin-users__alert admin-users__alert--success">{{ message }}</p>

    <p v-if="loading" class="admin-users__empty">{{ $t('admin.loadingSection') }}</p>
    <p v-else-if="users.length === 0" class="admin-users__empty">{{ $t('admin.usersEmpty') }}</p>

    <div v-else class="admin-users__table-wrap">
      <table class="admin-users__table">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="account in users"
            :key="account.id"
            :class="{ 'admin-users__row--pending': account.roleRequest === 'pending' }"
          >
            <td>
              <input
                :id="`name-${account.id}`"
                v-model="account.name"
                type="text"
                class="admin-users__input"
                :aria-label="$t('admin.name')"
              />
            </td>
            <td>
              <input
                :id="`email-${account.id}`"
                v-model="account.email"
                type="email"
                required
                class="admin-users__input"
                :aria-label="$t('admin.emailAddress')"
              />
            </td>
            <td>
              <select
                v-if="account.role !== 'owner'"
                :id="`role-${account.id}`"
                v-model="account.role"
                class="admin-users__input"
                :aria-label="$t('admin.role')"
              >
                <option value="member">{{ $t('admin.roleMember') }}</option>
                <option value="admin">{{ $t('admin.roleAdmin') }}</option>
              </select>
              <span v-else class="admin-users__owner">{{ $t('admin.roleOwner') }}</span>
            </td>
            <td>
              <span class="admin-users__badge" :class="`admin-users__badge--${account.roleRequest}`">
                {{ requestLabel(account.roleRequest) }}
              </span>
            </td>
            <td class="admin-users__meta">{{ formatDate(account.createdAt) }}</td>
            <td>
              <button
                type="button"
                class="admin-users__btn"
                :disabled="savingId === account.id"
                @click="saveUser(account)"
              >
                {{ savingId === account.id ? $t('admin.saving') : $t('admin.saveUser') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

definePageMeta({
  middleware: 'admin',
  layout: 'admin'
})

type AccountRole = 'member' | 'admin' | 'owner'
type RequestStatus = 'none' | 'pending' | 'rejected'

type AccountRow = {
  id: number
  email: string
  name: string
  role: AccountRole
  roleRequest: RequestStatus
  createdAt: string
}

const { t, locale } = useI18n()

const columns = computed(() => [
  { key: 'name', label: t('admin.name') },
  { key: 'email', label: t('admin.emailAddress') },
  { key: 'role', label: t('admin.role') },
  { key: 'request', label: t('admin.requestStatus') },
  { key: 'joined', label: t('admin.joined') }
])
const loading = ref(true)
const savingId = ref<number | null>(null)
const error = ref('')
const message = ref('')
const users = ref<AccountRow[]>([])

const requestLabel = (status: RequestStatus) => {
  if (status === 'pending') return t('admin.requestPending')
  if (status === 'rejected') return t('admin.requestRejected')
  return t('admin.requestNone')
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale.value === 'ro' ? 'ro-RO' : 'en-US', {
    dateStyle: 'medium'
  }).format(date)
}

const loadUsers = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await $fetch<{ users: AccountRow[] }>('/api/admin/users')
    users.value = response.users.map((account) => ({
      ...account,
      name: account.name || ''
    }))
  } catch (err: any) {
    error.value = err.data?.message || t('admin.usersLoadFailed')
  } finally {
    loading.value = false
  }
}

const saveUser = async (account: AccountRow) => {
  savingId.value = account.id
  error.value = ''
  message.value = ''
  try {
    const response = await $fetch<{ user: AccountRow }>(`/api/admin/users/${account.id}`, {
      method: 'PUT',
      body: {
        name: account.name,
        email: account.email,
        role: account.role
      }
    })
    const index = users.value.findIndex((row) => row.id === account.id)
    if (index !== -1) {
      users.value[index] = {
        ...response.user,
        name: response.user.name || ''
      }
    }
    message.value = t('admin.userSaved')
  } catch (err: any) {
    error.value = err.data?.message || t('admin.userSaveFailed')
  } finally {
    savingId.value = null
  }
}

onMounted(loadUsers)

useHead({
  title: 'Users - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-users {
  &__header {
    margin-bottom: 1.5rem;
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
  &__empty {
    margin: 0;
    color: var(--color-text-muted);
  }

  &__alert {
    margin-bottom: 1rem;
    padding: 1rem;
    border-radius: var(--radius-md);

    &--success {
      background: var(--color-success-light);
      color: #166534;
    }

    &--error {
      background: #fef2f2;
      color: var(--color-danger);
    }
  }

  &__table-wrap {
    overflow-x: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  &__table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.75rem 1rem;
      text-align: left;
      vertical-align: middle;
      border-bottom: 1px solid var(--color-border);
    }

    th {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      color: var(--color-text-muted);
      background: var(--color-muted);
    }

    tr:last-child td {
      border-bottom: none;
    }
  }

  &__row--pending td {
    background: var(--color-accent-light);
  }

  &__badge {
    display: inline-block;
    white-space: nowrap;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius-md);
    background: var(--color-muted);
    color: var(--color-text-muted);

    &--pending {
      background: var(--color-accent-light);
      color: var(--color-accent-hover);
    }
  }

  &__meta {
    font-size: 0.875rem;
    color: var(--color-text-faint);
  }

  &__input {
    width: 100%;
    min-width: 11rem;
    padding: 0.5rem 0.75rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    background: var(--color-surface);
    font: inherit;
    box-sizing: border-box;
  }

  &__owner {
    font-weight: 600;
    color: var(--color-text);
  }

  &__btn {
    white-space: nowrap;
    padding: 0.7rem 1.25rem;
    border: none;
    border-radius: var(--radius-md);
    background: var(--color-brand);
    color: $color-text-inverse;
    font: inherit;
    font-weight: 500;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
