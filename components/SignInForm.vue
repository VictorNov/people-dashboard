<template>
  <v-card-title class="mb-4">
    {{ title }}
  </v-card-title>
  <v-card-text>
    <v-text-field
        :model-value="email"
        label="Email"
        type="email"
        variant="outlined"
        prepend-inner-icon="mdi-mail"
        @update:model-value="email = $event"
    />
    <v-text-field
        :model-value="password"
        label="Password"
        type="password"
        variant="outlined"
        @update:model-value="password = $event"
    />
  </v-card-text>
  <v-card-actions>
    <v-btn
        variant="elevated"
        elevation="2"
        color="primary"
        size="large"
        @click="handleAction"
    >
      {{ isRegistration ? 'Register' : 'Sign In' }}
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';

const props = defineProps<{
  title: string;
  isRegistration: boolean;
}>();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const router = useRouter();

async function registerUser() {
  await createUser(email.value, password.value);
}

async function signIn() {
  await signInUser(email.value, password.value);
}

function handleAction() {
  if (props.isRegistration) {
    registerUser();
  } else {
    signIn();
  }
}
</script>