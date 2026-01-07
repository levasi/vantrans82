<template>
    <header class="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16 md:h-20">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <button @click="scrollToSection('home')"
                        class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-12 w-auto transition-all duration-300" />
                    </button>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center gap-8">
                    <button @click="scrollToSection('home')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.home') }}
                    </button>
                    <button @click="scrollToSection('services')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.services') }}
                    </button>
                    <button @click="scrollToSection('fleet')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.fleet') }}
                    </button>
                    <button @click="scrollToSection('coverage')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.coverage') }}
                    </button>
                    <button @click="scrollToSection('about')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.about') }}
                    </button>
                    <button @click="scrollToSection('faq')" class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.faq') }}
                    </button>
                    <button @click="scrollToSection('contact')"
                        class="text-gray-700 hover:text-blue-900 transition-colors">
                        {{ $t('nav.contact') }}
                    </button>
                </div>

                <!-- Language Switcher & CTA Button - Desktop -->
                <div class="hidden md:flex items-center gap-4">
                    <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                        <button @click="switchLocale('en')" :class="[
                            'px-3 py-1 rounded text-sm transition-colors',
                            locale === 'en' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                        ]">
                            EN
                        </button>
                        <button @click="switchLocale('ro')" :class="[
                            'px-3 py-1 rounded text-sm transition-colors',
                            locale === 'ro' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                        ]">
                            RO
                        </button>
                    </div>
                    <button @click="scrollToSection('contact')"
                        class="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        {{ $t('nav.getQuote') }}
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button class="md:hidden p-2" @click="mobileMenuOpen = !mobileMenuOpen">
                    <X v-if="mobileMenuOpen" class="w-6 h-6 text-gray-700" />
                    <Menu v-else class="w-6 h-6 text-gray-700" />
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
                <div class="flex flex-col gap-4">
                    <button @click="scrollToSection('home')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.home') }}
                    </button>
                    <button @click="scrollToSection('services')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.services') }}
                    </button>
                    <button @click="scrollToSection('fleet')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.fleet') }}
                    </button>
                    <button @click="scrollToSection('coverage')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.coverage') }}
                    </button>
                    <button @click="scrollToSection('about')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.about') }}
                    </button>
                    <button @click="scrollToSection('faq')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.faq') }}
                    </button>
                    <button @click="scrollToSection('contact')"
                        class="text-left text-gray-700 hover:text-blue-900 transition-colors py-2">
                        {{ $t('nav.contact') }}
                    </button>
                    <div class="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                        <button @click="switchLocale('en')" :class="[
                            'px-3 py-1 rounded text-sm transition-colors flex-1',
                            locale === 'en' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                        ]">
                            EN
                        </button>
                        <button @click="switchLocale('ro')" :class="[
                            'px-3 py-1 rounded text-sm transition-colors flex-1',
                            locale === 'ro' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                        ]">
                            RO
                        </button>
                    </div>
                    <button @click="scrollToSection('contact')"
                        class="w-full px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        {{ $t('nav.getQuote') }}
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)

const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        mobileMenuOpen.value = false
    }
}

const switchLocale = (newLocale) => {
    setLocale(newLocale)
}
</script>
