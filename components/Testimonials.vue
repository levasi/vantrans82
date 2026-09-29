<template>
  <section class="testimonials">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <h2>
          {{ $t('testimonials.title') }}
        </h2>
        <p>
          {{ $t('testimonials.subtitle') }}
        </p>
      </div>

      <!-- Testimonial Cards -->
      <div class="testimonials__grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonials__card"
        >
          <div class="testimonials__quote-icon">
            <Quote class="icon--xl" />
          </div>
          <p class="testimonials__quote">
            "{{ testimonial.quote }}"
          </p>
          <div class="testimonials__author">
            <img
              :src="testimonial.image"
              :alt="testimonial.name"
              class="testimonials__avatar"
            />
            <div>
              <div class="testimonials__name">
                {{ testimonial.name }}
              </div>
              <div class="testimonials__company">
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
import { useI18n } from '#imports'

const { t } = useI18n()

const testimonials = computed(() => [
  {
    quote: t('testimonials.testimonial1.quote'),
    name: t('testimonials.testimonial1.name'),
    company: t('testimonials.testimonial1.company'),
    image: "https://images.unsplash.com/photo-1522199899308-2eef382e2158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NzY4NDg2NHww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: t('testimonials.testimonial2.quote'),
    name: t('testimonials.testimonial2.name'),
    company: t('testimonials.testimonial2.company'),
    image: "https://images.unsplash.com/photo-1589458223095-03eee50f0054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fHwxNzY3NzM5MTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    quote: t('testimonials.testimonial3.quote'),
    name: t('testimonials.testimonial3.name'),
    company: t('testimonials.testimonial3.company'),
    image: "https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzcxNzEyMXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.testimonials {
  @include section-pad;
  background: $color-brand-tint;
}

.testimonials__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @include respond-to(md) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonials__card {
  background: $color-surface;
  padding: 2rem;
  border-radius: $radius-xl;
  box-shadow: $shadow-sm;
  border: 1px solid $color-border;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.testimonials__quote-icon {
  margin-bottom: 1.5rem;
  color: $color-accent;
  opacity: 0.5;
}

.testimonials__quote {
  color: $color-text-secondary;
  margin: 0 0 1.5rem;
  line-height: 1.625;
  font-style: italic;
}

.testimonials__author {
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonials__avatar {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: $radius-full;
  object-fit: cover;
  border: 2px solid $color-brand-light;
}

.testimonials__name {
  font-weight: 600;
  color: $color-text;
}

.testimonials__company {
  font-size: 0.875rem;
  color: $color-text-muted;
  margin-top: 0.25rem;
}
</style>
