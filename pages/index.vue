<template>
  <div class="page">
    <Header />
    <main>
      <Hero v-if="isSectionVisible('hero')" />
      <Features v-if="isSectionVisible('features')" />
      <Services v-if="isSectionVisible('services')" />
      <Fleet v-if="isSectionVisible('fleet')" />
      <Coverage v-if="isSectionVisible('coverage')" />
      <CTASection v-if="isSectionVisible('cta')" />
      <Testimonials v-if="isSectionVisible('testimonials')" />
      <About v-if="isSectionVisible('about')" />
      <FAQ v-if="isSectionVisible('faq')" />
      <Contact v-if="isSectionVisible('contact')" />
    </main>
    <Footer />
  </div>
</template>

<script setup>
const { loadVisibility, isSectionVisible } = useHomepageVisibility()
const { loadSettings } = useSettings()

await Promise.all([loadVisibility(), loadSettings()])

useHead({
  title: 'VanTrans82 - Fast & Reliable Freight Transport',
  meta: [
    { name: 'description', content: 'Professional logistics solutions with guaranteed on-time delivery. Your trusted partner for road transport, express delivery, and international freight across Romania and EU.' }
  ]
})
</script>
