import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CardPage from "@/components/CardPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "cards",
    component: CardPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
