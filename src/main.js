
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './permission'
import { createApp } from 'vue'
import pinia from '@/stores/index.js'
import './assets/icon-font.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
