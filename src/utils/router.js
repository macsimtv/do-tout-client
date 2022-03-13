import { createRouter, createWebHistory } from 'vue-router'

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";

import Redirect from "../views/Redirect.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/404',
        name: 'Not Found',
        component: NotFound,
    },
    {
        path: '/:catchAll(.*)',
        name: 'Redirect',
        component: Redirect,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    if((to.name === 'Register' || to.name === 'Login') && localStorage['token']) return router.push({ name: 'Home' });

    if(to.name === 'Home' && !localStorage['token']) return router.push({ name: 'Login' });
});

export default router;
