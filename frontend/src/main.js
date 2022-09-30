import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'


createApp(App).use(VueAxios, axios).use(router).use(ElementPlus).mount('#app')
