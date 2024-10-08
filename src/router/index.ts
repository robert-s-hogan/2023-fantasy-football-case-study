import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import RankingsCaseStudy from "@/views/RankingsCaseStudy.vue";
import DraftPage from "@/views/DraftPage.vue"; // Import the new DraftPage view

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
  {
    path: "/draft", // Add the new draft route
    name: "Draft",
    component: DraftPage, // Reference the DraftPage component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
