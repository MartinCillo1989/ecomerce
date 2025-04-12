<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="w-full max-w-4xl bg-gray-200 shadow-xl rounded-lg p-6">
      <!-- Título -->
      <h1 class="text-3xl font-bold text-blue-800 mb-6">🛒 Carrito</h1>

      <!-- Botón volver -->
      <div class="mb-6 text-right">
        <button @click="volver" class="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Volver
        </button>
      </div>

      <!-- Carrito vacío -->
      <div v-if="cart.carrito.length === 0" class="text-gray-600 text-center text-lg">
        Tu carrito está vacío.
      </div>

      <!-- Carrito con productos -->
      <div v-else>
        <div v-for="producto in cart.carrito" :key="producto.id"
          class="flex items-center justify-between border-b py-4 rounded-md mb-5 bg-gray-300">
          <div>
            <img :src="producto.imagen" alt="Imagen del producto" class="w-16 h-16 object-cover rounded-md mr-4" />
            <h2 class="text-lg font-semibold">{{ producto.nombre }}</h2>
            <p class="text-gray-600">Precio unitario: ${{ producto.precio }}</p>

            <!-- Controles de cantidad -->
            <div class="flex items-center mt-2 space-x-2">
              <button @click="disminuirCantidad(producto)"
                class="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-400">−</button>

              <span class="px-3 font-semibold">{{ producto.cantidad }}</span>

              <button @click="aumentarCantidad(producto)"
                class="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-400">+</button>
            </div>

            <!-- Subtotal -->
            <p class="text-sm text-blue-600 font-semibold mt-2">
              Subtotal: ${{ producto.precio * producto.cantidad }}
            </p>
          </div>

          <button @click="cart.eliminarDelCarrito(producto.id)"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Eliminar
          </button>
        </div>

        <!-- Total -->
        <div class="mt-6 text-right text-xl font-bold text-blue-800">
          Total: ${{ totalCarrito }}
        </div>

        <!-- Confirmar -->
        <div class="mt-6">
          <button @click="enviarPorWhatsApp"
            class="w-full px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 text-lg">
            Confirmar pedido por WhatsApp 📲
          </button>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const cart = useCartStore()

function volver() {
  router.push('/')
}

function aumentarCantidad(producto) {
  producto.cantidad++
}

function disminuirCantidad(producto) {
  if (producto.cantidad > 1) {
    producto.cantidad--
  } else {
    cart.eliminarDelCarrito(producto.id)
  }
}

function confirmarPedido() {
  const confirmar = window.confirm('¿Estás seguro de confirmar el pedido?')
  if (confirmar) {
    // Aquí va el envío del pedido (por email o WhatsApp)
    alert('¡Pedido confirmado! 🚀')
  }
}

function enviarPorWhatsApp() {
  const numero = '5491123456789' // ← Reemplazá con tu número real (sin +)

  const mensaje = cart.carrito.map(p => `🧸 ${p.nombre} (x${p.cantidad}) - $${p.precio * p.cantidad}`).join('%0A') +
    `%0A%0A💵 Total: $${totalCarrito.value}`

  const url = `https://wa.me/${numero}?text=${mensaje}`

  // Abrir WhatsApp
  window.open(url, '_blank')

  // Vaciar el carrito después de enviar
  cart.carrito = []
}





// Total general del carrito
const totalCarrito = computed(() => {
  return cart.carrito.reduce((total, producto) => {
    return total + producto.precio * producto.cantidad
  }, 0)
})
</script>
