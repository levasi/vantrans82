<template>
    <header class="bg-white border-b border-gray-200 shadow-sm">
        <div class="px-4 sm:px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <button @click="$emit('toggleSidebar')" 
                        class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Menu class="w-6 h-6 text-gray-700" />
                    </button>
                    <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-8 sm:h-10 w-auto" />
                    <span class="text-lg sm:text-xl font-bold text-gray-900 hidden sm:inline">Admin Panel</span>
                </div>
                <div class="flex items-center gap-2 sm:gap-4">
                    <a href="/" target="_blank" rel="noopener noreferrer"
                        class="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-2">
                        <ExternalLink class="w-4 h-4" />
                        <span class="hidden sm:inline">See Website</span>
                        <span class="sm:hidden">Website</span>
                    </a>
                    <div class="text-xs sm:text-sm text-gray-600 hidden sm:block">
                        {{ user?.name || user?.email }}
                    </div>
                    <button @click="handleLogout"
                        class="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium flex items-center gap-2">
                        <LogOut class="w-4 h-4" />
                        <span class="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { LogOut, Menu, ExternalLink } from 'lucide-vue-next'

defineEmits(['toggleSidebar'])

const { user, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
    logout()
    router.push('/admin/login')
}
</script>
