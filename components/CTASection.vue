<template>
  <section class="relative py-20 md:py-24 text-white overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Logistics Center"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-900/90 to-blue-950/95"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {{ $t('cta.title') }}
        </h2>
        <p class="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
          {{ $t('cta.subtitle') }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            @click="scrollToContact"
            class="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2 font-medium text-lg"
          >
            {{ $t('cta.getQuote') }}
            <ArrowRight class="w-5 h-5" />
          </button>
          <a
            href="tel:+40123456789"
            class="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm flex items-center gap-2 font-medium text-lg"
          >
            <Phone class="w-5 h-5" />
            +40 123 456 789
          </a>
        </div>

        <p class="text-sm text-blue-200">
          {{ $t('cta.available') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Phone } from 'lucide-vue-next'

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

