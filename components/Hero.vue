<template>
  <section id="home" class="hero">
    <!-- Full-Width Background Image -->
    <div class="hero__bg">
      <NuxtImg src="/2.png" alt="VanTrans82 Logistics" class="hero__bg-img" loading="eager" format="webp"
        quality="90" />
      <!-- Multi-layer Gradient Overlay for Depth (More Transparent) -->
      <div class="hero__overlay hero__overlay--brand"></div>
      <!-- Diagonal accent gradient -->
      <div class="hero__overlay hero__overlay--accent"></div>
      <!-- Radial gradient for focus -->
      <div class="hero__overlay hero__overlay--radial"></div>
      <!-- Subtle pattern overlay for texture -->
      <div class="hero__overlay hero__overlay--pattern"></div>
    </div>

    <!-- Content -->
    <div class="hero__content container">
      <div class="hero__grid">
        <!-- Left: Text Content -->
        <div class="hero__panel">
          <h1 class="hero__title">
            {{ $t('hero.title') }}
          </h1>
          <p class="hero__subtitle">
            {{ $t('hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="hero__actions">
            <button @click="scrollToSection('contact')" class="btn btn--accent-lg hero__cta">
              {{ $t('hero.requestQuote') }}
              <ArrowRight class="icon" />
            </button>
            <button @click="scrollToSection('services')" class="btn btn--ghost hero__cta-secondary">
              {{ $t('hero.ourServices') }}
            </button>
          </div>
        </div>

        <!-- Right: Services -->
        <div class="hero__services">
          <div class="hero__services-grid">
            <div v-for="(service, index) in heroServices" :key="index"
              class="hero-card"
              @click="scrollToSection('services')">
              <div class="hero-card__inner">
                <div class="hero-card__icon-wrap">
                  <component :is="service.icon" class="icon icon--lg hero-card__icon" />
                </div>
                <div class="hero-card__body">
                  <h3 class="hero-card__title">
                    {{ service.title }}
                  </h3>
                  <p class="hero-card__desc">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Decorative Glow Effects -->
          <div class="hero__glow hero__glow--accent animate-pulse"></div>
          <div class="hero__glow hero__glow--brand animate-pulse"></div>
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

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.hero {
  position: relative;
  color: $color-text-inverse;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;

  &__bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__overlay {
    position: absolute;
    inset: 0;

    &--brand {
      background: linear-gradient(
        to bottom right,
        rgb(23 37 84 / 0.5),
        rgb(30 58 138 / 0.45),
        rgb(30 64 175 / 0.4)
      );
    }

    &--accent {
      background: linear-gradient(
        to top right,
        transparent,
        rgb(234 88 12 / 0.1),
        transparent
      );
    }

    &--radial {
      background: radial-gradient(
        circle at center,
        transparent 0%,
        rgb(15 23 42 / 0.2) 50%,
        rgb(15 23 42 / 0.4) 100%
      );
    }

    &--pattern {
      opacity: 0.05;
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgb(255 255 255 / 0.03) 10px,
        rgb(255 255 255 / 0.03) 20px
      );
    }
  }

  &__content {
    position: relative;
    z-index: 10;
    padding-top: 5rem;
    padding-bottom: 5rem;
    width: 100%;

    @include respond-to(md) {
      padding-top: 8rem;
      padding-bottom: 8rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;

    @include respond-to(lg) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__panel {
    backdrop-filter: blur(4px);
    background: rgb(255 255 255 / 0.05);
    border-radius: $radius-2xl;
    padding: 1.5rem;
    border: 1px solid rgb(255 255 255 / 0.1);
    box-shadow: $shadow-2xl;

    @include respond-to(md) {
      padding: 2rem;
    }
  }

  &__title {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.25;
    filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));

    @include respond-to(md) {
      font-size: 3rem;
    }

    @include respond-to(lg) {
      font-size: 3.75rem;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: #eff6ff;
    margin-bottom: 2rem;
    line-height: 1.625;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04));

    @include respond-to(md) {
      font-size: 1.25rem;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include respond-to(sm) {
      flex-direction: row;
    }
  }

  &__cta {
    box-shadow: 0 10px 15px -3px rgb(234 88 12 / 0.5);

    &:hover {
      transform: scale(1.05);
    }
  }

  &__cta-secondary {
    &:hover {
      transform: scale(1.05);
    }
  }

  &__services {
    position: relative;
  }

  &__services-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to(sm) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  &__glow {
    position: absolute;
    border-radius: $radius-full;
    filter: blur(48px);
    pointer-events: none;

    &--accent {
      bottom: -2rem;
      right: -2rem;
      width: 10rem;
      height: 10rem;
      background: rgb(249 115 22 / 0.2);
    }

    &--brand {
      top: -2rem;
      left: -2rem;
      width: 8rem;
      height: 8rem;
      background: rgb(96 165 250 / 0.2);
      animation-delay: 1s;
    }
  }
}

.hero-card {
  backdrop-filter: blur(12px);
  background: rgb(255 255 255 / 0.1);
  border-radius: $radius-xl;
  padding: 1.5rem;
  border: 1px solid rgb(255 255 255 / 0.2);
  box-shadow: $shadow-xl;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.05);
  }

  &__inner {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  &__icon-wrap {
    padding: 0.75rem;
    background: rgb(234 88 12 / 0.3);
    border-radius: $radius-md;
    backdrop-filter: blur(4px);
    transition: background-color 0.2s;

    .hero-card:hover & {
      background: rgb(234 88 12 / 0.4);
    }
  }

  &__icon {
    color: #fdba74;
  }

  &__body {
    flex: 1;
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 700;
    color: $color-text-inverse;
    margin-bottom: 0.5rem;
    transition: color 0.2s;

    @include respond-to(lg) {
      font-size: 1.25rem;
    }

    .hero-card:hover & {
      color: #fdba74;
    }
  }

  &__desc {
    font-size: 0.875rem;
    color: #dbeafe;
    line-height: 1.625;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
