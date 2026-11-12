<template>
  <section class="features">
    <div class="container">
      <div class="features__grid">
        <div v-for="(feature, index) in features" :key="index" class="feature">
          <div
            class="feature__icon-wrap"
            :class="`feature__icon-wrap--${feature.color}`"
          >
            <component
              :is="feature.icon"
              class="icon icon--lg feature__icon"
              :class="`feature__icon--${feature.color}`"
            />
          </div>
          <h3 class="feature__title">{{ feature.title }}</h3>
          <p class="feature__desc">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { Clock, Shield, TrendingUp, Headphones } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t, locale } = useI18n()
const { content, load, isRo } = useHomepageSection('features', { items: [] })

const iconMap = { Clock, Shield, TrendingUp, Headphones }

const fallbackFeatures = computed(() => [
  {
    icon: Clock,
    color: 'accent',
    title: t('features.fastDelivery'),
    description: t('features.fastDeliveryDesc')
  },
  {
    icon: Shield,
    color: 'brand',
    title: t('features.secureTransport'),
    description: t('features.secureTransportDesc')
  },
  {
    icon: TrendingUp,
    color: 'green',
    title: t('features.liveTracking'),
    description: t('features.liveTrackingDesc')
  },
  {
    icon: Headphones,
    color: 'purple',
    title: t('features.support'),
    description: t('features.supportDesc')
  }
])

const features = computed(() => {
  const items = Array.isArray(content.value.items) ? content.value.items : []
  if (!items.length) return fallbackFeatures.value

  return items.map((item) => ({
    icon: iconMap[item.icon] || Clock,
    color: item.color || 'brand',
    title: isRo(locale.value) ? item.title_ro : item.title_en,
    description: isRo(locale.value) ? item.description_ro : item.description_en
  }))
})

onMounted(load)
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.features {
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;
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
