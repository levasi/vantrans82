<template>
    <!-- Mobile Overlay -->
    <div v-if="isOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="$emit('close')">
    </div>

    <!-- Sidebar -->
    <aside :class="[
        'fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 min-h-screen transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        'w-64'
    ]">
        <nav class="p-4">
            <!-- Mobile Close Button -->
            <div class="flex items-center justify-between mb-4 lg:hidden">
                <h2 class="text-lg font-semibold text-gray-900">Menu</h2>
                <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg">
                    <X class="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <ul class="space-y-2">
                <li>
                    <NuxtLink to="/admin" 
                        @click="$emit('close')"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <LayoutDashboard class="w-5 h-5" />
                        <span>Dashboard</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/translations"
                        @click="$emit('close')"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin/translations') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <FileText class="w-5 h-5" />
                        <span>Translations</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/settings"
                        @click="$emit('close')"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin/settings') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <Settings class="w-5 h-5" />
                        <span>Settings</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { LayoutDashboard, FileText, Mail, Settings, X } from 'lucide-vue-next'

defineProps<{
    isOpen: boolean
}>()

defineEmits<{
    close: []
}>()

const route = useRoute()

const isActive = (path: string) => {
    return route.path === path
}
</script>
