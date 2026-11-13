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
                <h2 class="admin-sidebar__mobile-title">{{ $t('admin.menu') }}</h2>
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
                        <span>{{ $t('admin.dashboard') }}</span>
                    </NuxtLink>
                </li>
                <li>
                    <button
                        type="button"
                        class="admin-sidebar__link admin-sidebar__link--toggle"
                        :class="{ 'admin-sidebar__link--active': isHomepageActive }"
                        @click="homepageOpen = !homepageOpen"
                    >
                        <Home class="icon" />
                        <span>{{ $t('admin.homepage') }}</span>
                        <ChevronDown
                            class="icon admin-sidebar__chevron"
                            :class="{ 'admin-sidebar__chevron--open': homepageOpen }"
                        />
                    </button>
                    <ul v-show="homepageOpen" class="admin-sidebar__sublist">
                        <li v-for="item in homepageLinks" :key="item.to" class="admin-sidebar__subitem">
                            <NuxtLink
                                :to="item.to"
                                @click="$emit('close')"
                                class="admin-sidebar__sublink"
                                :class="{
                                  'admin-sidebar__sublink--active': isActive(item.to),
                                  'admin-sidebar__sublink--hidden': !isSectionVisible(item.key)
                                }"
                            >
                                <span class="admin-sidebar__sublink-label">{{ item.label }}</span>
                            </NuxtLink>
                            <button
                                type="button"
                                class="admin-sidebar__visibility"
                                :class="{ 'admin-sidebar__visibility--hidden': !isSectionVisible(item.key) }"
                                :disabled="togglingKey === item.key"
                                :title="isSectionVisible(item.key) ? $t('admin.hideSection') : $t('admin.showSection')"
                                :aria-label="isSectionVisible(item.key) ? $t('admin.hideSection') : $t('admin.showSection')"
                                @click.stop="onToggleVisibility(item.key)"
                            >
                                <EyeOff v-if="!isSectionVisible(item.key)" class="icon" />
                                <Eye v-else class="icon" />
                            </button>
                        </li>
                    </ul>
                </li>
                <li>
                    <NuxtLink to="/admin/settings"
                        @click="$emit('close')"
                        class="admin-sidebar__link"
                        :class="{ 'admin-sidebar__link--active': isActive('/admin/settings') }">
                        <Settings class="icon" />
                        <span>{{ $t('admin.settings') }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { LayoutDashboard, Settings, Home, ChevronDown, X, Eye, EyeOff } from 'lucide-vue-next'
import { HOMEPAGE_SECTION_META } from '~/utils/homepage-section-forms'
import type { HomepageVisibilityKey } from '~/utils/homepage-visibility'

defineProps<{
    isOpen: boolean
}>()

defineEmits<{
    close: []
}>()

const route = useRoute()

const { t } = useI18n()
const {
  loadVisibility,
  isSectionVisible,
  toggleSectionVisibility,
  togglingKey
} = useHomepageVisibility()

const homepageLinks = computed(() => [
  ...HOMEPAGE_SECTION_META.slice(0, 3).map((section) => ({
    key: section.key as HomepageVisibilityKey,
    label: t(`admin.sections.${section.key}`),
    to: `/admin/homepage/${section.key}`
  })),
  { key: 'fleet' as HomepageVisibilityKey, label: t('admin.fleet'), to: '/admin/homepage/fleet' },
  { key: 'coverage' as HomepageVisibilityKey, label: t('admin.coverage'), to: '/admin/homepage/coverage' },
  ...HOMEPAGE_SECTION_META.slice(3).map((section) => ({
    key: section.key as HomepageVisibilityKey,
    label: t(`admin.sections.${section.key}`),
    to: `/admin/homepage/${section.key}`
  }))
])

const isActive = (path: string) => {
    return route.path === path
}

const isHomepageActive = computed(() => route.path.startsWith('/admin/homepage'))

const homepageOpen = ref(isHomepageActive.value)

watch(
    () => route.path,
    (path) => {
        if (path.startsWith('/admin/homepage')) {
            homepageOpen.value = true
        }
    }
)

const onToggleVisibility = async (key: HomepageVisibilityKey) => {
  try {
    await toggleSectionVisibility(key)
  } catch {
    // Keep previous state; optimistic update already rolled back in composable
  }
}

onMounted(() => {
  loadVisibility()
})
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
    width: 100%;
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
    text-align: left;

    &:hover {
      background: var(--color-muted);
    }

    &--active {
      background: var(--color-brand-tint);
      color: var(--color-brand);
      font-weight: 500;
    }

    &--toggle {
      .admin-sidebar__chevron {
        margin-left: auto;
      }
    }
  }

  &__chevron {
    width: 1rem;
    height: 1rem;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__sublist {
    list-style: none;
    margin: 0.25rem 0 0;
    padding: 0 0 0 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    > li,
    .admin-sidebar__subitem {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      gap: 0.15rem;
      width: 100%;
      min-width: 0;
    }
  }

  &__sublink {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    min-width: 0;
    max-width: calc(100% - 1.9rem);
    padding: 0.5rem 0.5rem 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    text-decoration: none;
    font-size: 0.875rem;
    transition: background-color 0.2s, color 0.2s, opacity 0.2s;

    &:hover {
      background: var(--color-muted);
    }

    &--active {
      background: var(--color-brand-tint);
      color: var(--color-brand);
      font-weight: 500;
    }

    &--hidden {
      opacity: 0.55;
    }
  }

  &__sublink-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__visibility {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.75rem;
    height: 1.75rem;
    padding: 0;
    border: none;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-text-muted);
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s;

    .icon {
      width: 0.95rem;
      height: 0.95rem;
    }

    &:hover:not(:disabled) {
      background: var(--color-muted);
      color: var(--color-text);
    }

    &:disabled {
      opacity: 0.5;
      cursor: wait;
    }

    &--hidden {
      color: #b91c1c;
    }
  }
}
</style>
