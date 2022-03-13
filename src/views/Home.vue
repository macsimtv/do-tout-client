<script setup>
import { onMounted, inject, ref } from "vue";
import { useRouter } from "vue-router";
import API from "../utils/api";

const { state, setStateProp } = inject("state");

// Component
import Tile from "../components/Tile.vue";
import ModalAddTask from "../components/ModalAddTask.vue";

onMounted(async () => {
  setStateProp("loading", true);

  const tasksData = await API.getTasks();
  setStateProp("tasks", tasksData.data);
  const statesData = await API.getStates();
  setStateProp("states", statesData.data);

  setStateProp("loading", false);
});

const router = useRouter();

const isModalOpen = ref(false);
const isSidebarOpen = ref(false);

const getState = (stateItem) => {
  return state.tasks.filter((item) => item.state == stateItem);
};

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", item._id);
};

const onDrop = async (event, stateItem) => {
  const itemID = event.dataTransfer.getData("itemID");
  const item = state.tasks.find((item) => item._id == itemID);
  item.state = stateItem;

  await API.editTask({
    id: item._id,
    name: item.name,
    state: item.state,
  });
};

const reload = () => {
  window.location.reload();
};

const onAddTask = () => {
  isModalOpen.value = true;
};

const onCloseModal = () => {
  isModalOpen.value = false;
};

const onSidebarOpen = () => {
  isSidebarOpen.value = true;
};

const onSidebarClose = () => {
  isSidebarOpen.value = false;
}

const onLogout = () => {
  localStorage.clear();
  router.push({ name: 'Login' });
}

</script>

<template>
  <div class="home">
    <div class="home__container">
      <div class="home__sidebar" :class="{ active: isSidebarOpen }">
        <div class="home__title">
          <h1 class="home__title-heading">📚 Do-Tout.</h1>
          <div class="home__title-close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              @click="onSidebarClose"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>

        <ul class="home__menu">
          <li @click="reload">
            <router-link to="/"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span> Dashboard</span></router-link
            >
          </li>
          <li>
            <a href="#" @click.prevent="onLogout" to="/login"
              ><svg
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                /></svg
              ><span>Déconnexion</span></a
            >
          </li>
        </ul>
      </div>
      <div class="home__content">
        <div class="home__content__container" v-if="!state.loading">
          <div class="home__head">
            <div class="home__head-brand">
              <div class="home__head-burger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  @click="onSidebarOpen"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </div>
              <h3 class="home__page-title">Dashboard</h3>
            </div>
            <div class="home__head-menu">
              <div class="home__add-task" @click="onAddTask">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div class="home__columns">
            <div
              class="home__column"
              v-for="(col, index) in state.states"
              :key="index"
            >
              <h2
                class="home__column-title"
                :class="{
                  red: index == 0,
                  orange: index == 1,
                  green: index == 2,
                }"
              >
                {{ col }}
              </h2>
              <div
                class="home__column-body"
                @drop="onDrop($event, col)"
                @dragenter.prevent
                @dragover.prevent
              >
                <Tile
                  v-for="item in getState(col)"
                  :key="item._id"
                  draggable="true"
                  @dragstart="startDrag($event, item)"
                  :task="item"
                />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="home__loading">
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <transition name="fade">
      <ModalAddTask v-if="isModalOpen" @closeModal="onCloseModal" />
    </transition>
  </teleport>
</template>
