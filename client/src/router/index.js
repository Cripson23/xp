import Vue from "vue";
import VueRouter from "vue-router";
import Attractions from '../views/Attractions/Attractions';
import Auth from '../views/Auth/Auth';
import Register from '../views/Register/Register';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Attractions",
    component: Attractions,
  },
  {
    path: "/authorize",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
