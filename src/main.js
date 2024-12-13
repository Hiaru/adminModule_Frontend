import { createApp } from "vue";
import { markRaw } from 'vue'

import App from "./App.vue";
import router from "./router";

/**
 * PINIA
 */
import { createPinia } from 'pinia';
/**
 * USE PERSISTED STORE DATA
 */
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

/**
 * CREATE INSTANCE OF PINIA
 */
const pinia = createPinia();

/**
 * INJECT ROUTER INSTANCE INTO PINIA STORE
 */
pinia.use(({store}) => {
    store.router = markRaw(router)
});

/**
 * USE THE PERSISTED STATE PLUGIN FOR PINIA
 */
pinia.use(piniaPluginPersistedstate);

/**
 * AXIOS
 */
import axios from 'axios';

/**
 * AXIOS DEFAULT CONFIG
 */
window.axios = axios;
window.axios.defaults.baseURL = 'http://localhost:8000' //API BACKEND ROUTES
window.axios.defaults.headers.common['Accept'] = 'application/json'; //EXPECT JSON RESPONSE
window.axios.defaults.headers.common['Content-Type'] = 'application/json'; //REQUEST BODY IS IN JSON FORMAT
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; //REQUEST FROM JAVASCRIPT APPLICATIONS
window.axios.defaults.withCredentials = true; //ENABLE TO SEND COOKIES WITH CSRF FOR CROSS-ORIGIN REQUESTS

/**
 * BOOTSTRAP 5
 */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; //Este import ejecuta los Dropdown


createApp(App).use(pinia).use(router).mount("#app");
