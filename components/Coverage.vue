<template>
  <section id="coverage" class="py-20 md:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Left: Text Content -->
        <div>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Coverage
          </h2>
          <p class="text-lg text-gray-600 mb-8 leading-relaxed">
            We provide comprehensive logistics coverage across Romania and major European routes. 
            Our extensive network ensures your cargo reaches its destination safely and on time, 
            no matter the distance.
          </p>

          <!-- Regions List -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(region, index) in regions" :key="index" class="flex items-center gap-3">
              <CheckCircle class="w-5 h-5 text-orange-600 flex-shrink-0" />
              <span class="text-gray-700">{{ region }}</span>
            </div>
          </div>

          <div class="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-xl">
            <div class="flex items-start gap-3">
              <MapPin class="w-6 h-6 text-blue-900 flex-shrink-0 mt-1" />
              <div>
                <h4 class="font-semibold text-gray-900 mb-2">
                  Strategic Locations
                </h4>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Our distribution centers are strategically positioned to provide optimal coverage 
                  and minimize transit times across all major routes.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Map Illustration -->
        <div class="relative">
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <!-- Real Map Image -->
            <div class="relative h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Europe Coverage Map"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              
              <!-- Route Markers Overlay -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative w-full h-full max-w-md">
                  <!-- Location markers -->
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div class="w-4 h-4 bg-orange-600 rounded-full animate-ping absolute"></div>
                    <div class="w-4 h-4 bg-orange-600 rounded-full border-2 border-white shadow-lg"></div>
                  </div>
                  <div class="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                  <div class="absolute top-2/3 left-2/3 w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-30 blur-2xl"></div>
          <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { MapPin, CheckCircle } from 'lucide-vue-next'

const regions = [
  'Bucharest & Ilfov',
  'Transylvania Region',
  'Moldova Region',
  'Muntenia & Oltenia',
  'Western Europe',
  'Central Europe',
]
</script>

