<template>
  <v-app>
    <Header/>
    <v-main>
      <NuxtPage/>
    </v-main>
  </v-app>
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
