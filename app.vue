<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'People Dashboard',
  meta: [
    {
      name: 'description',
      content: 'Code test project for Dev-Team'
    }
  ]
})
</script>
