<template>
  <section class="cta-section">
    <!-- Background Image with Overlay -->
    <div class="cta-section__bg">
      <img
        src="https://images.unsplash.com/photo-1763736809655-9337caf643cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjBjb250cm9sJTIwY2VudGVyfGVufDF8fHx8MTc2NzczOTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        alt="Logistics Center"
        class="cta-section__bg-img"
      />
      <div class="cta-section__overlay"></div>
    </div>

    <div class="container cta-section__inner">
      <div class="cta-section__content">
        <h2 class="cta-section__title">
          {{ $t('cta.title') }}
        </h2>
        <p class="cta-section__subtitle">
          {{ $t('cta.subtitle') }}
        </p>

        <div class="cta-section__actions">
          <button
            @click="scrollToContact"
            class="btn--accent-lg"
          >
            {{ $t('cta.getQuote') }}
            <ArrowRight class="icon" />
          </button>
          <a
            :href="`tel:${formatPhoneForTel(settings.phoneNumber)}`"
            class="btn--ghost"
          >
            <Phone class="icon" />
            {{ settings.phoneNumber }}
          </a>
        </div>

        <p class="cta-section__note">
          {{ $t('cta.available') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowRight, Phone } from 'lucide-vue-next'
import { onMounted } from 'vue'

const { settings, loadSettings, formatPhoneForTel } = useSettings()

onMounted(() => {
  loadSettings()
})

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
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.cta-section {
  position: relative;
  @include section-pad;
  color: $color-text-inverse;
  overflow: hidden;
}

.cta-section__bg {
  position: absolute;
  inset: 0;
}

.cta-section__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cta-section__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgb(23 37 84 / 0.95),
    rgb(30 58 138 / 0.9),
    rgb(23 37 84 / 0.95)
  );
}

.cta-section__inner {
  position: relative;
}

.cta-section__content {
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.cta-section__title {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 1.5rem;

  @include respond-to(md) {
    font-size: 2.25rem;
  }

  @include respond-to(lg) {
    font-size: 3rem;
  }
}

.cta-section__subtitle {
  font-size: 1.125rem;
  color: #dbeafe;
  margin: 0 0 2.5rem;
  line-height: 1.625;

  @include respond-to(md) {
    font-size: 1.25rem;
  }
}

.cta-section__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;

  @include respond-to(sm) {
    flex-direction: row;
  }
}

.cta-section__note {
  font-size: 0.875rem;
  color: #bfdbfe;
  margin: 0;
}
</style>
