<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import API from "../utils/api";

const router = useRouter();

const identifier = ref("");
const password = ref("");

async function onSubmit() {
  const registerData = await API.register({
    identifier: identifier.value,
    password: password.value,
  });
  if (registerData.status >= 200 && registerData.status < 300) {
    localStorage['alert'] = "Inscription réussis !";
    router.push({ name: "Login" })
  }
}
</script>

<template>
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
              placeholder="Entrez un email."
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
              placeholder='•••••••'
              autocomplete
            />
          </div>

          <button class="login__button" type="submit">Inscription</button>
          <router-link to="login" class="login__method-swap">
            Tu as déjà un compte ? (trop bien !)
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
