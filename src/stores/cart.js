import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const carrito = ref([])

  function agregarAlCarrito(producto) {
    const existente = carrito.value.find(p => p.id === producto.id)
    if (existente) {
      existente.cantidad += 1
    } else {
      carrito.value.push({ ...producto, cantidad: 1 })
    }
  }

  function eliminarDelCarrito(productoId) {
    carrito.value = carrito.value.filter(p => p.id !== productoId)
  }

  return { carrito, agregarAlCarrito, eliminarDelCarrito }
})
