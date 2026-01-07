<template>
  <section id="faq" class="py-20 md:py-24 bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('faq.title') }}
        </h2>
        <p class="text-lg text-gray-600">
          {{ $t('faq.subtitle') }}
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
          {{ $t('faq.stillHaveQuestions') }}
        </p>
        <button
          @click="scrollToContact"
          class="text-orange-600 hover:text-orange-700 font-semibold"
        >
          {{ $t('faq.contactUs') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()
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

const faqs = computed(() => [
  {
    question: t('faq.questions.q1.question'),
    answer: t('faq.questions.q1.answer'),
  },
  {
    question: t('faq.questions.q2.question'),
    answer: t('faq.questions.q2.answer'),
  },
  {
    question: t('faq.questions.q3.question'),
    answer: t('faq.questions.q3.answer'),
  },
  {
    question: t('faq.questions.q4.question'),
    answer: t('faq.questions.q4.answer'),
  },
  {
    question: t('faq.questions.q5.question'),
    answer: t('faq.questions.q5.answer'),
  },
  {
    question: t('faq.questions.q6.question'),
    answer: t('faq.questions.q6.answer'),
  },
])
</script>

