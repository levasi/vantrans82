<template>
    <footer class="bg-gray-900 text-gray-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                <!-- Logo & Description -->
                <div class="lg:col-span-1">
                    <div class="flex items-center gap-2 mb-4">
                        <NuxtImg src="/vtlogo.png" alt="VanTrans82" class="h-10 w-auto" />
                    </div>
                    <p class="text-sm text-gray-400 leading-relaxed mb-6">
                        {{ $t('footer.description') }}
                    </p>
                    <div class="flex items-center gap-4">
                        <a href="#"
                            class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="Facebook">
                            <Facebook class="w-5 h-5" />
                        </a>
                        <a href="#"
                            class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="LinkedIn">
                            <Linkedin class="w-5 h-5" />
                        </a>
                        <a href="#"
                            class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="Twitter">
                            <Twitter class="w-5 h-5" />
                        </a>
                        <a href="mailto:contact@vantrans82.ro"
                            class="w-10 h-10 bg-gray-800 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors"
                            aria-label="Email">
                            <Mail class="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div>
                    <h3 class="text-white font-semibold mb-4">{{ $t('footer.quickLinks') }}</h3>
                    <ul class="space-y-3">
                        <li>
                            <button @click="scrollToSection('home')"
                                class="text-sm hover:text-orange-600 transition-colors">
                                {{ $t('nav.home') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('services')"
                                class="text-sm hover:text-orange-600 transition-colors">
                                {{ $t('nav.services') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('fleet')"
                                class="text-sm hover:text-orange-600 transition-colors">
                                {{ $t('nav.fleet') }}
                            </button>
                        </li>
                        <li>
                            <button @click="scrollToSection('about')"
                                class="text-sm hover:text-orange-600 transition-colors">
                                {{ $t('nav.about') }}
                            </button>
                        </li>
                    </ul>
                </div>

                <!-- Services -->
                <div>
                    <h3 class="text-white font-semibold mb-4">{{ $t('footer.ourServices') }}</h3>
                    <ul class="space-y-3">
                        <li class="text-sm">{{ $t('footer.roadTransport') }}</li>
                        <li class="text-sm">{{ $t('footer.expressDelivery') }}</li>
                        <li class="text-sm">{{ $t('footer.internationalFreight') }}</li>
                        <li class="text-sm">{{ $t('footer.customLogistics') }}</li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h3 class="text-white font-semibold mb-4">{{ $t('footer.contact') }}</h3>
                    <ul class="space-y-3">
                        <li class="text-sm">
                            <a href="tel:+40123456789" class="hover:text-orange-600 transition-colors">
                                +40 123 456 789
                            </a>
                        </li>
                        <li class="text-sm">
                            <a href="mailto:contact@vantrans82.ro" class="hover:text-orange-600 transition-colors">
                                contact@vantrans82.ro
                            </a>
                        </li>
                        <li class="text-sm">
                            Str. Logistica nr. 123<br />
                            Bucharest, Romania
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-gray-800">
                <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-sm text-gray-400">
                        © 2026 VanTrans82. {{ $t('footer.rights') }}
                    </p>
                    <div class="flex items-center gap-6">
                        <a href="#" class="text-sm text-gray-400 hover:text-orange-600 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" class="text-sm text-gray-400 hover:text-orange-600 transition-colors">
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

const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
}
</script>
