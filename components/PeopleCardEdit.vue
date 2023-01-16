<template>
  <image-editable
      :edited-person="editedPerson"
  />
  <v-card-text>
    <v-text-field
        v-model="editedPerson.Name"
        density="compact"
        label="Name"
        variant="outlined"
    />
    <v-text-field
        v-model="editedPerson.Title"
        density="compact"
        label="Title"
        variant="outlined"
    />
    <v-divider/>
    <v-card-subtitle class="mt-2">
      Tags
    </v-card-subtitle>
    <v-row
        v-for="(tag, index) in editedPerson.Tags"
        :key="`tag-${index}`"
        class="mt-2 align-center"
    >
      <data-editable
        :data="tag"
        type="tag"
        @deleteData="editedPerson.Tags.splice(index, 1)"
      />
    </v-row>
    <v-row>
      <v-btn
          class="mx-2 my-2"
          text
          @click="editedPerson.Tags.push({ Name: '', Color: '#ffffff', dialog: true })"
      >
        <v-icon>mdi-plus</v-icon> Add tag
      </v-btn>
    </v-row>
    <v-row class="mt-6">
      <v-divider/>
      <v-card-subtitle class="mt-2">
        Profit
      </v-card-subtitle>
    </v-row>
    <v-row>
      <data-editable
          :data="editedPerson.Profit[0]"
          type="profit"
      />
    </v-row>
    <v-row class="mt-6">
      <v-divider/>
      <v-card-subtitle class="mt-2">
        Attentions
      </v-card-subtitle>
    </v-row>
    <v-row
        v-for="(attention, index) in editedPerson.Attention"
        :key="`attention-${index}`"
    >
      <data-editable
          :data="attention"
          type="attention"
          @deleteData="editedPerson.Attention.splice(index, 1)"
      />
    </v-row>
    <v-row>
      <v-btn
          class="mx-2 my-2"
          text
          @click="editedPerson.Attention.push({ Amount: 50, Color: '#ffffff', dialog: true })"
      >
        <v-icon>mdi-plus</v-icon> Add attention
      </v-btn>
    </v-row>
    <v-row class="mt-6">
      <v-divider/>
      <v-card-actions
          class="d-flex justify-space-between"
          style="width: 100%;"
      >
        <v-btn
            prepend-icon="mdi-arrow-left"
            @click="handleCancel"
        >
          Cancel
        </v-btn>
        <v-btn
            prepend-icon="mdi-content-save"
            @click="handleEdit"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {Person} from "@/types";

const props = defineProps<{
  person: Person;
  isEditable?: boolean;
}>();

const persons = usePersons();
const editedPerson: Ref<Person> = ref(JSON.parse(JSON.stringify(props.person)));

const emits = defineEmits<{
  (event: 'close'): void;
}>();

function handleCancel() {
  editedPerson.value = JSON.parse(JSON.stringify(props.person));
  emits('close');
}

function handleEdit() {
  if (persons.value.data) {
    const index = persons.value.data.findIndex((person: Person) => person.Id === editedPerson.value.Id);
    persons.value.data[index] = JSON.parse(JSON.stringify(editedPerson.value));
    emits('close');
  }
}
</script>