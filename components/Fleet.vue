<template>
  <section id="fleet" class="py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('fleet.title') }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ $t('fleet.subtitle') }}
        </p>
      </div>

      <!-- Fleet Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(vehicle, index) in vehicles"
          :key="index"
          class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
          <div class="relative h-48 bg-gray-100 overflow-hidden">
            <img
              :src="vehicle.image"
              :alt="vehicle.name"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-4 left-4 p-2 bg-white rounded-lg shadow-md">
              <component :is="vehicle.icon" class="w-6 h-6 text-blue-900" />
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              {{ vehicle.name }}
            </h3>
            <div class="text-orange-600 font-semibold mb-4">
              {{ vehicle.capacity }}
            </div>
            <p class="text-gray-600 leading-relaxed">
              {{ vehicle.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Package, Truck, Container } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const vehicles = [
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
]
</script>

