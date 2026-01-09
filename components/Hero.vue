<template>
  <section id="home" class="relative text-white overflow-hidden min-h-[90vh] flex items-center">
    <!-- Full-Width Background Image -->
    <div class="absolute inset-0 w-full h-full">
      <NuxtImg 
        src="/1.png"
        alt="VanTrans82 Logistics"
        class="w-full h-full object-cover"
        loading="eager"
        format="webp"
        quality="90"
      />
      <!-- Multi-layer Gradient Overlay for Depth (More Transparent) -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-blue-900/45 to-blue-800/40"></div>
      <!-- Diagonal accent gradient -->
      <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-orange-600/10 to-transparent"></div>
      <!-- Radial gradient for focus -->
      <div class="absolute inset-0" style="background: radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.2) 50%, rgba(15, 23, 42, 0.4) 100%);"></div>
      <!-- Subtle pattern overlay for texture -->
      <div class="absolute inset-0 opacity-5" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px);"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div class="backdrop-blur-sm bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed drop-shadow-lg">
            {{ $t('hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button 
              @click="scrollToSection('contact')"
              class="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg shadow-orange-600/50 flex items-center justify-center gap-2 font-medium"
            >
              {{ $t('hero.requestQuote') }}
              <ArrowRight class="w-5 h-5" />
            </button>
            <button 
              @click="scrollToSection('services')"
              class="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm font-medium hover:scale-105"
            >
              {{ $t('hero.ourServices') }}
            </button>
          </div>
        </div>

        <!-- Right: Services -->
        <div class="relative">
          <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-6">
            <div 
              v-for="(service, index) in heroServices" 
              :key="index"
              class="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-xl transform hover:scale-105 transition-all cursor-pointer group"
              @click="scrollToSection('services')"
            >
              <div class="flex items-start gap-4">
                <div class="p-3 bg-orange-600/30 rounded-lg backdrop-blur-sm group-hover:bg-orange-600/40 transition-colors">
                  <component :is="service.icon" class="w-8 h-8 text-orange-300" />
                </div>
                <div class="flex-1">
                  <h3 class="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {{ service.title }}
                  </h3>
                  <p class="text-sm text-blue-100 leading-relaxed line-clamp-2">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Decorative Glow Effects -->
          <div class="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
          <div class="absolute -top-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse pointer-events-none" style="animation-delay: 1s;"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { ArrowRight, Truck, Zap, Globe } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const heroServices = computed(() => [
  {
    icon: Truck,
    title: t('services.roadTransport'),
    description: t('services.roadTransportDesc')
  },
  {
    icon: Zap,
    title: t('services.expressDelivery'),
    description: t('services.expressDeliveryDesc')
  },
  {
    icon: Globe,
    title: t('services.internationalFreight'),
    description: t('services.internationalFreightDesc')
  }
])

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    // Get header height (64px on mobile, 80px on desktop)
    const header = document.querySelector('header')
    const headerHeight = header ? header.offsetHeight : 80
    
    // Calculate position with offset
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerHeight - 20 // 20px extra padding
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>

