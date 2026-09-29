<template>
  <section id="coverage" class="coverage">
    <div class="container">
      <div class="coverage__layout">
        <div class="coverage__content">
          <h2 class="coverage__title">{{ $t('coverage.title') }}</h2>
          <p class="coverage__subtitle">{{ $t('coverage.subtitle') }}</p>

          <div class="coverage__regions">
            <div
              v-for="(region, index) in regions"
              :key="index"
              class="coverage__region"
            >
              <CheckCircle class="icon coverage__check" />
              <span>{{ region }}</span>
            </div>
          </div>

          <div class="coverage__callout">
            <div class="coverage__callout-inner">
              <MapPin class="icon icon--md coverage__pin" />
              <div>
                <h4 class="coverage__callout-title">
                  {{ $t('coverage.strategicLocations') }}
                </h4>
                <p class="coverage__callout-desc">
                  {{ $t('coverage.strategicLocationsDesc') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="coverage__map-wrap">
          <div class="coverage__map-card">
            <div class="coverage__map">
              <img
                src="https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Europe Coverage Map"
                class="coverage__map-image"
              />
              <div class="coverage__map-overlay"></div>

              <div class="coverage__markers">
                <div class="coverage__markers-inner">
                  <div class="coverage__marker coverage__marker--center">
                    <div class="coverage__ping animate-ping"></div>
                    <div class="coverage__dot coverage__dot--accent"></div>
                  </div>
                  <div class="coverage__dot coverage__dot--secondary coverage__dot--nw"></div>
                  <div class="coverage__dot coverage__dot--secondary coverage__dot--se"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="coverage__blob coverage__blob--accent"></div>
          <div class="coverage__blob coverage__blob--brand"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { MapPin, CheckCircle } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const regions = computed(() => [
  t('coverage.regions.bucharest'),
  t('coverage.regions.transylvania'),
  t('coverage.regions.moldova'),
  t('coverage.regions.muntenia'),
  t('coverage.regions.westernEurope'),
  t('coverage.regions.centralEurope'),
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.coverage {
  @include section-pad;
  background: $color-muted;

  &__layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;

    @include respond-to(lg) {
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem;
    }
  }

  &__title {
    font-size: 1.875rem;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 1.5rem;

    @include respond-to(md) {
      font-size: 2.25rem;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: $color-text-muted;
    line-height: 1.625;
    margin: 0 0 2rem;
  }

  &__regions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include respond-to(sm) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__region {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: $color-text-secondary;
  }

  &__check {
    width: 1.25rem;
    height: 1.25rem;
    color: $color-accent;
    flex-shrink: 0;
  }

  &__callout {
    margin-top: 2rem;
    padding: 1.5rem;
    background: $color-brand-tint;
    border: 1px solid $color-brand-light;
    border-radius: $radius-xl;
  }

  &__callout-inner {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  &__pin {
    color: $color-brand;
    flex-shrink: 0;
    margin-top: 0.25rem;
  }

  &__callout-title {
    font-weight: 600;
    color: $color-text;
    margin: 0 0 0.5rem;
  }

  &__callout-desc {
    color: $color-text-muted;
    font-size: 0.875rem;
    line-height: 1.625;
    margin: 0;
  }

  &__map-wrap {
    position: relative;
  }

  &__map-card {
    background: $color-surface;
    border-radius: $radius-2xl;
    box-shadow: $shadow-lg;
    border: 1px solid $color-border;
    overflow: hidden;
  }

  &__map {
    position: relative;
    height: 500px;
  }

  &__map-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__map-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgb(30 58 138 / 0.4), transparent);
  }

  &__markers {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__markers-inner {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 28rem;
  }

  &__marker {
    &--center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__ping {
    position: absolute;
    width: 1rem;
    height: 1rem;
    background: $color-accent;
    border-radius: $radius-full;
  }

  &__dot {
    border-radius: $radius-full;
    border: 2px solid $color-surface;
    box-shadow: $shadow-lg;

    &--accent {
      width: 1rem;
      height: 1rem;
      background: $color-accent;
    }

    &--secondary {
      position: absolute;
      width: 0.75rem;
      height: 0.75rem;
      background: #60a5fa;
    }

    &--nw {
      top: 33.333%;
      left: 25%;
    }

    &--se {
      top: 66.666%;
      left: 66.666%;
    }
  }

  &__blob {
    position: absolute;
    border-radius: $radius-full;
    opacity: 0.3;
    filter: blur(40px);
    pointer-events: none;

    &--accent {
      top: -1.5rem;
      right: -1.5rem;
      width: 6rem;
      height: 6rem;
      background: $color-accent-soft;
    }

    &--brand {
      bottom: -1.5rem;
      left: -1.5rem;
      width: 8rem;
      height: 8rem;
      background: $color-brand-light;
    }
  }
}
</style>
