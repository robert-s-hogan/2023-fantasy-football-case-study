import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router"; // Import the Vue Router instance

const app = createApp(App);

// Create the Pinia instance
const pinia = createPinia();

// Use Pinia and Vue Router in the app
app.use(pinia);
app.use(router); // Use the router in the Vue app

// Mount the app to the DOM
app.mount("#app");
