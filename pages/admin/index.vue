<template>
    <div class="admin-dashboard">
        <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="admin-dashboard__body">
            <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
            <main class="admin-dashboard__main">
                <div class="admin-dashboard__container">
                    <!-- Welcome Section -->
                    <div class="admin-dashboard__welcome">
                        <h1 class="admin-dashboard__title">Welcome, {{ user?.name || user?.email }}</h1>
                        <p class="admin-dashboard__subtitle">Manage your VanTrans82 website from here</p>
                    </div>

                    <!-- Dashboard Stats -->
                    <AdminStats />

                    <!-- Quick Actions -->
                    <div class="admin-dashboard__actions">
                        <h2 class="admin-dashboard__actions-title">Quick Actions</h2>
                        <div class="admin-dashboard__actions-grid">
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-dashboard {
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
    max-width: $container-max;
    margin-left: auto;
    margin-right: auto;
  }

  &__welcome {
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

  &__actions {
    margin-top: 1.5rem;

    @include respond-to(sm) {
      margin-top: 2rem;
    }
  }

  &__actions-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 1rem;

    @include respond-to(sm) {
      font-size: 1.25rem;
    }
  }

  &__actions-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
