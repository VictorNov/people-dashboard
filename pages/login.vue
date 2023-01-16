<template>
  <v-container>
    <v-row justify="center">
      <v-col class="v-col-md-6 v-col-12">
        <v-card
            rounded="lg"
            color="white"
            class="px-6 py-6"
        >
          <sign-in-form
              :title="isRegistration ? 'Registration' : 'Sign In'"
              :is-registration="isRegistration"
          />
        </v-card>
        <v-row justify="center">
          <v-btn
              class="mx-auto my-8"
              @click="isRegistration = !isRegistration"
          >
            {{ isRegistration ? 'Sign In' : 'Registration' }}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const isRegistration = ref(false);

async function signIn() {
  const credentials = await signInUser('test5@test.ru', '123456');
  console.log(credentials);
}
async function signOut() {
  const credentials = await signOutUser();
  console.log(credentials);
}
</script>