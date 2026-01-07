<template>
  <section id="home" class="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0">
      <img 
        src="https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Logistics"
        class="w-full h-full object-cover opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-blue-950/85 to-blue-900/75"></div>
    </div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            {{ $t('hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-16">
            <button 
              @click="scrollToSection('contact')"
              class="px-8 py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              {{ $t('hero.requestQuote') }}
              <ArrowRight class="w-5 h-5" />
            </button>
            <button 
              @click="scrollToSection('services')"
              class="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-colors backdrop-blur-sm font-medium"
            >
              {{ $t('hero.ourServices') }}
            </button>
          </div>

          <!-- Trust Indicators -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div class="flex items-start gap-3">
              <div class="p-2 bg-orange-600/20 rounded-lg">
                <TrendingUp class="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div class="text-2xl font-bold">98.5%</div>
                <div class="text-sm text-blue-200">{{ $t('hero.onTimeDelivery') }}</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="p-2 bg-orange-600/20 rounded-lg">
                <Award class="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div class="text-2xl font-bold">15+ Years</div>
                <div class="text-sm text-blue-200">{{ $t('hero.experience') }}</div>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="p-2 bg-orange-600/20 rounded-lg">
                <Package class="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <div class="text-2xl font-bold">50K+</div>
                <div class="text-sm text-blue-200">{{ $t('hero.monthlyShipments') }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Hero Image -->
        <div class="relative hidden lg:block">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="VanTrans82 Freight Transport"
              class="w-full h-[600px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, TrendingUp, Award, Package } from 'lucide-vue-next'

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

