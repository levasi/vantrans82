<template>
    <!-- Mobile Overlay -->
    <div v-if="isOpen"
        class="admin-sidebar__overlay"
        @click="$emit('close')">
    </div>

    <!-- Sidebar -->
    <aside
        class="admin-sidebar"
        :class="{ 'admin-sidebar--open': isOpen }"
    >
        <nav class="admin-sidebar__nav">
            <!-- Mobile Close Button -->
            <div class="admin-sidebar__mobile-header">
                <h2 class="admin-sidebar__mobile-title">Menu</h2>
                <button @click="$emit('close')" class="admin-sidebar__close" type="button">
                    <X class="icon admin-sidebar__close-icon" />
                </button>
            </div>

            <ul class="admin-sidebar__list">
                <li>
                    <NuxtLink to="/admin"
                        @click="$emit('close')"
                        class="admin-sidebar__link"
                        :class="{ 'admin-sidebar__link--active': isActive('/admin') }">
                        <LayoutDashboard class="icon" />
                        <span>Dashboard</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/translations"
                        @click="$emit('close')"
                        class="admin-sidebar__link"
                        :class="{ 'admin-sidebar__link--active': isActive('/admin/translations') }">
                        <FileText class="icon" />
                        <span>Translations</span>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/settings"
                        @click="$emit('close')"
                        class="admin-sidebar__link"
                        :class="{ 'admin-sidebar__link--active': isActive('/admin/settings') }">
                        <Settings class="icon" />
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-sidebar {
  position: fixed;
  inset-block: 0;
  left: 0;
  z-index: 50;
  width: 16rem;
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
  min-height: 100vh;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  @include respond-to(lg) {
    position: static;
    transform: translateX(0);
  }

  &--open {
    transform: translateX(0);
  }

  &__overlay {
    position: fixed;
    inset: 0;
    background: rgb(0 0 0 / 0.5);
    z-index: 40;

    @include respond-to(lg) {
      display: none;
    }
  }

  &__nav {
    padding: 1rem;
  }

  &__mobile-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    @include respond-to(lg) {
      display: none;
    }
  }

  &__mobile-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
  }

  &__close {
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
      background: #f3f4f6;
    }
  }

  &__close-icon {
    color: var(--color-text-muted);
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    text-decoration: none;
    transition: background-color 0.2s, color 0.2s;

    &:hover {
      background: var(--color-muted);
    }

    &--active {
      background: var(--color-brand-tint);
      color: var(--color-brand);
      font-weight: 500;
    }
  }
}
</style>
