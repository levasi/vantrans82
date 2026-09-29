<template>
    <div class="admin-stats">
        <div class="admin-stats__card">
            <div class="admin-stats__row">
                <div>
                    <p class="admin-stats__label">Total Messages</p>
                    <p class="admin-stats__value">0</p>
                </div>
                <div class="admin-stats__icon-wrap admin-stats__icon-wrap--brand">
                    <Mail class="icon icon--md admin-stats__icon admin-stats__icon--brand" />
                </div>
            </div>
        </div>

        <div class="admin-stats__card">
            <div class="admin-stats__row">
                <div>
                    <p class="admin-stats__label">Pending Requests</p>
                    <p class="admin-stats__value">0</p>
                </div>
                <div class="admin-stats__icon-wrap admin-stats__icon-wrap--accent">
                    <Clock class="icon icon--md admin-stats__icon admin-stats__icon--accent" />
                </div>
            </div>
        </div>

        <div class="admin-stats__card">
            <div class="admin-stats__row">
                <div>
                    <p class="admin-stats__label">Active Services</p>
                    <p class="admin-stats__value">4</p>
                </div>
                <div class="admin-stats__icon-wrap admin-stats__icon-wrap--success">
                    <Truck class="icon icon--md admin-stats__icon admin-stats__icon--success" />
                </div>
            </div>
        </div>

        <div class="admin-stats__card">
            <div class="admin-stats__row">
                <div>
                    <p class="admin-stats__label">Website Status</p>
                    <p class="admin-stats__value admin-stats__value--online">Online</p>
                </div>
                <div class="admin-stats__icon-wrap admin-stats__icon-wrap--success">
                    <CheckCircle class="icon icon--md admin-stats__icon admin-stats__icon--success" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Mail, Clock, Truck, CheckCircle } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.admin-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @include respond-to(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(lg) {
    grid-template-columns: repeat(4, 1fr);
  }

  &__card {
    background: var(--color-surface);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
    padding: 1.5rem;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0 0 0.25rem;
  }

  &__value {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-text);
    margin: 0;

    &--online {
      color: var(--color-success);
    }
  }

  &__icon-wrap {
    padding: 0.75rem;
    border-radius: var(--radius-md);

    &--brand {
      background: var(--color-brand-light);
    }

    &--accent {
      background: var(--color-accent-light);
    }

    &--success {
      background: var(--color-success-light);
    }
  }

  &__icon {
    &--brand {
      color: var(--color-brand);
    }

    &--accent {
      color: #7c2d12;
    }

    &--success {
      color: #14532d;
    }
  }
}
</style>
