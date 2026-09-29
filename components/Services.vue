<template>
  <section id="services" class="services">
    <div class="container">
      <div class="section-header">
        <h2>{{ $t('services.title') }}</h2>
        <p>{{ $t('services.subtitle') }}</p>
      </div>

      <div class="services__grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="services__card"
        >
          <div class="services__media">
            <img
              :src="service.image"
              :alt="service.title"
              class="services__image"
            />
            <div class="services__media-overlay"></div>
            <div class="services__icon-wrap">
              <component :is="service.icon" class="icon icon--md services__icon" />
            </div>
          </div>

          <div class="services__body">
            <h3 class="services__card-title">{{ service.title }}</h3>
            <p class="services__card-desc">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { Truck, Zap, Globe, Settings } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t } = useI18n()

const services = computed(() => [
  {
    icon: Truck,
    title: t('services.roadTransport'),
    description: t('services.roadTransportDesc'),
    image: 'https://images.unsplash.com/photo-1643119270753-9f506b137e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwaGlnaHdheSUyMHRyYW5zcG9ydHxlbnwxfHx8fDE3Njc3MzkxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Zap,
    title: t('services.expressDelivery'),
    description: t('services.expressDeliveryDesc'),
    image: 'https://images.unsplash.com/photo-1761454200783-ca533f7928e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHZhbiUyMHZlaGljbGV8ZW58MXx8fHwxNzY3NzM4ODM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Globe,
    title: t('services.internationalFreight'),
    description: t('services.internationalFreightDesc'),
    image: 'https://images.unsplash.com/photo-1663103746090-2e4274c6c7ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlwcGluZyUyMGNvbnRhaW5lciUyMHBvcnR8ZW58MXx8fHwxNzY3NzM5MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Settings,
    title: t('services.customLogistics'),
    description: t('services.customLogisticsDesc'),
    image: 'https://images.unsplash.com/photo-1726866672851-5b99c837603c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBtb2Rlcm4lMjBmYWNpbGl0eXxlbnwxfHx8fDE3Njc3MzkxNTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
])
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.services {
  @include section-pad;
  background: $color-muted;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  &__card {
    background: $color-surface;
    border-radius: $radius-xl;
    border: 1px solid $color-border;
    overflow: hidden;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:hover {
      border-color: $color-accent;
      box-shadow: $shadow-lg;

      .services__image {
        transform: scale(1.1);
      }
    }
  }

  &__media {
    position: relative;
    height: 12rem;
    overflow: hidden;
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
    background: linear-gradient(to top, rgb(30 58 138 / 0.8), transparent);
  }

  &__icon-wrap {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    width: 3rem;
    height: 3rem;
    background: $color-surface;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: $shadow-lg;
  }

  &__icon {
    color: $color-brand;
  }

  &__body {
    padding: 1.5rem;
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $color-text;
    margin: 0 0 0.75rem;
  }

  &__card-desc {
    color: $color-text-muted;
    line-height: 1.625;
    margin: 0;
  }
}
</style>
