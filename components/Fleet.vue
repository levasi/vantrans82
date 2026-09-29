<template>
  <section id="fleet" class="fleet">
    <div class="container">
      <div class="section-header">
        <h2>{{ $t('fleet.title') }}</h2>
        <p>{{ $t('fleet.subtitle') }}</p>
      </div>

      <div class="fleet__grid">
        <div
          v-for="(vehicle, index) in vehicles"
          :key="index"
          class="fleet__card"
        >
          <div class="fleet__media">
            <img
              :src="vehicle.image"
              :alt="vehicle.name"
              class="fleet__image"
            />
            <div class="fleet__icon-wrap">
              <component :is="vehicle.icon" class="icon icon--md fleet__icon" />
            </div>
          </div>
          <div class="fleet__body">
            <h3 class="fleet__name">{{ vehicle.name }}</h3>
            <div class="fleet__capacity">{{ vehicle.capacity }}</div>
            <p class="fleet__desc">{{ vehicle.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Package, Truck, Container } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const vehicles = computed(() => [
  {
    icon: Package,
    name: t('fleet.vans'),
    capacity: t('fleet.vansCapacity'),
    description: t('fleet.vansDesc'),
    image: 'https://images.unsplash.com/photo-1761454200783-ca533f7928e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHZhbiUyMHZlaGljbGV8ZW58MXx8fHwxNzY3NzM4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Truck,
    name: t('fleet.trucks'),
    capacity: t('fleet.trucksCapacity'),
    description: t('fleet.trucksDesc'),
    image: 'https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Container,
    name: t('fleet.trailers'),
    capacity: t('fleet.trailersCapacity'),
    description: t('fleet.trailersDesc'),
    image: 'https://images.unsplash.com/photo-1703977883249-d959f2b0c1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJnbyUyMHRyYW5zcG9ydCUyMHNoaXBwaW5nfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.fleet {
  @include section-pad;
  background: $color-surface;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @include respond-to(md) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    background: $color-surface;
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    overflow: hidden;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: $shadow-xl;
    }
  }

  &__media {
    position: relative;
    height: 12rem;
    background: $color-muted;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__icon-wrap {
    position: absolute;
    top: 1rem;
    left: 1rem;
    padding: 0.5rem;
    background: $color-surface;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
  }

  &__icon {
    color: $color-brand;
  }

  &__body {
    padding: 1.5rem;
  }

  &__name {
    font-size: 1.5rem;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 0.5rem;
  }

  &__capacity {
    color: $color-accent;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__desc {
    color: $color-text-muted;
    line-height: 1.625;
    margin: 0;
  }
}
</style>
