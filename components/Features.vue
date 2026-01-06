<template>
  <section class="py-16 md:py-20 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <!-- Feature 1 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-xl mb-4">
            <Clock class="w-8 h-8 text-orange-600" />
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Fast Delivery</h3>
          <p class="text-sm text-gray-600">Express shipping options available</p>
        </div>

        <!-- Feature 2 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
            <Shield class="w-8 h-8 text-blue-900" />
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Secure Transport</h3>
          <p class="text-sm text-gray-600">Full insurance coverage</p>
        </div>

        <!-- Feature 3 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-4">
            <TrendingUp class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="font-bold text-gray-900 mb-2">Live Tracking</h3>
          <p class="text-sm text-gray-600">Real-time GPS monitoring</p>
        </div>

        <!-- Feature 4 -->
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-4">
            <Headphones class="w-8 h-8 text-purple-600" />
          </div>
          <h3 class="font-bold text-gray-900 mb-2">24/7 Support</h3>
          <p class="text-sm text-gray-600">Always here to help</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Clock, Shield, TrendingUp, Headphones } from 'lucide-vue-next'
</script>

