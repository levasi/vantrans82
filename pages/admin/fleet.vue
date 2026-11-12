<script setup>
definePageMeta({
  middleware: 'admin',
  layout: false
})

await navigateTo('/admin/homepage/fleet', { replace: true })
</script>
