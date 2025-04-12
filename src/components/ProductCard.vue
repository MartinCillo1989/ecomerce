<template>
    <div
      class="border rounded shadow p-4 bg-white transform transition duration-300 hover:scale-105 hover:shadow-lg"
    >
      <img :src="producto.imagen" class="w-full h-40 object-cover rounded mb-2" />
      <h2 class="text-lg font-semibold">{{ producto.nombre }}</h2>
      <p class="text-gray-600">{{ producto.descripcion }}</p>
      <p class="text-blue-600 font-bold mt-2">${{ producto.precio }}</p>
      <button @click="agregar" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Agregar al carrito
      </button>
    </div>
  </template>
  
  
  <script setup>
  import { useCartStore } from '../stores/cart'
  import { useToast } from 'vue-toastification'
  
  const props = defineProps({
    producto: Object
  })
  
  const cart = useCartStore()
  const toast = useToast()
  
  function agregar() {
    cart.agregarAlCarrito(props.producto)
    toast.success(`${props.producto.nombre} agregado al carrito 🛒`, {
      timeout: 2000,
      position: 'top-right',
    })
  }
  </script>
  