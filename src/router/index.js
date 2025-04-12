import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Carrito from '../views/Carrito.vue' // Asegurate que este archivo exista

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/carrito',
    name: 'Carrito',
    component: Carrito,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
