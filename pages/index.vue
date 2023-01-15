<template>
  <v-container>
    <v-row
        align="center"
        justify="center"
        v-if="pending"
        style="height: calc(100vh - 90px);"
    >
      <v-progress-circular
          indeterminate
          size="64"
      />
    </v-row>
    <v-row v-show="!pending">
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
              @edit="handleEdit"
          />
        </v-col>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {Person} from "@/types";

const persons = usePersons();
const searchTerms = useSearchTerm();

const { data, pending, error, refresh } = await useLazyFetch('/api/fetch-persons');

persons.value = data;
const filteredPersons = computed((): Person[] => {
  if (searchTerms.value) {
    return persons.value.filter((person: Person) => {
      return person.Name.toLowerCase().includes(searchTerms.value.toLowerCase());
    });
  }
  return persons.value;
});

function handleEdit(editedPerson: Person) {
  persons.value = persons.value.map((person: Person) => {
    if (person.Id === editedPerson.Id) {
      return editedPerson;
    }
    return person;
  });
}
</script>