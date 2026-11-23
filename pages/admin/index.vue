<template>
    <div class="admin-dashboard">
        <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
        <div class="admin-dashboard__body">
            <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
            <main class="admin-dashboard__main">
                <div class="admin-dashboard__container">
                    <!-- Welcome Section -->
                    <div class="admin-dashboard__welcome">
                        <h1 class="admin-dashboard__title">
                            {{ $t('admin.welcome', { name: user?.name || user?.email }) }}
                        </h1>
                        <p class="admin-dashboard__subtitle">{{ $t('admin.welcomeSubtitle') }}</p>
                    </div>

                    <!-- Dashboard Stats -->
                    <AdminStats />

                    <!-- Quick Actions -->
                    <div class="admin-dashboard__actions">
                        <h2 class="admin-dashboard__actions-title">{{ $t('admin.quickActions') }}</h2>
                        <div class="admin-dashboard__actions-grid">
                            <AdminActionCard :title="$t('admin.homepage')"
                                :description="$t('admin.homepageDesc')" icon="Home"
                                @click="navigateTo('/admin/homepage')" />
                            <AdminActionCard :title="$t('admin.messages')" :description="$t('admin.messagesDesc')"
                                icon="Mail" @click="navigateTo('/admin/messages')" />
                            <AdminActionCard :title="$t('admin.account')" :description="$t('admin.accountDesc')" icon="User"
                                @click="navigateTo('/admin/account')" />
                            <AdminActionCard :title="$t('admin.settings')" :description="$t('admin.settingsDesc')" icon="Settings"
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
