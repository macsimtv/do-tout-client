<script setup>

import { inject } from "vue";
import API from "../utils/api";

const { state, setStateProp } = inject("state");

defineProps({
  task: Object,
});

function getDateFormat(timestamp) {
    let tileDate = new Date(timestamp);
    return new Intl.DateTimeFormat('fr-FR').format(tileDate);
}

async function onDeleteTask(task) {
  let filterTasks = state.tasks.filter((item) => item._id != task._id);
  setStateProp("tasks", filterTasks);

  await API.deleteTask(task);
}

</script>

<template>
  <div class="tile">
    <div class="tile__container">
      <h4 class="tile__name">
        <span>></span>
        {{ task.name }}
      </h4>
      <p v-if="task.createdAt" class="tile__date">{{ getDateFormat(task.createdAt) }}</p>
    </div>
    <div class="tile__menu">
      <div class="tile__trash" @click="onDeleteTask(task)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
