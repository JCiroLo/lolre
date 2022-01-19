import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../components/Pages/Home.vue";

const routes = [
  {
    path: "/:language?",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Pages/About.vue"),
  },
  {
    path: "/:language/champion/:champName",
    name: "Champion",
    component: () => import("../components/Pages/Champion/Champion.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
