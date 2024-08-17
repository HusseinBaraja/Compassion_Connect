// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router.js";
import * as Vue from "vue"; // in Vue 3
import axios from "axios";
import VueAxios from "vue-axios";

// Import components
import Card from "./components/Card.vue";
import NavBar from "./components/NavBar.vue";
import NavBarAdmin from "./components/NavBarAdmin.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App);

// Apply package
app.use(router);
app.use(VueAxios, axios);

// Apply components
app.component("NavBar", NavBar);
app.component("Card", Card);
app.component("NavBarAdmin", NavBarAdmin);
app.component('VueDatePicker', VueDatePicker);

// Gloabal Var
app.config.globalProperties.$api = "http://127.0.0.1:3001";

app.mount("#app");
