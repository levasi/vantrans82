<template>
    <div class="min-h-screen bg-gray-50">
        <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="flex">
            <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
            <main class="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
                <div class="max-w-7xl mx-auto">
                    <!-- Welcome Section -->
                    <div class="mb-6 sm:mb-8">
                        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome, {{ user?.name || user?.email }}</h1>
                        <p class="text-sm sm:text-base text-gray-600">Manage your VanTrans82 website from here</p>
                    </div>

                    <!-- Dashboard Stats -->
                    <AdminStats />

                    <!-- Quick Actions -->
                    <div class="mt-6 sm:mt-8">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <AdminActionCard title="Translations"
                                description="Edit website translations for all languages" icon="FileText"
                                @click="navigateTo('/admin/translations')" />
                            <AdminActionCard title="View Messages" description="Check contact form submissions"
                                icon="Mail" @click="navigateTo('/admin/messages')" />
                            <AdminActionCard title="Settings" description="Configure website settings" icon="Settings"
                                @click="navigateTo('/admin/settings')" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
    middleware: 'admin',
    layout: false
})

const { user } = useAuth()
const sidebarOpen = ref(false)

useHead({
    title: 'Admin Dashboard - VanTrans82'
})
</script>
