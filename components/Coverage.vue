<template>
  <section id="coverage" class="coverage">
    <div class="container">
      <div class="coverage__layout">
        <div class="coverage__content">
          <h2 class="coverage__title">{{ title }}</h2>
          <p class="coverage__subtitle">{{ subtitle }}</p>

          <div class="coverage__regions">
            <div
              v-for="region in regions"
              :key="region.id"
              class="coverage__region"
            >
              <CheckCircle class="icon coverage__check" />
              <span>{{ region.name }}</span>
            </div>
          </div>
        </div>

        <div class="coverage__map-wrap">
          <div class="coverage__map-card">
            <div class="coverage__map">
              <iframe
                class="coverage__map-frame"
                :title="pinLabel"
                src="https://www.openstreetmap.org/export/embed.html?bbox=23.95%2C45.72%2C24.35%2C45.87&layer=mapnik&marker=45.7936%2C24.1510"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <div class="coverage__map-label">
                <MapPin class="icon coverage__map-pin" />
                <span>{{ pinLabel }}</span>
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
import { computed, ref, onMounted } from 'vue'
import { MapPin, CheckCircle } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t, locale } = useI18n()

const remote = ref(null)

const isRo = computed(() => String(locale.value).startsWith('ro'))

const title = computed(() =>
  remote.value?.content
    ? (isRo.value ? remote.value.content.title_ro : remote.value.content.title_en)
    : t('coverage.title')
)

const subtitle = computed(() =>
  remote.value?.content
    ? (isRo.value ? remote.value.content.subtitle_ro : remote.value.content.subtitle_en)
    : t('coverage.subtitle')
)

const pinLabel = computed(() => t('coverage.pinLabel'))

const regions = computed(() => {
  if (remote.value?.regions?.length) {
    return remote.value.regions.map((region) => ({
      id: region.id,
      name: isRo.value ? region.name_ro : region.name_en
    }))
  }

  return [
    { id: 'bucharest', name: t('coverage.regions.bucharest') },
    { id: 'transylvania', name: t('coverage.regions.transylvania') },
    { id: 'muntenia', name: t('coverage.regions.muntenia') },
    { id: 'westernEurope', name: t('coverage.regions.westernEurope') }
  ]
})

const loadCoverage = async () => {
  try {
    const response = await $fetch('/api/coverage')
    if (response?.content) {
      remote.value = response
    }
  } catch (error) {
    console.error('Failed to load coverage:', error)
  }
}

onMounted(loadCoverage)
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

  &__map-frame {
    width: 100%;
    height: 100%;
    border: 0;
  }

  &__map-label {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    background: $color-surface;
    border: 1px solid $color-border;
    border-radius: $radius-full;
    box-shadow: $shadow-lg;
    color: $color-text;
    font-size: 0.875rem;
    font-weight: 600;
  }

  &__map-pin {
    width: 1rem;
    height: 1rem;
    color: $color-brand;
    flex-shrink: 0;
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
