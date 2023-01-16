<template>
  <v-col cols="12">
    <v-row>
      <v-dialog
          v-model="data.dialog"
          max-width="290"
      >
        <template #activator="{ props }">
          <v-btn
              class="mx-2 my-2"
              :="props"
              :color="data.Color"
              size="44"
              icon
          >
            <v-icon :color="useCalculateColor(data.Color)">
              mdi-eyedropper-variant
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            Choose a color
          </v-card-title>
          <v-card-text>
            <v-color-picker
                mode="hex"
                v-model="data.Color"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
                icon
                @click="data.dialog = false"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
          v-if="type === 'tag'"
          class="mx-2 my-2"
          v-model="data.Name"
          :label="label"
          :prefix="prefix"
          :suffix="suffix"
          variant="outlined"
          density="compact"
          hide-details
      />
      <v-text-field
          v-else
          class="mx-2 my-2"
          v-model="data.Amount"
          :label="label"
          :prefix="prefix"
          :suffix="suffix"
          variant="outlined"
          density="compact"
          hide-details
      />
      <v-btn
          v-if="type !== 'profit'"
          class="mx-2 my-2"
          icon
          size="44"
          @click="handleDelete"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </v-row>
  </v-col>
  <v-col
      v-if="type !== 'tag'"
      cols="12"
  >
    <v-progress-linear
        :model-value="progress"
        :color="data.Color"
        bg-color="grey lighten-4"
        height="20"
        rounded
        rounded-bar
        clickable
        @update:modelValue="changeProgress($event)"
    />
  </v-col>
</template>

<script lang="ts" setup>
import {ComputedRef} from "vue";
import {useCapitalize} from "~/composables/useCapitalize";

const props = defineProps<{
  data: { Amount?: number, Name?: string, Color: string, dialog?: boolean };
  type: 'tag' | 'attention' | 'profit';
}>();

const emits = defineEmits(['deleteData']);

const label: ComputedRef = computed(() => {
  if (props.type === 'tag') return 'Tag name';
  return useCapitalize(props.type);
})

const prefix: ComputedRef = computed(() => props.type === 'profit' ? '+' : '');
const suffix: ComputedRef = computed(() => (
    (props.type === 'profit' && '$')
    || (props.type === 'attention' && 'h')
    || ''
));
const progress: ComputedRef = computed(() => {
  if (props.type === 'profit' && props.data.Amount) return props.data.Amount / 10;
  return props.data.Amount;
})

function changeProgress(value: number) {
  if (props.type === 'profit') {
    props.data.Amount = value * 10;
  } else {
    props.data.Amount = value;
  }
}

function handleDelete() {
  emits('deleteData');
}
</script>