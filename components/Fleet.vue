<template>
  <section id="fleet" class="fleet">
    <div class="container">
      <div class="section-header">
        <h2>{{ $t('fleet.title') }}</h2>
        <p>{{ $t('fleet.subtitle') }}</p>
      </div>

      <div class="fleet__grid">
        <div
          v-for="vehicle in vehicles"
          :key="vehicle.id"
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
import { computed, ref, onMounted } from 'vue'
import { Package, Truck, Container, Warehouse, Bus, Car, Ship } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t, locale } = useI18n()

const iconMap = {
  Package,
  Truck,
  Container,
  Warehouse,
  Bus,
  Car,
  Ship
}

const fallbackVehicles = computed(() => [
  {
    id: 'vans',
    icon: Package,
    name: t('fleet.vans'),
    capacity: t('fleet.vansCapacity'),
    description: t('fleet.vansDesc'),
    image: 'https://images.unsplash.com/photo-1761454200783-ca533f7928e3?auto=format&fit=crop&w=1080&q=80'
  },
  {
    id: 'trucks',
    icon: Truck,
    name: t('fleet.trucks'),
    capacity: t('fleet.trucksCapacity'),
    description: t('fleet.trucksDesc'),
    image: 'https://images.unsplash.com/photo-1738507869660-b44ea20ab037?auto=format&fit=crop&w=1080&q=80'
  },
  {
    id: 'trailers',
    icon: Container,
    name: t('fleet.trailers'),
    capacity: t('fleet.trailersCapacity'),
    description: t('fleet.trailersDesc'),
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1080&q=80'
  }
])

const remoteVehicles = ref(null)

const mapVehicle = (vehicle) => {
  const isRo = String(locale.value).startsWith('ro')
  return {
    id: vehicle.id ?? vehicle.slug,
    icon: iconMap[vehicle.icon] || Truck,
    name: isRo ? vehicle.name_ro : vehicle.name_en,
    capacity: isRo ? vehicle.capacity_ro : vehicle.capacity_en,
    description: isRo ? vehicle.description_ro : vehicle.description_en,
    image: vehicle.image_url
  }
}

const vehicles = computed(() => {
  if (remoteVehicles.value?.length) {
    return remoteVehicles.value.map(mapVehicle)
  }
  return fallbackVehicles.value
})

const loadFleet = async () => {
  try {
    const response = await $fetch('/api/fleet')
    if (response?.vehicles?.length) {
      remoteVehicles.value = response.vehicles
    }
  } catch (error) {
    console.error('Failed to load fleet:', error)
  }
}

onMounted(loadFleet)
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
      grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
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
