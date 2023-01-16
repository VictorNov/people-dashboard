<template>
  <v-img
      class="rounded-lg"
      :src="person.Photo"
      :alt="person.Name"
      cover
      style="aspect-ratio: 16/9;"
  />
  <div class="people-card__tags">
    <v-hover
        v-for="tag in person.Tags"
        :key="tag.Name"
        v-slot="{ isHovering, props }"
    >
      <v-chip
          :="props"
          :color="tag.Color"
          variant="elevated"
          density="compact"
          label
          :style="{
              color: useCalculateColor(tag.Color),
              transform: `translateX(${isHovering ? '-1rem' : '0'})`,
              transition: 'transform 0.2s ease-in-out'
            }"
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
            :color="`${profitColor}`"
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
        {{ overallAttention || 0 }} h
      </v-col>
      <v-col cols="12" class="py-0">
        <v-progress-linear
            :model-value="100"
            :bg-color="overallAttention ? 'transparent' : 'grey lighten-4'"
            color="transparent"
            height="20"
            rounded
            rounded-bar
            :style="{ background: attentionBackgroundGradient }"
        />
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script setup lang="ts">
import {ComputedRef} from "vue";
import {Person} from "@/types";

const props = defineProps<{
  person: Person;
  isEditable?: boolean;
}>();

const profit: ComputedRef = computed((): number => {
  if (props.person.Profit) {
    return props.person.Profit[0].Amount / 10;
  }
  return 0;
});

const profitColor: ComputedRef = computed((): string => {
  if (props.person.Profit) {
    return props.person.Profit[0].Color;
  }
  return "primary";
});

const overallAttention: ComputedRef = computed((): number => {
  if (props.person.Attention) {
    return props.person.Attention.reduce((sum, current): number => sum + current.Amount, 0);
  }
  return 0;
});

const attentionBackgroundGradient: ComputedRef = computed((): string => {
  let linearGradient: string = '';
  if (props.person.Attention) {
    let percentage: number = 0;
    linearGradient = props.person.Attention.reduce((acc, item, index, arr) => {
      const lastPercentage = percentage;
      percentage += item.Amount / overallAttention.value * 100;
      acc += `${item.Color} ${lastPercentage}%, ${item.Color} ${percentage}%`;
      if (index !== arr.length - 1) {
        acc += ', ';
      }
      return acc;
    }, 'linear-gradient(to right, ');
    linearGradient += ')';
  }
  return linearGradient;
});
</script>

<style scoped>
.people-card__tags {
  position: absolute;
  top: 1rem;
  right: -.8rem;
  display: flex;
  flex-direction: column;
  gap: .25rem;
  align-items: flex-end;
}
</style>