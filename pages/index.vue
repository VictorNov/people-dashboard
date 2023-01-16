<template>
  <v-container>
    <v-row
        align="center"
        justify="center"
        v-if="isError"
    >
      <v-alert
          color="error"
          icon="mdi-alert-circle"
          outlined
          type="error"
      >
        {{ isError }}
      </v-alert>
    </v-row>
    <v-row>
      <v-slide-y-transition group origin="center center" mode="out-in">
        <v-col
            v-for="person in filteredPersons"
            :key="person.Id"
            cols="12"
            md="6"
            lg="3"
        >
          <people-card
              :person="person"
              :is-editable="false"
          />
        </v-col>
      </v-slide-y-transition>
    </v-row>
    <v-row
        class="my-6"
        align="center"
        justify="center"
        v-if="isPending"
    >
      <v-progress-circular
          indeterminate
          size="64"
      />
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Person} from "@/types";

definePageMeta({
  middleware: ["auth"]
})

const persons = usePersons();
const searchTerms = useSearchTerm();
const isError = ref();
const isPending = ref(true);

const { data, pending, error } = await useLazyFetch('/api/fetch-persons', {
  query: { page: persons.value.currentPage }
});

const filteredPersons = computed((): Person[] => {
  if (persons.value.data) {
    if (searchTerms.value) {
      return persons.value.data.filter((person: Person) => {
        return person.Name.toLowerCase().includes(searchTerms.value.toLowerCase());
      });
    }
    return persons.value.data;
  }
  return [];
});

watch(() => data.value, () => {
  if (data.value) {
    persons.value.data?.push(...data.value);
    persons.value.currentPage++;
    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 0);
  }
});

watch(() => error.value, () => {
  isError.value = error.value;
});

watch(() => pending.value, () => {
  isPending.value = pending.value;
});

async function handleScroll() {
  const bottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;

  if (bottom < 50 && !isPending.value) {
    isPending.value = true;
    const { data, pending, error } = await useLazyFetch('/api/fetch-persons', {
      query: { page: persons.value.currentPage }
    });
    isPending.value = pending.value;
    isError.value = error.value;
    if (data.value?.length) {
      persons.value.data?.push(...data.value);
      persons.value.currentPage++;
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
  }
}
</script>