import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 👈
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import './assets/main.css'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(router) 
app.use(Toast)

app.mount('#app')
