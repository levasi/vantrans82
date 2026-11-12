<script setup>
definePageMeta({
  middleware: 'admin',
  layout: false
})

await navigateTo('/admin/homepage/coverage', { replace: true })
</script>
