import Vue from "vue";
import VueRouter from "vue-router";
import Attractions from '../views/Attractions/Attractions';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Attractions",
    component: Attractions,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
