<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import API from "../utils/api";

import MessageBox from "../components/MessageBox.vue";

const router = useRouter();

const identifier = ref("");
const password = ref("");
const isMessageBoxOpen = ref(false);
const textMessageBox = ref("");

onMounted(() => {
  let key = 'alert';
  textMessageBox.value = localStorage[key];

  if (textMessageBox.value) {
    setTimeout(() => {
      localStorage.removeItem(key);
      isMessageBoxOpen.value = true;
      setTimeout(() => {
        isMessageBoxOpen.value = false;
      }, 5000);
    }, 500);
  }
});

async function onSubmit() {
  const loginData = await API.login({
    identifier: identifier.value,
    password: password.value,
  });
  if (loginData.status >= 200 && loginData.status < 300) {
    localStorage["token"] = loginData.data.token;
    router.push({ name: "Home" });
  }
}
</script>

<template>
  <MessageBox :text="textMessageBox" :active="isMessageBoxOpen" />
  <main class="login">
    <div class="login__left">
      <div class="login__left__container">
        <div class="login__head">
          <h1 class="login__title">Welcome to Do-Tout.</h1>
          <p class="login__description">
            Organisez-vous d'une façon simple, grâce à un outil simple.
          </p>
        </div>
        <form class="login__form" @submit.prevent="onSubmit">
          <div class="login__form__group">
            <label class="login__label" for="email">Email</label>
            <input
              class="login__input"
              id="email"
              type="mail"
              v-model="identifier"
              placeholder="Entrez votre email."
              autocomplete
            />
          </div>
          <div class="login__form__group">
            <label class="login__label" for="password">Password</label>
            <input
              class="login__input"
              id="password"
              type="password"
              v-model="password"
              placeholder="•••••••"
              autocomplete
            />
          </div>

          <button class="login__button" type="submit">Connexion</button>
          <router-link to="register" class="login__method-swap">
            Pas encore de compte ?
          </router-link>
        </form>
      </div>
    </div>
    <div class="login__right">
      <img
        class="login__background"
        src="../assets/img/login-background.jpg"
        alt="Wallpaper to-do list"
      />
    </div>
  </main>
</template>
