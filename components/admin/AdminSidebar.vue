<template>
    <aside class="w-64 bg-white border-r border-gray-200 min-h-screen">
        <nav class="p-4">
            <ul class="space-y-2">
                <li>
                    <NuxtLink to="/admin" class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <LayoutDashboard class="w-5 h-5" />
                        Dashboard
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/translations"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin/translations') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <FileText class="w-5 h-5" />
                        Translations
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/settings"
                        class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                        :class="isActive('/admin/settings') ? 'bg-blue-50 text-blue-900 font-medium' : 'text-gray-700 hover:bg-gray-50'">
                        <Settings class="w-5 h-5" />
                        Settings
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { LayoutDashboard, FileText, Mail, Settings } from 'lucide-vue-next'

const route = useRoute()

const isActive = (path: string) => {
    return route.path === path
}
</script>
