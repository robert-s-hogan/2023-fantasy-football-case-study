import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);

// Create the Pinia instance
const pinia = createPinia();

// Use Pinia in the app
app.use(pinia);

// Mount the app to the DOM
app.mount("#app");
