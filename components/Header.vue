<template>
  <v-app-bar
      flat
      height="80"
  >
    <template #prepend>
      <v-avatar
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
        icon="mdi-rectangle-outline"
        style="transform: rotate(90deg)"
    />

    <v-btn icon="mdi-rectangle-outline"/>

    <v-btn icon="mdi-dots-grid"/>

    <v-text-field
        placeholder="Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        style="max-width: 350px; margin: 0 16px"
    />

    <v-badge
        dot
        color="red"
    >
      <v-btn icon="mdi-filter"/>
    </v-badge>

    <v-badge
        dot
        color="red"
    >
      <v-btn icon="mdi-swap-vertical"/>
    </v-badge>

    <template #append>
      <v-avatar
          size="64"
          style="border-radius: 8px"
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