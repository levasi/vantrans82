<template>
  <section class="cta-section">
    <!-- Background Image with Overlay -->
    <div class="cta-section__bg">
      <img
        :src="backgroundImage"
        alt="Logistics Center"
        class="cta-section__bg-img"
      />
      <div class="cta-section__overlay"></div>
    </div>

    <div class="container cta-section__inner">
      <div class="cta-section__content">
        <h2 class="cta-section__title">
          {{ title }}
        </h2>
        <p class="cta-section__subtitle">
          {{ subtitle }}
        </p>

        <div class="cta-section__actions">
          <button
            @click="scrollToContact"
            class="btn--accent-lg"
          >
            {{ getQuote }}
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
          {{ available }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ArrowRight, Phone } from 'lucide-vue-next'
import { useI18n } from '#imports'

const { t, locale } = useI18n()
const { settings, loadSettings, formatPhoneForTel } = useSettings()
const { content, load, pick } = useHomepageSection('cta', {
  title_ro: '',
  title_en: '',
  subtitle_ro: '',
  subtitle_en: '',
  get_quote_ro: '',
  get_quote_en: '',
  available_ro: '',
  available_en: '',
  background_image_url:
    'https://images.unsplash.com/photo-1763736809655-9337caf643cc?auto=format&fit=crop&w=1080&q=80'
})

const title = computed(() => pick('title_ro', 'title_en', locale.value, t('cta.title')))
const subtitle = computed(() => pick('subtitle_ro', 'subtitle_en', locale.value, t('cta.subtitle')))
const getQuote = computed(() => pick('get_quote_ro', 'get_quote_en', locale.value, t('cta.getQuote')))
const available = computed(() => pick('available_ro', 'available_en', locale.value, t('cta.available')))
const backgroundImage = computed(
  () =>
    content.value.background_image_url ||
    'https://images.unsplash.com/photo-1763736809655-9337caf643cc?auto=format&fit=crop&w=1080&q=80'
)

onMounted(() => {
  loadSettings()
  load()
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
