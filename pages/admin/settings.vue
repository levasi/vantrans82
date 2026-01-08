<template>
  <div class="min-h-screen bg-gray-50">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="flex">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
        <div class="max-w-4xl mx-auto">
          <!-- Header -->
          <div class="mb-6 sm:mb-8">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
            <p class="text-sm sm:text-base text-gray-600">Manage your website settings and configuration</p>
          </div>

          <!-- Success/Error Messages -->
          <div v-if="message" :class="[
            'mb-6 p-4 rounded-lg',
            messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          ]">
            {{ message }}
          </div>

          <!-- General Settings -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Globe class="w-5 h-5" />
              General Settings
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  v-model="settings.companyName"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="VanTrans82"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                <input
                  v-model="settings.contactEmail"
                  type="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="contact@vantrans82.ro"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  v-model="settings.phoneNumber"
                  type="tel"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="+40 123 456 789"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  v-model="settings.address"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="Str. Logistica nr. 123, Bucharest, Romania"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Email Settings -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail class="w-5 h-5" />
              Email Settings
            </h2>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                <input
                  v-model="settings.smtpHost"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="smtp.example.com"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                  <input
                    v-model="settings.smtpPort"
                    type="number"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="587"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                  <input
                    v-model="settings.smtpUsername"
                    type="text"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                    placeholder="your-email@example.com"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                <input
                  v-model="settings.smtpPassword"
                  type="password"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label class="flex items-center gap-2">
                  <input
                    v-model="settings.smtpSecure"
                    type="checkbox"
                    class="w-4 h-4 text-blue-900 border-gray-300 rounded focus:ring-blue-900"
                  />
                  <span class="text-sm text-gray-700">Use SSL/TLS</span>
                </label>
              </div>
            </div>
          </div>

          <!-- System Information -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Server class="w-5 h-5" />
              System Information
            </h2>
            <div class="space-y-3">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Database Status</span>
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  systemInfo.dbConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ systemInfo.dbConnected ? 'Connected' : 'Disconnected' }}
                </span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Environment</span>
                <span class="text-sm font-medium text-gray-900">{{ systemInfo.environment }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2 border-b border-gray-100">
                <span class="text-sm text-gray-600">Node.js Version</span>
                <span class="text-sm font-medium text-gray-900">{{ systemInfo.nodeVersion }}</span>
              </div>
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 py-2">
                <span class="text-sm text-gray-600">Uptime</span>
                <span class="text-sm font-medium text-gray-900">{{ systemInfo.uptime }}</span>
              </div>
            </div>
          </div>

          <!-- Account Settings -->
          <div class="bg-white rounded-xl shadow-sm border border-red-200 p-4 sm:p-6 mb-6">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Trash2 class="w-5 h-5 text-red-600" />
              <span class="text-red-600">Danger Zone</span>
            </h2>
            <div class="space-y-4">
              <div>
                <h3 class="text-base font-medium text-gray-900 mb-2">Delete Account</h3>
                <p class="text-sm text-gray-600 mb-4">
                  Once you delete your account, there is no going back. This action cannot be undone.
                  You will be logged out immediately and will need to create a new account to access the admin area.
                </p>
                <button
                  @click="handleDeleteAccount"
                  :disabled="deleting"
                  class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Trash2 v-if="!deleting" class="w-4 h-4" />
                  <div v-else class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {{ deleting ? 'Deleting...' : 'Delete My Account' }}
                </button>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="flex flex-col sm:flex-row justify-end gap-4">
            <button
              @click="loadSettings"
              class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Reset
            </button>
            <button
              @click="saveSettings"
              :disabled="saving"
              class="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save v-if="!saving" class="w-5 h-5" />
              <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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

