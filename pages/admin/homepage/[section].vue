<template>
  <AdminHomepageSectionEditor :section="section" />
</template>

<script setup lang="ts">
import type { HomepageSectionKey } from '~/utils/homepage-section-forms'

definePageMeta({
  middleware: 'admin',
  layout: 'admin',
  validate: (route) => {
    const value = route.params.section
    const key = Array.isArray(value) ? value[0] : value
    return typeof key === 'string' && [
      'hero',
      'features',
      'services',
      'cta',
      'testimonials',
      'about',
      'faq',
      'contact'
    ].includes(key)
  }
})

const route = useRoute()

const section = computed(() => {
  const value = route.params.section
  const key = Array.isArray(value) ? value[0] : value
  return key as HomepageSectionKey
})
</script>
