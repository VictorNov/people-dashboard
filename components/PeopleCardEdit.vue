<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
        v-bind="props"
        style="position: relative;"
    >
      <v-img
          class="rounded-lg"
          :src="editedPerson.Photo"
          :alt="editedPerson.Name"
          aspect-ratio="16/9"
          cover
          style="aspect-ratio: 16/9; object-fit: cover;"
      />
      <v-overlay
          :model-value="isHovering"
          contained
          class="d-flex align-center justify-center"
      >
        <v-row justify="space-around">
          <v-btn
              icon
              :style="{
              transform: `translateY(${isHovering ? '0' : '120%'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
              v-bind="props"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
              icon
              :style="{
              transform: `translateY(${isHovering ? '0' : '120%'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
              v-bind="props"
              @click="fileInput.click()"
          >
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-row>
      </v-overlay>
    </div>
  </v-hover>
  <v-file-input
      ref="fileInput"
      class="visually-hidden"
      v-model="editedPhoto"
      prepend-icon="mdi-camera"
      accept="image/*"
      :clearable="false"
      hide-details
      hide-input
  />
  <div class="people-card__tags">
    <v-hover
        v-for="tag in person.Tags"
        :key="tag.Name"
        v-slot="{ isHovering, props }"
    >
      <v-chip
          v-bind="props"
          :color="`#${tag.Color}`"
          :style="{
              color: useCalculateColor(tag.Color),
              transform: `translateX(${isHovering ? '-1rem' : '0'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
          variant="elevated"
          label
          density="compact"
      >
          <span>
            {{ tag.Name }}
          </span>
      </v-chip>
    </v-hover>
  </div>
  <v-row>
    <v-col cols="8">
      <v-card-title
          class="font-weight-bold pb-0"
          tag="h2"
      >
        {{ useCapitalize(person.Name) }}
      </v-card-title>
      <v-card-subtitle>
        {{ person.Title }}
      </v-card-subtitle>
    </v-col>
    <v-col cols="4">
      <slot name="actions"/>
    </v-col>
  </v-row>
  <v-divider/>
  <v-card-text>
    <v-row>
      <v-col cols="6" class="pb-0">Profit</v-col>
      <v-col cols="6" class="d-flex justify-end pb-0 font-weight-bold">
        + ${{ profit * 10 }}
      </v-col>
      <v-col cols="12" class="py-0">
        <v-progress-linear
            :model-value="profit"
            :color="`#${profitColor}`"
            bg-color="grey lighten-4"
            height="20"
            rounded
            rounded-bar
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6" class="pb-0">Attention</v-col>
      <v-col cols="6" class="d-flex justify-end pb-0 font-weight-bold">
        {{ 0 }} h
      </v-col>
      <v-col cols="12" class="py-0">
        <v-progress-linear
            :model-value="100"
            color="transparent"
            height="20"
            rounded
            rounded-bar
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import {ComputedRef, Ref} from "vue";
import {Person} from "@/types";

const props = defineProps<{
  person: Person;
  isEditable?: boolean;
}>();

const editedPerson: Ref<Person> = ref({...props.person});
const editedPhoto: Ref<File[] | null> = ref(null);
const fileInput: Ref<HTMLElement | null> = ref(null);

watch(editedPhoto, (newPhoto) => {
  if (newPhoto) {
    const reader = new FileReader();
    reader.readAsDataURL(newPhoto[0]);
    reader.onload = () => {
      editedPerson.value.Photo = reader.result as string;
    };
  } else {
    editedPerson.value.Photo = props.person.Photo;
  }
});

const emits = defineEmits<{
  (event: 'edit', ...args: any[]): void;
}>();

function onEdit() {
  emits('edit', editedPerson);
}

const profit: ComputedRef = computed((): number => {
  if (editedPerson.value.Profit) {
    return editedPerson.value.Profit[0].Amount / 10;
  }
  return 0;
});

const profitColor: ComputedRef = computed((): string => {
  if (editedPerson.value.Profit) {
    return editedPerson.value.Profit[0].Color;
  }
  return "primary";
});
</script>

<style scoped>
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>