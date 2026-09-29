<template>
  <section class="features">
    <div class="container">
      <div class="features__grid">
        <!-- Feature 1 -->
        <div class="feature">
          <div class="feature__icon-wrap feature__icon-wrap--accent">
            <Clock class="icon icon--lg feature__icon feature__icon--accent" />
          </div>
          <h3 class="feature__title">{{ $t('features.fastDelivery') }}</h3>
          <p class="feature__desc">{{ $t('features.fastDeliveryDesc') }}</p>
        </div>

        <!-- Feature 2 -->
        <div class="feature">
          <div class="feature__icon-wrap feature__icon-wrap--brand">
            <Shield class="icon icon--lg feature__icon feature__icon--brand" />
          </div>
          <h3 class="feature__title">{{ $t('features.secureTransport') }}</h3>
          <p class="feature__desc">{{ $t('features.secureTransportDesc') }}</p>
        </div>

        <!-- Feature 3 -->
        <div class="feature">
          <div class="feature__icon-wrap feature__icon-wrap--green">
            <TrendingUp class="icon icon--lg feature__icon feature__icon--green" />
          </div>
          <h3 class="feature__title">{{ $t('features.liveTracking') }}</h3>
          <p class="feature__desc">{{ $t('features.liveTrackingDesc') }}</p>
        </div>

        <!-- Feature 4 -->
        <div class="feature">
          <div class="feature__icon-wrap feature__icon-wrap--purple">
            <Headphones class="icon icon--lg feature__icon feature__icon--purple" />
          </div>
          <h3 class="feature__title">{{ $t('features.support') }}</h3>
          <p class="feature__desc">{{ $t('features.supportDesc') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Clock, Shield, TrendingUp, Headphones } from 'lucide-vue-next'
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.features {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: $color-surface;
  border-bottom: 1px solid #f3f4f6;

  @include respond-to(md) {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @include respond-to(md) {
      grid-template-columns: repeat(4, 1fr);
      gap: 3rem;
    }
  }
}

.feature {
  text-align: center;

  &__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    border-radius: $radius-xl;
    margin-bottom: 1rem;

    &--accent {
      background: $color-accent-light;
    }

    &--brand {
      background: $color-brand-light;
    }

    &--green {
      background: $color-success-light;
    }

    &--purple {
      background: $color-purple-light;
    }
  }

  &__icon {
    &--accent {
      color: $color-accent;
    }

    &--brand {
      color: $color-brand;
    }

    &--green {
      color: $color-green;
    }

    &--purple {
      color: $color-purple;
    }
  }

  &__title {
    font-weight: 700;
    color: $color-text;
    margin-bottom: 0.5rem;
  }

  &__desc {
    font-size: 0.875rem;
    color: $color-text-muted;
  }
}
</style>
