<template>
  <v-container>
    <v-row>
      <v-col
          v-for="person in data"
          :key="person.Id"
          cols="12"
          md="6"
          lg="3"
      >
        <PeopleCard :person="person"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
const { data, pending, error, refresh } = await
    useFetch(`${runtimeConfig.public.backendApi}people`);
console.log(data);
</script>

<style scoped>

</style>