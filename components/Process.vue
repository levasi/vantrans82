<template>
  <section class="py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('process.title') }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ $t('process.subtitle') }}
        </p>
      </div>

      <!-- Process Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(step, index) in steps" :key="index" class="relative group">
          <!-- Connector Line (hidden on mobile and last item) -->
          <div 
            v-if="index < steps.length - 1" 
            class="hidden lg:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-orange-600 to-blue-900 z-0"
          ></div>
          
          <div class="relative z-10">
            <!-- Image -->
            <div class="relative h-48 rounded-xl overflow-hidden mb-6 border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
              <img
                :src="step.image"
                :alt="step.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
              
              <!-- Step Number -->
              <div class="absolute top-4 left-4 w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <span class="text-white font-bold text-lg">{{ step.number }}</span>
              </div>
            </div>

            <!-- Content -->
            <div class="text-center">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ step.title }}
              </h3>
              <p class="text-gray-600">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '#imports'

const { t } = useI18n()

const steps = [
  {
    number: '01',
    title: t('process.requestQuote'),
    description: t('process.requestQuoteDesc'),
    image: 'https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '02',
    title: t('process.planRoute'),
    description: t('process.planRouteDesc'),
    image: 'https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '03',
    title: t('process.safeTransport'),
    description: t('process.safeTransportDesc'),
    image: 'https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '04',
    title: t('process.delivery'),
    description: t('process.deliveryDesc'),
    image: 'https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
]
</script>

