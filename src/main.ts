import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);

// Create the Pinia instance
const pinia = createPinia();

// Use Pinia and Vue Router in the app
app.use(pinia);
app.use(router);

// Mount the app to the DOM
app.mount("#app");
