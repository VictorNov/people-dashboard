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
    <v-alert
        v-if="errorMessage"
        color="error"
        icon="mdi-alert-circle"
        outlined
        type="error"
    >
      {{ errorMessage }}
    </v-alert>
  </v-card-text>
  <v-card-actions>
    <v-btn
        variant="elevated"
        elevation="2"
        color="primary"
        size="large"
        @click="handleAction"
    >
      Submit
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts" setup>
import {ComputedRef, Ref} from 'vue';

const props = defineProps<{
  title: string;
  isRegistration: boolean;
}>();

const email: Ref<string> = ref('');
const password: Ref<string> = ref('');
const router = useRouter();
const errorCode: Ref<string> = ref('');
const errorMessage: ComputedRef = computed(() => {
  if (errorCode.value === 'auth/user-not-found') {
    return 'User not found';
  } else if (errorCode.value === 'auth/wrong-password') {
    return 'Wrong password';
  } else if (errorCode.value === 'auth/email-already-in-use') {
    return 'Email already in use';
  } else if (errorCode.value === 'auth/weak-password') {
    return 'Password is too weak';
  } else {
    return '';
  }
});

async function registerUser() {
  const res = await createUser(email.value, password.value);
  if (res) {
    errorCode.value = res.errorCode;
  }
}

async function signIn() {
  const res = await signInUser(email.value, password.value);
  if (res.errorCode) {
    errorCode.value = res.errorCode;
  }
}

function handleAction() {
  if (props.isRegistration) {
    registerUser();
  } else {
    signIn();
  }
}

watch([
  () => email.value,
  () => password.value,
  () => props.isRegistration,
], () => {
  errorCode.value = '';
});
</script>