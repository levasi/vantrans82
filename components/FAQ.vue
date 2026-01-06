<template>
  <section id="faq" class="py-20 md:py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p class="text-lg text-gray-600">
          Have questions? We've got answers. Find quick solutions to common inquiries below.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
          >
            <span class="font-semibold text-gray-900 pr-4">
              {{ faq.question }}
            </span>
            <ChevronDown 
              class="w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>
          <div
            v-show="openIndex === index"
            class="px-6 pb-5 text-gray-600 leading-relaxed"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Additional Help -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">
          Still have questions? We're here to help.
        </p>
        <button
          @click="scrollToContact"
          class="text-orange-600 hover:text-orange-700 font-semibold"
        >
          Contact Us →
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const openIndex = ref(null)

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const faqs = [
  {
    question: 'What areas do you cover?',
    answer: 'We provide comprehensive coverage across all of Romania and major European routes, including Western and Central Europe. Our network spans from local urban deliveries to international freight transport.',
  },
  {
    question: 'How do I get a transport quote?',
    answer: 'You can request a quote by filling out our contact form, calling us directly at +40 123 456 789, or sending us an email. We typically respond within 2 hours during business hours and provide detailed pricing based on your specific needs.',
  },
  {
    question: 'Do you offer tracking for shipments?',
    answer: 'Yes! All our vehicles are equipped with GPS tracking systems. You\'ll receive real-time updates on your shipment\'s location and estimated delivery time through our online portal or mobile app.',
  },
  {
    question: 'What types of cargo do you transport?',
    answer: 'We handle a wide range of cargo including general freight, palletized goods, packaged products, and industrial equipment. For specialized cargo (hazardous materials, temperature-sensitive goods), please contact us to discuss your specific requirements.',
  },
  {
    question: 'What are your delivery timeframes?',
    answer: 'Delivery times vary based on distance and service type. Local deliveries typically arrive within 24 hours, national transport takes 1-3 days, and international shipments range from 3-7 days. We also offer express same-day and next-day services for urgent shipments.',
  },
  {
    question: 'How do you ensure cargo safety?',
    answer: 'Safety is our top priority. All our vehicles undergo regular maintenance, our drivers are extensively trained, and we have comprehensive insurance coverage. We use professional loading equipment and secure fastening systems to protect your cargo throughout transport.',
  },
]
</script>

