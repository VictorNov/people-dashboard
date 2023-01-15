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
  <v-card-text>
    <v-text-field
        v-model="editedPerson.Name"
        label="Name"
        variant="outlined"
    />
    <v-text-field
        v-model="editedPerson.Title"
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
      <v-dialog
          v-model="tag.dialog"
          max-width="290"
      >
        <template #activator="{ props }">
          <v-btn
              class="mx-2 my-2"
              icon
              :="props"
              :color="tag.Color"
              :text-color="useCalculateColor(tag.Color)"
              size="44"
          >
            <v-icon>mdi-eyedropper-variant</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Choose a color
          </v-card-title>
          <v-card-text>
            <v-color-picker
                mode="hex"
                v-model="tag.Color"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                icon
                @click="tag.dialog = false"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
          class="mx-2 my-2"
          v-model="tag.Name"
          label="Tag name"
          variant="outlined"
          density="compact"
          hide-details
      />
      <v-btn
          class="mx-2 my-2"
          icon
          size="44"
          @click="editedPerson.Tags.splice(index, 1)"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
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
      <v-col cols="12" class="d-flex align-center">
        <v-dialog
            v-model="editedPerson.Profit[0].dialog"
            max-width="290"
        >
          <template #activator="{ props }">
            <v-btn
                icon
                :="props"
                :color="editedPerson.Profit[0].Color"
                :text-color="useCalculateColor(editedPerson.Profit[0].Color)"
                size="44"
            >
              <v-icon>mdi-eyedropper-variant</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Choose a color
            </v-card-title>
            <v-card-text>
              <v-color-picker
                  mode="hex"
                  v-model="editedPerson.Profit[0].Color"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                  icon
                  @click="editedPerson.Profit[0].dialog = false"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-text-field
            class="ml-2"
            v-model="editedPerson.Profit[0].Amount"
            label="Profit"
            variant="outlined"
            density="compact"
            hide-details
            prefix="+"
            suffix="$"
            type="number"
            :max="1000"
            :min="0"
            @update:modelValue="editedPerson.Profit[0].Amount = Math.min(1000, Math.max(0, editedPerson.Profit[0].Amount))"
        />
      </v-col>
      <v-col cols="12">
        <v-progress-linear
            :model-value="editedPerson.Profit[0].Amount / 10"
            :color="editedPerson.Profit[0].Color"
            bg-color="grey lighten-4"
            height="20"
            rounded
            rounded-bar
            clickable
            @update:modelValue="editedPerson.Profit[0].Amount = $event * 10"
        />
      </v-col>
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
      <v-col cols="12" class="d-flex align-center">
        <v-dialog
            v-model="attention.dialog"
            max-width="290"
        >
          <template #activator="{ props }">
            <v-btn
                icon
                :="props"
                :color="attention.Color"
                :text-color="useCalculateColor(attention.Color)"
                size="44"
            >
              <v-icon>mdi-eyedropper-variant</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              Choose a color
            </v-card-title>
            <v-card-text>
              <v-color-picker
                  mode="hex"
                  v-model="attention.Color"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                  icon
                  @click="attention.dialog = false"
              >
                <v-icon>mdi-check</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-text-field
            class="ml-2"
            v-model="attention.Amount"
            label="Attention"
            variant="outlined"
            density="compact"
            hide-details
            suffix="h"
            type="number"
            :min="0"
            :max="100"
            @update:modelValue="attention.Amount = Math.min(100, Math.max(0, attention.Amount))"
        />
        <v-btn
            class="mx-2 my-2"
            icon
            size="44"
            @click="editedPerson.Attention.splice(index, 1)"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-progress-linear
            :model-value="attention.Amount"
            :color="attention.Color"
            bg-color="grey lighten-4"
            height="20"
            rounded
            rounded-bar
            clickable
            @update:modelValue="attention.Amount = $event"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="mx-2 my-2"
          text
          @click="editedPerson.Attention.push({ Name: '', Color: '#ffffff', dialog: true })"
      >
        <v-icon>mdi-plus</v-icon> Add attention
      </v-btn>
    </v-row>
    <v-row class="mt-6">
      <v-divider/>
      <slot name="actions"/>
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

const editedPerson = ref<Person>(JSON.parse(JSON.stringify(props.person)));
const editedPhoto: Ref<File[] | null> = ref(null);
const fileInput: Ref<HTMLElement | null> = ref(null);

editedPerson.value.Tags?.forEach((tag) => {
  tag.dialog = false;
  if (!tag.Color.startsWith('#')) {
    tag.Color = `#${tag.Color}`;
  }
});
editedPerson.value.Profit?.forEach((profit) => {
  profit.dialog = false;
  if (!profit.Color.startsWith('#')) {
    profit.Color = `#${profit.Color}`;
  }
});
editedPerson.value.Attention?.forEach((attention) => {
  attention.dialog = false;
  if (!attention.Color.startsWith('#')) {
    attention.Color = `#${attention.Color}`;
  }
});

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