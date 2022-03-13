<script setup>
import { ref } from "vue";

defineProps({
  text: {
    type: String,
    default: "Undefined Message !",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="active" class="message-box">
        <div class="message-box__container">
          <div class="message-box__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="message-box__text">
              {{ text }}
          </p>
        </div>
      </div>
    </transition>
  </teleport>
</template>
