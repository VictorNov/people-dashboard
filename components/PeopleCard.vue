<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
        class="people-card__wrapper"
        :class="{ 'people-card__wrapper--flip': isEditing }"
    >
      <v-card
          class="people-card people-card__front pb-4 rounded-lg"
          :elevation="isHovering ? 6 : 2"
          v-bind="props"
      >
        <v-img
            class="rounded-lg"
            :src="person.Photo"
            :alt="person.Name"
            aspect-ratio="16/9"
            cover
            style="aspect-ratio: 16/9; object-fit: cover;"
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
                color: textColor(tag.Color),
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
          <v-col>
            <v-card-title
                class="font-weight-bold pb-0"
                tag="h2"
            >
              {{ capitalizedName }}
            </v-card-title>
            <v-card-subtitle>
              {{ person.Title }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="4">
            <v-card-actions class="justify-end">
              <v-dialog
                  v-if="!isEditable"
                  v-model="showPopup"
                  max-width="400px"
              >
                <template #activator="{ props }">
                  <v-btn
                      icon
                      :style="{
                      transform: `translateX(${isHovering ? '0' : '120%'})`,
                      transition: 'transform 0.2s ease-in-out'
                    }"
                      v-bind="props"
                  >
                    <v-icon>mdi-loupe</v-icon>
                  </v-btn>
                </template>

                <people-card
                    :person="person"
                    isEditable="true"
                    @close="showPopup = false"
                />

                <v-btn
                    class="people-card__close-btn"
                    icon
                    density="compact"
                    @click="showPopup = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-dialog>

              <v-btn
                  v-else
                  icon
                  @click="isEditing = !isEditing"
              >
                <v-icon>mdi-account-edit</v-icon>
              </v-btn>
            </v-card-actions>
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
      </v-card>
      
      <v-card
          v-show="isEditable"
          class="people-card people-card__back people-card--edit pb-4 rounded-lg"
      >
        <v-img
            class="rounded-lg"
            :src="person.Photo"
            :alt="person.Name"
            aspect-ratio="16/9"
            cover
            style="aspect-ratio: 16/9; object-fit: cover;"
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
                color: textColor(tag.Color),
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
          <v-col>
            <v-card-title
                class="font-weight-bold pb-0"
                tag="h2"
            >
              {{ capitalizedName }}
            </v-card-title>
            <v-card-subtitle>
              {{ person.Title }}
            </v-card-subtitle>
          </v-col>
          <v-col cols="4">
            <v-card-actions class="justify-end">
              <v-btn
                  icon
                  @click="isEditing = !isEditing"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </v-card-actions>
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
      </v-card>
    </div>
  </v-hover>
</template>

<script setup lang="ts">
import {ComputedRef, Ref} from "vue";
import {Person} from "@/types";

const props = defineProps<{
  person: Person;
  isEditable?: boolean;
}>();

const showPopup: Ref = ref(false);
const isEditing: Ref = ref(false);

const capitalizedName = computed(() => {
  const [name, surname] = props.person.Name.split(' ');
  return `${name[0].toUpperCase()}${name.slice(1)} ${surname[0].toUpperCase()}${surname.slice(1)}`;
});

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

const overallAttention = computed((): number => {
  if (props.person.Attention) {
    return props.person.Attention.reduce((sum, current): number => sum + current.Amount, 0);
  }
  return 0;
});

const attentionBackgroundGradient = computed((): string => {
  let linearGradient: string = '';
  if (props.person.Attention) {
    let percentage: number = 0;
    linearGradient = props.person.Attention.reduce((acc, item, index, arr) => {
      const lastPercentage = percentage;
      percentage += item.Amount / overallAttention.value * 100;
      acc += `#${item.Color} ${lastPercentage}%, #${item.Color} ${percentage}%`;
      if (index !== arr.length - 1) {
        acc += ', ';
      }
      return acc;
    }, 'linear-gradient(to right, ');
    linearGradient += ')';
  }
  return linearGradient;
});

const textColor = (hexcolor: string): string => {
  const r: number = parseInt(hexcolor.substring(0, 2), 16);
  const g: number = parseInt(hexcolor.substring(2, 4), 16);
  const b: number = parseInt(hexcolor.substring(4, 6), 16);
  const yiq: number = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
};
</script>

<style scoped>
.people-card {
  position: relative;
  backface-visibility: hidden;
}

.people-card__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  perspective: 100px;
}

.people-card__wrapper--flip {
  transform: rotateY(180deg);
}

.people-card__back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
}

.people-card__tags {
  position: absolute;
  top: 1rem;
  right: -.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: .25rem;
}

.people-card__close-btn {
  position: absolute;
  top: 0;
  right: -1rem;
  z-index: 1;
  transform: translateX(100%);
}
</style>