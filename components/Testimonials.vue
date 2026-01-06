<template>
  <section class="py-20 md:py-24 bg-blue-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          What Our Clients Say
        </h2>
        <p class="text-lg text-gray-600">
          Don't just take our word for it. Here's what our partners have to say about working with us.
        </p>
      </div>

      <!-- Testimonial Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div class="mb-6">
            <Quote class="w-10 h-10 text-orange-600 opacity-50" />
          </div>
          <p class="text-gray-700 mb-6 leading-relaxed italic">
            "{{ testimonial.quote }}"
          </p>
          <div class="pt-4 border-t border-gray-100 flex items-center gap-4">
            <img 
              :src="testimonial.image" 
              :alt="testimonial.name"
              class="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
            />
            <div>
              <div class="font-semibold text-gray-900">
                {{ testimonial.name }}
              </div>
              <div class="text-sm text-gray-600 mt-1">
                {{ testimonial.company }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Quote } from 'lucide-vue-next'

const testimonials = [
  {
    quote: "VanTrans82 has been our go-to logistics partner for 5 years. Their reliability and professionalism are unmatched. Every delivery arrives on time, every time.",
    name: "Maria Ionescu",
    company: "TechCom Solutions SRL",
    image: "https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzY4NDg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: "The express delivery service saved our business during a critical product launch. Exceptional service and real-time tracking gave us complete peace of mind.",
    name: "Alexandru Popescu",
    company: "Industrial Equipment Ltd",
    image: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njc3MzkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: "Professional, efficient, and always available. Their international freight service made expanding into EU markets seamless. Highly recommended!",
    name: "Elena Dumitrescu",
    company: "Fashion Export Group",
    image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzcxNzEyMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
]
</script>

