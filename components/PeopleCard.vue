<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
        :elevation="isHovering ? 6 : 2"
        v-bind="props"
    >
      <v-img
          :src="person.Photo"
          :alt="person.Name"
          aspect-ratio="16/9"
          cover
          style="aspect-ratio: 16/9; object-fit: cover;"
      />
      <div>
        <v-chip
          v-for="tag in person.Tags"
          :key="tag.Name"
          :color="`#${tag.Color}`"
          variant="elevated"
          label
        >{{ tag.Name }}</v-chip>
      </div>
      <v-card-title>
        {{ person.Name }}
      </v-card-title>
      <v-card-subtitle>
        {{ person.Title }}
      </v-card-subtitle>
      <v-divider />
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
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
import {ComputedRef} from "vue";

type Person = {
  Id: string;
  Name: string;
  Title: string;
  Photo: string;
  Tags?: { Name: string, Color: string }[];
  Attention?: { Amount: number, Color: string }[];
  Profit?: { Amount: number, Color: string }[];
}

const props = defineProps<{
  person: Person;
}>();

const profit: ComputedRef = computed(() => {
  if (props.person.Profit) {
    return props.person.Profit[0].Amount / 10;
  }
  return 0;
});
const profitColor: ComputedRef = computed(() => {
  if (props.person.Profit) {
    return props.person.Profit[0].Color;
  }
  return "primary";
});
</script>

<style scoped>

</style>