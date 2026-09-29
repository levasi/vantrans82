<template>
  <section id="about" class="about">
    <div class="container">
      <div class="about__grid">
        <!-- Left: Text Content -->
        <div class="about__content">
          <h2 class="about__title">
            {{ $t('about.title') }}
          </h2>
          <p class="about__text">
            {{ $t('about.description1') }}
          </p>
          <p class="about__text about__text--spaced">
            {{ $t('about.description2') }}
          </p>

          <!-- Values -->
          <div class="about__values">
            <h3 class="about__values-title">{{ $t('about.coreValues') }}</h3>
            <div v-for="(value, index) in values" :key="index" class="about__value">
              <div class="about__value-icon">
                <component :is="value.icon" class="icon--md" />
              </div>
              <div>
                <h4 class="about__value-title">
                  {{ value.title }}
                </h4>
                <p class="about__value-desc">
                  {{ value.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Image -->
        <div class="about__media">
          <div class="about__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1657819547860-ea03df0eafa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjB0ZWFtfGVufDF8fHx8MTc2NzczODgzNXww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="VanTrans82 Team"
              class="about__image"
            />
          </div>

          <!-- Stats Overlay -->
          <div class="about__stat">
            <div class="about__stat-value">500+</div>
            <div class="about__stat-label">{{ $t('about.satisfiedClients') }}</div>
          </div>

          <!-- Decorative Elements -->
          <div class="about__decor"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Shield, Zap, Users } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const values = computed(() => [
  {
    icon: Shield,
    title: t('about.safety'),
    description: t('about.safetyDesc'),
  },
  {
    icon: Zap,
    title: t('about.speed'),
    description: t('about.speedDesc'),
  },
  {
    icon: Users,
    title: t('about.trust'),
    description: t('about.trustDesc'),
  },
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.about {
  @include section-pad;
  background: $color-surface;
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @include respond-to(lg) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.about__title {
  font-size: 1.875rem;
  font-weight: 700;
  color: $color-text;
  margin: 0 0 1.5rem;

  @include respond-to(md) {
    font-size: 2.25rem;
  }
}

.about__text {
  font-size: 1.125rem;
  color: $color-text-muted;
  margin: 0 0 1.5rem;
  line-height: 1.625;

  &--spaced {
    margin-bottom: 2rem;
  }
}

.about__values {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about__values-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: $color-text;
  margin: 0 0 1rem;
}

.about__value {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.about__value-icon {
  padding: 0.75rem;
  background: $color-brand-light;
  border-radius: $radius-md;
  flex-shrink: 0;
  color: $color-brand;
}

.about__value-title {
  font-weight: 600;
  color: $color-text;
  margin: 0 0 0.25rem;
}

.about__value-desc {
  color: $color-text-muted;
  font-size: 0.875rem;
  line-height: 1.625;
  margin: 0;
}

.about__media {
  position: relative;
}

.about__image-wrap {
  border-radius: $radius-2xl;
  overflow: hidden;
  box-shadow: $shadow-2xl;
}

.about__image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.about__stat {
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  background: $color-surface;
  padding: 1.5rem;
  border-radius: $radius-xl;
  box-shadow: $shadow-xl;
  border: 1px solid $color-border;
}

.about__stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: $color-brand;
  margin-bottom: 0.25rem;
}

.about__stat-label {
  font-size: 0.875rem;
  color: $color-text-muted;
}

.about__decor {
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  width: 6rem;
  height: 6rem;
  background: $color-accent-soft;
  border-radius: $radius-full;
  opacity: 0.3;
  filter: blur(2rem);
  pointer-events: none;
}
</style>
