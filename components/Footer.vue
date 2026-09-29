<template>
    <footer class="footer">
        <div class="container footer__inner">
            <div class="footer__grid">
                <!-- Logo & Description -->
                <div class="footer__brand">
                    <div class="footer__logo">
                        <span class="footer__logo-wrap">
                            <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="footer__logo-img" />
                        </span>
                    </div>
                    <p class="footer__desc">
                        {{ $t('footer.description') }}
                    </p>
                    <div class="footer__social">
                        <a href="#" class="footer__social-link" aria-label="Facebook">
                            <Facebook class="icon" />
                        </a>
                        <a href="#" class="footer__social-link" aria-label="LinkedIn">
                            <Linkedin class="icon" />
                        </a>
                        <a href="#" class="footer__social-link" aria-label="Twitter">
                            <Twitter class="icon" />
                        </a>
                        <a :href="`mailto:${settings.contactEmail}`" class="footer__social-link" aria-label="Email">
                            <Mail class="icon" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="footer__col">
                    <h3 class="footer__heading">{{ $t('footer.quickLinks') }}</h3>
                    <ul class="footer__list">
                        <li>
                            <button @click="scrollToSection('home')" class="footer__link">
                                {{ $t('nav.home') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('services')" class="footer__link">
                                {{ $t('nav.services') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('fleet')" class="footer__link">
                                {{ $t('nav.fleet') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('about')" class="footer__link">
                                {{ $t('nav.about') }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="footer__col">
                    <h3 class="footer__heading">{{ $t('footer.ourServices') }}</h3>
                    <ul class="footer__list">
                        <li class="footer__item">{{ $t('footer.roadTransport') }}</li>
                        <li class="footer__item">{{ $t('footer.expressDelivery') }}</li>
                        <li class="footer__item">{{ $t('footer.internationalFreight') }}</li>
                        <li class="footer__item">{{ $t('footer.customLogistics') }}</li>
                    </ul>
                </div>

                <!-- Contact -->
                <div class="footer__col">
                    <h3 class="footer__heading">{{ $t('footer.contact') }}</h3>
                    <ul class="footer__list">
                        <li class="footer__item">
                            <a :href="`tel:${formatPhoneForTel(settings.phoneNumber)}`" class="footer__link">
                                {{ settings.phoneNumber }}
                            </a>
                        </li>
                        <li class="footer__item">
                            <a :href="`mailto:${settings.contactEmail}`" class="footer__link">
                                {{ settings.contactEmail }}
                            </a>
                        </li>
                        <li class="footer__item" v-html="settings.address.replace(/\n/g, '<br />')">
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="footer__bottom">
                <div class="footer__bottom-inner">
                    <p class="footer__copy">
                        © 2026 {{ settings.companyName }}. {{ $t('footer.rights') }}
                    </p>
                    <div class="footer__legal">
                        <a href="#" class="footer__legal-link">
                            Privacy Policy
                        </a>
                        <a href="#" class="footer__legal-link">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { Facebook, Linkedin, Twitter, Mail } from 'lucide-vue-next'
import { onMounted } from 'vue'

const { settings, loadSettings, formatPhoneForTel } = useSettings()

onMounted(() => {
    loadSettings()
})

const scrollToSection = (id) => {
    const element = document.getElementById(id)
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

.footer {
  background: $color-footer;
  color: $color-footer-text;

  &__inner {
    padding-top: 3rem;
    padding-bottom: 3rem;

    @include respond-to(md) {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 3rem;

    @include respond-to(md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to(lg) {
      grid-template-columns: repeat(4, 1fr);
      gap: 3rem;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  &__logo-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: $color-surface;
    border-radius: $radius-sm;
    padding: 0.25rem 0.5rem;
  }

  &__logo-img {
    height: 3.25rem;
    width: auto;
  }

  &__desc {
    font-size: 0.875rem;
    color: $color-footer-faint;
    line-height: 1.625;
    margin-bottom: 1.5rem;
  }

  &__social {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__social-link {
    width: 2.5rem;
    height: 2.5rem;
    background: $color-footer-muted;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background: $color-accent;
    }
  }

  &__heading {
    color: $color-text-inverse;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__item {
    font-size: 0.875rem;
  }

  &__link {
    font-size: 0.875rem;
    transition: color 0.2s;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
    font: inherit;
    text-align: left;

    &:hover {
      color: $color-accent;
    }
  }

  &__bottom {
    padding-top: 2rem;
    border-top: 1px solid $color-footer-muted;
  }

  &__bottom-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    @include respond-to(md) {
      flex-direction: row;
    }
  }

  &__copy {
    font-size: 0.875rem;
    color: $color-footer-faint;
  }

  &__legal {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  &__legal-link {
    font-size: 0.875rem;
    color: $color-footer-faint;
    transition: color 0.2s;

    &:hover {
      color: $color-accent;
    }
  }
}
</style>
