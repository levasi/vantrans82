<template>
    <button @click="emit('click')"
        class="admin-action-card" type="button">
        <div class="admin-action-card__row">
            <div class="admin-action-card__icon-wrap">
                <component :is="iconComponent" class="icon icon--md admin-action-card__icon" />
            </div>
            <div class="admin-action-card__body">
                <h3 class="admin-action-card__title">{{ title }}</h3>
                <p class="admin-action-card__desc">{{ description }}</p>
            </div>
            <ChevronRight class="icon admin-action-card__chevron" />
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
    title: string
    description: string
    icon: string
}>()

const emit = defineEmits<{
    click: []
}>()

const iconComponent = computed(() => {
    const iconName = props.icon
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons]
    return IconComponent || LucideIcons.FileText
})
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.admin-action-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  text-align: left;
  width: 100%;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: #93c5fd;
    box-shadow: var(--shadow-md);

    .admin-action-card__icon-wrap {
      background: #bfdbfe;
    }

    .admin-action-card__chevron {
      color: var(--color-brand);
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__icon-wrap {
    padding: 0.75rem;
    background: var(--color-brand-light);
    border-radius: var(--radius-md);
    transition: background-color 0.2s;
  }

  &__icon {
    color: var(--color-brand);
  }

  &__body {
    flex: 1;
  }

  &__title {
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.25rem;
  }

  &__desc {
    font-size: 0.875rem;
    color: var(--color-text-muted);
    margin: 0;
  }

  &__chevron {
    color: var(--color-text-faint);
    transition: color 0.2s;
  }
}
</style>
