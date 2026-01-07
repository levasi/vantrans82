<template>
  <section id="about" class="py-20 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Text Content -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {{ $t('about.title') }}
          </h2>
          <p class="text-lg text-gray-600 mb-6 leading-relaxed">
            {{ $t('about.description1') }}
          </p>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            {{ $t('about.description2') }}
          </p>

          <!-- Values -->
          <div class="space-y-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('about.coreValues') }}</h3>
            <div v-for="(value, index) in values" :key="index" class="flex items-start gap-4">
              <div class="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <component :is="value.icon" class="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  {{ value.title }}
                </h4>
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="relative">
          <div class="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="VanTrans82 Team"
              class="w-full h-[500px] object-cover"
            />
          </div>

          <!-- Stats Overlay -->
          <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-200">
            <div class="text-4xl font-bold text-blue-900 mb-1">500+</div>
            <div class="text-sm text-gray-600">{{ $t('about.satisfiedClients') }}</div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Shield, Zap, Users } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const values = computed(() => [
  {
    icon: Shield,
    title: t('about.safety'),
    description: t('about.safetyDesc'),
  },
  {
    icon: Zap,
    title: t('about.speed'),
    description: t('about.speedDesc'),
  },
  {
    icon: Users,
    title: t('about.trust'),
    description: t('about.trustDesc'),
  },
])
</script>

