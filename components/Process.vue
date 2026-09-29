<template>
  <section class="process">
    <div class="container">
      <div class="section-header">
        <h2>{{ $t('process.title') }}</h2>
        <p>{{ $t('process.subtitle') }}</p>
      </div>

      <div class="process__grid">
        <div
          v-for="(step, index) in steps"
          :key="index"
          class="process__step"
        >
          <div
            v-if="index < steps.length - 1"
            class="process__connector"
          ></div>

          <div class="process__step-inner">
            <div class="process__media">
              <img
                :src="step.image"
                :alt="step.title"
                class="process__image"
              />
              <div class="process__media-overlay"></div>

              <div class="process__number">
                <span>{{ step.number }}</span>
              </div>
            </div>

            <div class="process__content">
              <h3 class="process__step-title">{{ step.title }}</h3>
              <p class="process__step-desc">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from '#imports'

const { t } = useI18n()

const steps = computed(() => [
  {
    number: '01',
    title: t('process.requestQuote'),
    description: t('process.requestQuoteDesc'),
    image: 'https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '02',
    title: t('process.planRoute'),
    description: t('process.planRouteDesc'),
    image: 'https://images.unsplash.com/photo-1730317195704-29f7ced19356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGUlMjBtYXAlMjBnZW9ncmFwaHl8ZW58MXx8fHwxNzY3NzM5MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '03',
    title: t('process.safeTransport'),
    description: t('process.safeTransportDesc'),
    image: 'https://images.unsplash.com/photo-1738507869660-b44ea20ab037?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVjayUyMGhpZ2h3YXklMjBsb2dpc3RpY3N8ZW58MXx8fHwxNzY3NzM0MzUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    number: '04',
    title: t('process.delivery'),
    description: t('process.deliveryDesc'),
    image: 'https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.process {
  @include section-pad;
  background: $color-surface;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__step {
    position: relative;
  }

  &__connector {
    display: none;

    @include respond-to(lg) {
      display: block;
      position: absolute;
      top: 6rem;
      left: 50%;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, $color-accent, $color-brand);
      z-index: 0;
    }
  }

  &__step-inner {
    position: relative;
    z-index: 1;
  }

  &__media {
    position: relative;
    height: 12rem;
    border-radius: $radius-xl;
    overflow: hidden;
    margin-bottom: 1.5rem;
    border: 4px solid $color-surface;
    box-shadow: $shadow-lg;
    transition: box-shadow 0.3s;

    .process__step:hover & {
      box-shadow: $shadow-xl;

      .process__image {
        transform: scale(1.1);
      }
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &__media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgb(30 58 138 / 0.6), transparent);
  }

  &__number {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 3.5rem;
    height: 3.5rem;
    background: $color-accent;
    border-radius: $radius-full;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid $color-surface;
    box-shadow: $shadow-lg;

    span {
      color: $color-text-inverse;
      font-weight: 700;
      font-size: 1.125rem;
    }
  }

  &__content {
    text-align: center;
  }

  &__step-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 0.5rem;
  }

  &__step-desc {
    color: $color-text-muted;
    margin: 0;
  }
}
</style>
