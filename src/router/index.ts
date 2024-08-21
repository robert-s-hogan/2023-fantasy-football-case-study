// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RankingsCaseStudy from "@/views/RankingsCaseStudy.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/case-study",
    name: "CaseStudy",
    component: RankingsCaseStudy,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
