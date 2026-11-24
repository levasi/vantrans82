<template>
    <header class="site-header">
        <nav class="site-header__nav container">
            <div class="site-header__bar">
                <!-- Logo -->
                <div class="site-header__logo">
                    <button @click="scrollToSection('home')" class="site-header__logo-btn">
                        <BrandLogo class="site-header__logo-img" />
                    </button>
                </div>

                <!-- Desktop Navigation -->
                <div class="site-header__links">
                    <button
                        v-for="item in visibleNavItems"
                        :key="item.id"
                        @click="scrollToSection(item.id)"
                        :class="navLinkClass(item.id)"
                    >
                        {{ $t(`nav.${item.labelKey}`) }}
                    </button>
                </div>

                <!-- Language Switcher & CTA Button - Desktop -->
                <div class="site-header__actions">
                    <div v-if="showLanguageSwitch" class="lang-switch">
                        <button @click="switchLocale('en')" :class="[
                            'lang-switch__btn',
                            locale === 'en' ? 'lang-switch__btn--active' : ''
                        ]">
                            EN
                        </button>
                        <button @click="switchLocale('ro')" :class="[
                            'lang-switch__btn',
                            locale === 'ro' ? 'lang-switch__btn--active' : ''
                        ]">
                            RO
                        </button>
                    </div>
                    <button
                        v-if="isSectionVisible('contact')"
                        @click="scrollToSection('contact')"
                        class="btn btn--accent"
                    >
                        {{ $t('nav.getQuote') }}
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button class="site-header__menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
                    <X v-if="mobileMenuOpen" class="icon icon--md site-header__menu-icon" />
                    <Menu v-else class="icon icon--md site-header__menu-icon" />
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div v-if="mobileMenuOpen" class="site-header__mobile">
                <div class="site-header__mobile-links">
                    <button
                        v-for="item in visibleNavItems"
                        :key="`mobile-${item.id}`"
                        @click="scrollToSection(item.id)"
                        :class="navLinkClass(item.id, true)"
                    >
                        {{ $t(`nav.${item.labelKey}`) }}
                    </button>
                    <div v-if="showLanguageSwitch" class="lang-switch">
                        <button @click="switchLocale('en')" :class="[
                            'lang-switch__btn',
                            'lang-switch__btn--grow',
                            locale === 'en' ? 'lang-switch__btn--active' : ''
                        ]">
                            EN
                        </button>
                        <button @click="switchLocale('ro')" :class="[
                            'lang-switch__btn',
                            'lang-switch__btn--grow',
                            locale === 'ro' ? 'lang-switch__btn--active' : ''
                        ]">
                            RO
                        </button>
                    </div>
                    <button
                        v-if="isSectionVisible('contact')"
                        @click="scrollToSection('contact')"
                        class="btn btn--accent btn--block"
                    >
                        {{ $t('nav.getQuote') }}
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)
const showLanguageSwitch = ref(true)
const activeSection = ref('home')

const { loadVisibility, isSectionVisible } = useHomepageVisibility()

const navItems = [
    { id: 'home', labelKey: 'home', visibilityKey: 'hero' },
    { id: 'services', labelKey: 'services', visibilityKey: 'services' },
    { id: 'fleet', labelKey: 'fleet', visibilityKey: 'fleet' },
    { id: 'coverage', labelKey: 'coverage', visibilityKey: 'coverage' },
    { id: 'about', labelKey: 'about', visibilityKey: 'about' },
    { id: 'faq', labelKey: 'faq', visibilityKey: 'faq' },
    { id: 'contact', labelKey: 'contact', visibilityKey: 'contact' }
]

const visibleNavItems = computed(() =>
    navItems.filter((item) => isSectionVisible(item.visibilityKey))
)

const navSections = computed(() => visibleNavItems.value.map((item) => item.id))

function updateActiveSection() {
    const header = document.querySelector('header')
    const headerHeight = header ? header.offsetHeight : 80
    const offset = headerHeight + 80
    const sections = navSections.value

    for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
            const top = el.getBoundingClientRect().top
            if (top <= offset) {
                activeSection.value = sections[i]
                return
            }
        }
    }
    activeSection.value = sections[0] || 'home'
}

function navLinkClass(sectionId, isMobile = false) {
    const base = isMobile ? 'nav-link nav-link--mobile' : 'nav-link'
    const active = activeSection.value === sectionId ? 'nav-link--active' : ''
    return [base, active].filter(Boolean).join(' ')
}

const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
        // Get header height (64px on mobile, 80px on desktop)
        const header = document.querySelector('header')
        const headerHeight = header ? header.offsetHeight : 80

        // Calculate position with offset
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

        mobileMenuOpen.value = false
    }
}

const switchLocale = (newLocale) => {
    setLocale(newLocale)
}

// Load settings
const { settings, loadSettings } = useSettings()

onMounted(async () => {
    loadSettings()
    await loadVisibility()
    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', updateActiveSection)
})

// Watch for settings changes to update language switch
watch(() => settings.value.showLanguageSwitch, (newValue) => {
    showLanguageSwitch.value = newValue
}, { immediate: true })
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;
@use '~/assets/scss/mixins' as *;

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: $color-surface;
  border-bottom: 1px solid $color-border;
  box-shadow: $shadow-sm;

  &__bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;

    @include respond-to(md) {
      height: 5rem;
    }
  }

  &__logo {
    flex-shrink: 0;
  }

  &__logo-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  &__logo-img {
    height: 3rem;
    width: auto;
    transition: all 0.3s;
  }

  &__links {
    display: none;
    align-items: center;
    gap: 2rem;

    @include respond-to(md) {
      display: flex;
    }
  }

  &__actions {
    display: none;
    align-items: center;
    gap: 1rem;

    @include respond-to(md) {
      display: flex;
    }
  }

  &__menu-btn {
    display: block;
    padding: 0.5rem;

    @include respond-to(md) {
      display: none;
    }
  }

  &__menu-icon {
    color: $color-text-secondary;
  }

  &__mobile {
    display: block;
    padding: 1rem 0;
    border-top: 1px solid $color-border;

    @include respond-to(md) {
      display: none;
    }
  }

  &__mobile-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.nav-link {
  transition: color 0.2s;
  color: $color-text-secondary;
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  padding: 0;

  &:hover {
    color: $color-brand;
  }

  &--active {
    color: $color-brand;
    font-weight: 600;
  }

  &--mobile {
    text-align: left;
    padding: 0.5rem 0;
  }
}

.lang-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid $color-border-strong;
  border-radius: $radius-lg;
  padding: 0.25rem;

  &__btn {
    padding: 0.25rem 0.75rem;
    border-radius: $radius-sm;
    font-size: 0.875rem;
    transition: background-color 0.2s, color 0.2s;
    color: $color-text-secondary;
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;

    &:hover {
      background: $color-muted;
    }

    &--active {
      background: $color-brand;
      color: $color-text-inverse;

      &:hover {
        background: $color-brand;
      }
    }

    &--grow {
      flex: 1;
    }
  }
}
</style>
