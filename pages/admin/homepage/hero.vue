<template>
  <AdminHomepageSectionEditor section="hero" />
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: false
})

useHead({
  title: 'Hero - Admin - VanTrans82'
})
</script>
