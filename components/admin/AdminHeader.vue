<template>
    <header class="admin-header">
        <div class="admin-header__inner">
            <div class="admin-header__row">
                <div class="admin-header__brand">
                    <button @click="$emit('toggleSidebar')"
                        class="admin-header__menu-btn" type="button">
                        <Menu class="icon icon--md admin-header__menu-icon" />
                    </button>
                    <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="admin-header__logo" />
                    <span class="admin-header__title">Admin Panel</span>
                </div>
                <div class="admin-header__actions">
                    <a href="/" target="_blank" rel="noopener noreferrer"
                        class="admin-header__btn admin-header__btn--website">
                        <ExternalLink class="icon icon--sm" />
                        <span class="admin-header__btn-label admin-header__btn-label--full">See Website</span>
                        <span class="admin-header__btn-label admin-header__btn-label--short">Website</span>
                    </a>
                    <div class="admin-header__user">
                        {{ user?.name || user?.email }}
                    </div>
                    <button @click="handleLogout"
                        class="admin-header__btn admin-header__btn--logout" type="button">
                        <LogOut class="icon icon--sm" />
                        <span class="admin-header__btn-label admin-header__btn-label--full">Logout</span>
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);

  &__inner {
    padding: 1rem;

    @include respond-to(sm) {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__menu-btn {
    display: flex;
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color 0.2s;

    @include respond-to(lg) {
      display: none;
    }

    &:hover {
      background: #f3f4f6;
    }
  }

  &__menu-icon {
    color: var(--color-text-secondary);
  }

  &__logo {
    height: 2rem;
    width: auto;

    @include respond-to(sm) {
      height: 2.5rem;
    }
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-text);
    display: none;

    @include respond-to(sm) {
      display: inline;
      font-size: 1.25rem;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    @include respond-to(sm) {
      gap: 1rem;
    }
  }

  &__user {
    font-size: 0.75rem;
    color: var(--color-text-muted);
    display: none;

    @include respond-to(sm) {
      display: block;
      font-size: 0.875rem;
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-family: inherit;
    font-size: 0.75rem;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;

    @include respond-to(sm) {
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 0.875rem;
    }

    &--website {
      background: $color-brand-mid;
      color: $color-text-inverse;

      &:hover {
        background: var(--color-brand);
      }
    }

    &--logout {
      background: var(--color-danger);
      color: $color-text-inverse;

      &:hover {
        background: #b91c1c;
      }
    }
  }

  &__btn-label {
    &--full {
      display: none;

      @include respond-to(sm) {
        display: inline;
      }
    }

    &--short {
      display: inline;

      @include respond-to(sm) {
        display: none;
      }
    }
  }

  &__btn--logout &__btn-label--full {
    display: none;

    @include respond-to(sm) {
      display: inline;
    }
  }
}
</style>
