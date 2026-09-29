<template>
  <div class="admin-settings">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="admin-settings__body">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="admin-settings__main">
        <div class="admin-settings__container">
          <!-- Header -->
          <div class="admin-settings__header">
            <h1 class="admin-settings__title">Settings</h1>
            <p class="admin-settings__subtitle">Manage your website settings and configuration</p>
          </div>

          <!-- Success/Error Messages -->
          <div
            v-if="message"
            class="admin-settings__alert"
            :class="messageType === 'success' ? 'admin-settings__alert--success' : 'admin-settings__alert--error'"
          >
            {{ message }}
          </div>

          <!-- General Settings -->
          <div class="admin-settings__card">
            <h2 class="admin-settings__card-title">
              <Globe class="icon" />
              General Settings
            </h2>
            <div class="admin-settings__fields">
              <div class="admin-settings__field">
                <label class="admin-settings__label">Company Name</label>
                <input
                  v-model="settings.companyName"
                  type="text"
                  class="admin-settings__input"
                  placeholder="VanTrans82"
                />
              </div>
              <div class="admin-settings__field">
                <label class="admin-settings__label">Contact Email</label>
                <input
                  v-model="settings.contactEmail"
                  type="email"
                  class="admin-settings__input"
                  placeholder="contact@vantrans82.ro"
                />
              </div>
              <div class="admin-settings__field">
                <label class="admin-settings__label">Phone Number</label>
                <input
                  v-model="settings.phoneNumber"
                  type="tel"
                  class="admin-settings__input"
                  placeholder="+40 123 456 789"
                />
              </div>
              <div class="admin-settings__field">
                <label class="admin-settings__label">Address</label>
                <textarea
                  v-model="settings.address"
                  rows="3"
                  class="admin-settings__input"
                  placeholder="Str. Logistica nr. 123, Bucharest, Romania"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Email Settings -->
          <div class="admin-settings__card">
            <h2 class="admin-settings__card-title">
              <Mail class="icon" />
              Email Settings
            </h2>
            <div class="admin-settings__fields">
              <div class="admin-settings__field">
                <label class="admin-settings__label">SMTP Host</label>
                <input
                  v-model="settings.smtpHost"
                  type="text"
                  class="admin-settings__input"
                  placeholder="smtp.example.com"
                />
              </div>
              <div class="admin-settings__grid">
                <div class="admin-settings__field">
                  <label class="admin-settings__label">SMTP Port</label>
                  <input
                    v-model="settings.smtpPort"
                    type="number"
                    class="admin-settings__input"
                    placeholder="587"
                  />
                </div>
                <div class="admin-settings__field">
                  <label class="admin-settings__label">SMTP Username</label>
                  <input
                    v-model="settings.smtpUsername"
                    type="text"
                    class="admin-settings__input"
                    placeholder="your-email@example.com"
                  />
                </div>
              </div>
              <div class="admin-settings__field">
                <label class="admin-settings__label">SMTP Password</label>
                <input
                  v-model="settings.smtpPassword"
                  type="password"
                  class="admin-settings__input"
                  placeholder="••••••••"
                />
              </div>
              <div class="admin-settings__field">
                <label class="admin-settings__checkbox-label">
                  <input
                    v-model="settings.smtpSecure"
                    type="checkbox"
                    class="admin-settings__checkbox"
                  />
                  <span class="admin-settings__checkbox-text">Use SSL/TLS</span>
                </label>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="admin-settings__card">
            <h2 class="admin-settings__card-title">
              <Server class="icon" />
              System Information
            </h2>
            <div class="admin-settings__sys">
              <div class="admin-settings__sys-row admin-settings__sys-row--bordered">
                <span class="admin-settings__sys-label">Database Status</span>
                <span
                  class="admin-settings__badge"
                  :class="systemInfo.dbConnected ? 'admin-settings__badge--success' : 'admin-settings__badge--error'"
                >
                  {{ systemInfo.dbConnected ? 'Connected' : 'Disconnected' }}
                </span>
              </div>
              <div class="admin-settings__sys-row admin-settings__sys-row--bordered">
                <span class="admin-settings__sys-label">Environment</span>
                <span class="admin-settings__sys-value">{{ systemInfo.environment }}</span>
              </div>
              <div class="admin-settings__sys-row admin-settings__sys-row--bordered">
                <span class="admin-settings__sys-label">Node.js Version</span>
                <span class="admin-settings__sys-value">{{ systemInfo.nodeVersion }}</span>
              </div>
              <div class="admin-settings__sys-row">
                <span class="admin-settings__sys-label">Uptime</span>
                <span class="admin-settings__sys-value">{{ systemInfo.uptime }}</span>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="admin-settings__card admin-settings__card--danger">
            <h2 class="admin-settings__card-title">
              <Trash2 class="icon admin-settings__danger-icon" />
              <span class="admin-settings__danger-text">Danger Zone</span>
            </h2>
            <div class="admin-settings__fields">
              <div class="admin-settings__field">
                <h3 class="admin-settings__danger-heading">Delete Account</h3>
                <p class="admin-settings__danger-desc">
                  Once you delete your account, there is no going back. This action cannot be undone.
                  You will be logged out immediately and will need to create a new account to access the admin area.
                </p>
                <button
                  @click="handleDeleteAccount"
                  :disabled="deleting"
                  class="admin-settings__btn admin-settings__btn--danger"
                >
                  <Trash2 v-if="!deleting" class="icon icon--sm" />
                  <div v-else class="admin-settings__spinner admin-settings__spinner--sm"></div>
                  {{ deleting ? 'Deleting...' : 'Delete My Account' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="admin-settings__actions">
            <button
              @click="loadSettings"
              class="admin-settings__btn admin-settings__btn--secondary"
            >
              Reset
            </button>
            <button
              @click="saveSettings"
              :disabled="saving"
              class="admin-settings__btn admin-settings__btn--primary"
            >
              <Save v-if="!saving" class="icon" />
              <div v-else class="admin-settings__spinner"></div>
              {{ saving ? 'Saving...' : 'Save Settings' }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Save, Globe, Mail, Server, Trash2 } from 'lucide-vue-next'

definePageMeta({
  middleware: 'admin',
  layout: false
})

const sidebarOpen = ref(false)

// Auth is handled by middleware

const settings = ref({
  companyName: 'VanTrans82',
  contactEmail: 'contact@vantrans82.ro',
  phoneNumber: '+40 123 456 789',
  address: 'Str. Logistica nr. 123\nBucharest, Romania',
  smtpHost: '',
  smtpPort: '587',
  smtpUsername: '',
  smtpPassword: '',
  smtpSecure: false,
  showLanguageSwitch: true
})

const systemInfo = ref({
  dbConnected: false,
  environment: 'development',
  nodeVersion: '',
  uptime: ''
})

const saving = ref(false)
const deleting = ref(false)
const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const { user, logout } = useAuth()
const router = useRouter()

// Load settings
const loadSettings = async () => {
  try {
    const response = await $fetch('/api/admin/settings')
    if (response.settings) {
      settings.value = { ...settings.value, ...response.settings }
    }
    
    // Load system info
    const systemResponse = await $fetch('/api/admin/settings/system')
    systemInfo.value = systemResponse
  } catch (error: any) {
    console.error('Failed to load settings:', error)
  }
}

// Save settings
const saveSettings = async () => {
  saving.value = true
  message.value = ''
  
  try {
    await $fetch('/api/admin/settings', {
      method: 'PUT',
      body: { settings: settings.value }
    })
    
    message.value = 'Settings saved successfully!'
    messageType.value = 'success'
    
    setTimeout(() => {
      message.value = ''
    }, 3000)
  } catch (error: any) {
    message.value = error.data?.message || 'Failed to save settings'
    messageType.value = 'error'
  } finally {
    saving.value = false
  }
}

// Delete account
const handleDeleteAccount = async () => {
  const confirmed = confirm(
    '⚠️ WARNING: This will permanently delete your account!\n\n' +
    'This action cannot be undone. You will be logged out immediately.\n\n' +
    'Are you absolutely sure you want to delete your account?'
  )

  if (!confirmed) {
    return
  }

  // Double confirmation
  const doubleConfirmed = confirm(
    'This is your last chance to cancel.\n\n' +
    'Click OK to permanently delete your account.'
  )

  if (!doubleConfirmed) {
    return
  }

  deleting.value = true
  message.value = ''

  try {
    const token = sessionStorage.getItem('admin_token')
    if (!token) {
      throw new Error('No authentication token found')
    }

    await $fetch('/api/admin/delete-account', {
      method: 'POST',
      query: { token }
    })

    message.value = 'Account deleted successfully. Logging out...'
    messageType.value = 'success'

    // Logout and redirect after a short delay
    setTimeout(() => {
      logout()
      router.push('/admin/login')
    }, 1500)
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'data' in error) {
      const errorData = error as { data?: { message?: string } }
      message.value = errorData.data?.message || 'Failed to delete account'
    } else {
      message.value = 'An error occurred while deleting your account'
    }
    messageType.value = 'error'
    deleting.value = false
  }
}

// Load on mount
onMounted(async () => {
  await loadSettings()
})

useHead({
  title: 'Settings - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-settings {
  min-height: 100vh;
  background: var(--color-muted);

  &__body {
    display: flex;
  }

  &__main {
    flex: 1;
    padding: 1rem;

    @include respond-to(sm) {
      padding: 1.5rem;
    }

    @include respond-to(lg) {
      padding: 2rem;
      margin-left: 0;
    }
  }

  &__container {
    max-width: $container-narrow;
    margin-left: auto;
    margin-right: auto;
  }

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

  &__subtitle {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;

    @include respond-to(sm) {
      font-size: 1rem;
    }
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
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @include respond-to(sm) {
      font-size: 1.25rem;
    }
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    padding: 0.5rem 1rem;
    border: 1px solid $color-border-strong;
    border-radius: var(--radius-md);
    outline: none;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    resize: vertical;
    transition: box-shadow 0.15s, border-color 0.15s;

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px var(--color-brand);
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  &__checkbox {
    width: 1rem;
    height: 1rem;
    accent-color: var(--color-brand);
    border-radius: $radius-sm;
  }

  &__checkbox-text {
    font-size: 0.875rem;
    color: var(--color-text-secondary);
  }

  &__sys {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__sys-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0;

    @include respond-to(sm) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    &--bordered {
      border-bottom: 1px solid #f3f4f6;
    }
  }

  &__sys-label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
  }

  &__sys-value {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text);
  }

  &__badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: $radius-full;
    font-size: 0.75rem;
    font-weight: 500;

    &--success {
      background: #dcfce7;
      color: #166534;
    }

    &--error {
      background: #fee2e2;
      color: #991b1b;
    }
  }

  &__danger-icon {
    color: var(--color-danger);
  }

  &__danger-text {
    color: var(--color-danger);
  }

  &__danger-heading {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    margin: 0 0 0.5rem;
  }

  &__danger-desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0 0 1rem;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 1rem;

    @include respond-to(sm) {
      flex-direction: row;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &--primary {
      background: var(--color-brand);
      color: $color-text-inverse;

      &:hover:not(:disabled) {
        background: var(--color-brand-dark);
      }
    }

    &--secondary {
      background: #e5e7eb;
      color: var(--color-text-secondary);

      &:hover {
        background: $color-border-strong;
      }
    }

    &--danger {
      background: var(--color-danger);
      color: $color-text-inverse;

      &:hover:not(:disabled) {
        background: #b91c1c;
      }
    }
  }

  &__spinner {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: $radius-full;
    border: 2px solid transparent;
    border-bottom-color: currentColor;
    animation: admin-settings-spin 0.75s linear infinite;

    &--sm {
      width: 1rem;
      height: 1rem;
    }
  }
}

@keyframes admin-settings-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
