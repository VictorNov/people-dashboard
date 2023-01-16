<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
        :="props"
        style="position: relative;"
    >
      <v-img
          class="rounded-lg"
          :src="editedPerson.Photo"
          :alt="editedPerson.Name"
          cover
          style="aspect-ratio: 16/9;"
      />
      <v-overlay
          :model-value="isHovering"
          contained
          class="d-flex align-center justify-center"
      >
        <v-row
            justify="center"
            style="gap: .5rem"
        >
          <v-btn
              icon
              :style="{
              transform: `translateY(${isHovering ? '0' : '120%'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
              icon
              :style="{
              transform: `translateY(${isHovering ? '0' : '120%'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
              @click="fileInput.click()"
          >
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-row>
      </v-overlay>
    </div>
  </v-hover>
  <v-file-input
      class="visually-hidden"
      ref="fileInput"
      v-model="editedPhoto"
      :clearable="false"
      accept="image/*"
  />
</template>

<script lang="ts" setup>
import {Person} from "~/types";
import {Ref} from "vue";

const props = defineProps<{
  editedPerson: Person;
}>();

const editedPhoto: Ref<File[] | null> = ref(null);
const fileInput: Ref<HTMLElement | null> = ref(null);

watch(editedPhoto, (newPhoto) => {
  if (newPhoto) {
    const reader = new FileReader();
    reader.readAsDataURL(newPhoto[0]);
    reader.onload = () => {
      props.editedPerson.Photo = reader.result as string;
    };
  }
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