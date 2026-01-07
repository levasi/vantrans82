<template>
  <header class="bg-white border-b border-gray-200 shadow-sm">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-10 w-auto" />
          <span class="text-xl font-bold text-gray-900">Admin Panel</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-sm text-gray-600">
            {{ user?.name || user?.email }}
          </div>
          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <LogOut class="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { LogOut } from 'lucide-vue-next'

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/admin/login')
}
</script>

