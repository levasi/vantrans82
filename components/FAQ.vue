<template>
  <section id="faq" class="faq">
    <div class="container faq__container">
      <!-- Section Header -->
      <div class="section-header">
        <h2>
          {{ $t('faq.title') }}
        </h2>
        <p>
          {{ $t('faq.subtitle') }}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="faq__list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
        >
          <button
            @click="toggleFaq(index)"
            class="faq-item__trigger"
          >
            <span class="faq-item__question">
              {{ faq.question }}
            </span>
            <ChevronDown
              class="icon faq-item__chevron"
              :class="{ 'faq-item__chevron--open': openIndex === index }"
            />
          </button>
          <div
            v-show="openIndex === index"
            class="faq-item__answer"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Additional Help -->
      <div class="faq__help">
        <p class="faq__help-text">
          {{ $t('faq.stillHaveQuestions') }}
        </p>
        <button
          @click="scrollToContact"
          class="faq__help-link"
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.faq {
  @include section-pad;
  background: $color-muted;
}

.faq__container {
  max-width: $container-narrow;
}

.faq__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: $color-surface;
  border-radius: $radius-xl;
  border: 1px solid $color-border;
  overflow: hidden;
}

.faq-item__trigger {
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: background-color 0.2s;

  &:hover {
    background: $color-muted;
  }
}

.faq-item__question {
  font-weight: 600;
  color: $color-text;
  padding-right: 1rem;
}

.faq-item__chevron {
  color: $color-text-faint;
  transition: transform 0.3s;
  flex-shrink: 0;

  &--open {
    transform: rotate(180deg);
  }
}

.faq-item__answer {
  padding: 0 1.5rem 1.25rem;
  color: $color-text-muted;
  line-height: 1.625;
}

.faq__help {
  margin-top: 3rem;
  text-align: center;
}

.faq__help-text {
  color: $color-text-muted;
  margin: 0 0 1rem;
}

.faq__help-link {
  color: $color-accent;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: $color-accent-hover;
  }
}
</style>
