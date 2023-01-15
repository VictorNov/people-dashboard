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
        <people-card-info :person="person">
          <template #actions>
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
          </template>
        </people-card-info>
      </v-card>
      
      <v-card
          v-show="isEditable"
          class="people-card people-card__back pb-4 rounded-lg"
      >
        <people-card-edit :person="person">
          <template #actions>
            <v-card-actions
                class="d-flex justify-space-between"
                style="width: 100%;"
            >
              <v-btn
                  prepend-icon="mdi-arrow-left"
                  @click="isEditing = !isEditing"
              >
                Cancel
              </v-btn>
              <v-btn
                  prepend-icon="mdi-content-save"
                  @click="isEditing = !isEditing"
              >
                <!-- todo: to save edited content to server -->
                Save
              </v-btn>
            </v-card-actions>
          </template>
        </people-card-edit>
      </v-card>
    </div>
  </v-hover>
</template>

<script setup lang="ts">
import {Ref} from "vue";
import {Person} from "@/types";

defineProps<{
  person: Person;
  isEditable?: boolean;
}>();

const showPopup: Ref = ref(false);
const isEditing: Ref = ref(false);
</script>

<style lang="scss" scoped>
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
  top: 50%;
  left: 0;
  width: 100%;
  height: auto;
  max-height: 90vh;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transform: translateY(-50%) rotateY(180deg);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1rem;
  }
}

.people-card__close-btn {
  position: absolute;
  top: 0;
  right: -1rem;
  z-index: 1;
  transform: translateX(100%);
}
</style>