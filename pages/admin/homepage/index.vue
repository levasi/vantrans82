<template>
  <div class="admin-homepage">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="admin-homepage__body">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="admin-homepage__main">
        <div class="admin-homepage__container">
          <div class="admin-homepage__welcome">
            <h1 class="admin-homepage__title">Homepage</h1>
            <p class="admin-homepage__subtitle">
              Customize landing page sections shown on the public website
            </p>
          </div>

          <div class="admin-homepage__grid">
            <AdminActionCard
              v-for="section in sections"
              :key="section.to"
              :title="section.title"
              :description="section.description"
              :icon="section.icon"
              @click="navigateTo(section.to)"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { HOMEPAGE_SECTION_META } from '~/utils/homepage-section-forms'

definePageMeta({
  middleware: 'admin',
  layout: false
})

const sidebarOpen = ref(false)

const sections = [
  ...HOMEPAGE_SECTION_META.slice(0, 3).map((section) => ({
    title: section.title,
    description: section.description,
    icon: section.icon,
    to: `/admin/homepage/${section.key}`
  })),
  {
    title: 'Fleet',
    description: 'Manage fleet vehicles, descriptions, and images',
    icon: 'Truck',
    to: '/admin/homepage/fleet'
  },
  {
    title: 'Coverage',
    description: 'Manage coverage regions, copy, and map content',
    icon: 'MapPin',
    to: '/admin/homepage/coverage'
  },
  ...HOMEPAGE_SECTION_META.slice(3).map((section) => ({
    title: section.title,
    description: section.description,
    icon: section.icon,
    to: `/admin/homepage/${section.key}`
  }))
]

useHead({
  title: 'Homepage - Admin - VanTrans82'
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-homepage {
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

  &__grid {
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
