<template>
  <AdminHomepageSectionEditor section="about" />
</template>

<script setup>
definePageMeta({
  middleware: 'admin',
  layout: false
})

useHead({
  title: 'About - Admin - VanTrans82'
})
</script>
