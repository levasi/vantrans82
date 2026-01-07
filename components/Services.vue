<template>
    <section id="services" class="py-20 md:py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Section Header -->
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {{ $t('services.title') }}
                </h2>
                <p class="text-lg text-gray-600">
                    {{ $t('services.subtitle') }}
                </p>
            </div>

            <!-- Service Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <div v-for="(service, index) in services" :key="index"
                    class="bg-white rounded-xl border border-gray-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <!-- Image -->
                    <div class="relative h-48 overflow-hidden">
                        <img :src="service.image" :alt="service.title"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                        <div
                            class="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <component :is="service.icon" class="w-6 h-6 text-blue-900" />
                        </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">
                            {{ service.title }}
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            {{ service.description }}
                        </p>
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
