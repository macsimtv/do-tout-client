<script setup>
import { inject, ref } from "vue";
import API from "../utils/api";

const emit = defineEmits(["closeModal"]);
const { state, setStateProp } = inject("state");

function onCloseModal() {
  emit("closeModal");
}

const taskName = ref('');

async function onCreateTask() {

  if(taskName.value.length < 3) return; 

  const createdTask = await API.createTask(taskName.value);
  
  let taskArray = state.tasks;
  taskArray.push(createdTask.data);

  setStateProp("tasks", taskArray);

  onCloseModal();
}

</script>

<template>
  <div class="modal-add-task">
    <div class="modal-add-task__container">
      <div class="modal-add-task__content">
        <form class="modal-add-task__form" @submit.prevent="onCreateTask">
          <h3 class="modal-add-task__title">Créer une tâche</h3>
          <label class="modal-add-task__label" for="task-name"
            >Nom de la tâche</label
          >
          <input
            class="modal-add-task__input"
            id="task-name"
            type="text"
            placeholder="Exemple: Signer un document important"
            v-model="taskName"
          />
          <button class="modal-add-task__button">Créer la tache</button>
        </form>
      </div>
      <div class="modal-add-task__background" @click="onCloseModal"></div>
    </div>
  </div>
</template>
