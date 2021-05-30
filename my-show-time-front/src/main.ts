import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

axios.defaults.baseURL = "http://localhost:3000/concerts"
store.dispatch('auth/attempt', localStorage.getItem('token'))

createApp(App).use(store).use(router).use(Toast).mount('#app')
