<template>
    <button @click="emit('click')"
        class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all text-left w-full group">
        <div class="flex items-start gap-4">
            <div class="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <component :is="iconComponent" class="w-6 h-6 text-blue-900" />
            </div>
            <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-1">{{ title }}</h3>
                <p class="text-sm text-gray-600">{{ description }}</p>
            </div>
            <ChevronRight class="w-5 h-5 text-gray-400 group-hover:text-blue-900 transition-colors" />
        </div>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
    title: string
    description: string
    icon: string
}>()

const emit = defineEmits<{
    click: []
}>()

const iconComponent = computed(() => {
    const iconName = props.icon
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons]
    return IconComponent || LucideIcons.FileText
})
</script>
