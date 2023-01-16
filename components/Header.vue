<template>
  <v-app-bar
      flat
      height="80"
  >
    <template #prepend>
      <v-avatar
          class="hidden-md-and-down"
          size="64"
          color="white"
          style="border-radius: 8px"
      >
        <v-img
            src="/logo.svg"
            alt="logo"
            width="64"
            height="64"
        />
      </v-avatar>
    </template>

    <v-btn
        class="hidden-md-and-down"
        icon="mdi-rectangle-outline"
        style="transform: rotate(90deg)"
    />

    <v-btn
        class="hidden-md-and-down"
        icon="mdi-rectangle-outline"
    />

    <v-btn
        class="hidden-md-and-down"
        icon="mdi-dots-grid"
    />

    <v-text-field
        v-model="searchTerm"
        label="Search by name"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        style="max-width: 350px; margin: 0 16px;"
    />

    <v-badge
        class="hidden-md-and-down"
        dot
        color="red"
    >
      <v-btn icon="mdi-filter" />
    </v-badge>

    <v-badge
        class="hidden-md-and-down"
        dot
        color="red"
    >
      <v-btn icon="mdi-swap-vertical" />
    </v-badge>

    <template #append>
      <v-avatar
          size="64"
          style="border-radius: 8px"
          @click="signOutUser"
      >
        <v-img
            src="/avatar.jpg"
            alt="avatar"
            fit="cover"
            width="64"
            height="64"
        />
      </v-avatar>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
const searchTerm = useSearchTerm();
</script>