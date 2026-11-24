<template>
  <div class="admin-shell">
    <AdminHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <div class="admin-shell__body">
      <AdminSidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />
      <main class="admin-shell__main">
        <div class="admin-shell__container">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const sidebarOpen = ref(false)
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-shell {
  min-height: 100vh;
  background: var(--color-muted);

  &__body {
    display: flex;
  }

  &__main {
    flex: 1;
    padding: 1rem;
    min-width: 0;

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
}
</style>
