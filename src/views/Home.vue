<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :categorias="categorias" :categoriaSeleccionada="categoriaSeleccionada" :carrito="carrito"
      @filtrar="seleccionarCategoria" @abrirCarrito="irAlCarrito" />



    <!-- Contenido principal -->
    <div class="flex-1 p-6">
      <!-- Buscador -->
      <div class="mb-6">
        <input v-model="busqueda" type="text" placeholder="Buscar productos..."
          class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300" />
      </div>
      <!-- Carousel -->
<div class="mb-8 relative w-full overflow-hidden rounded-lg shadow-lg">
  <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${indiceActual * 100}%)` }">
    <div v-for="(imagen, index) in imagenes" :key="index" class="w-full flex-shrink-0">
      <img :src="imagen" class="w-full h-64 object-cover rounded-lg" />
    </div>
  </div>

  <!-- Controles -->
  <button @click="anterior" class="absolute top-1/2 left-3 transform -translate-y-1/2 bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100">
    ◀
  </button>
  <button @click="siguiente" class="absolute top-1/2 right-3 transform -translate-y-1/2 bg-opacity-70 p-2 rounded-full shadow hover:bg-opacity-100">
    ▶
  </button>
</div>


      <!-- Título -->
      <h1 class="text-3xl font-bold mb-6 text-blue-800">
        {{ tituloCategoria }}
      </h1>



      <!-- Productos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ProductCard v-for="producto in productosFiltrados" :key="producto.id" :producto="producto"
          :class="mostrarOfertones ? 'border-4 border-yellow-400 rounded-xl shadow-lg' : ''" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import ProductCard from '../components/ProductCard.vue'
import productosData from '../data/productos'
import categoriasData from '../data/categorias'
import Carrito from '../views/Carrito.vue'
import { useRouter } from 'vue-router'


const router = useRouter()

const irAlCarrito = () => {
  router.push('/carrito')
}
const productos = ref(productosData)
const categorias = ref(categoriasData)

const busqueda = ref('')
const categoriaSeleccionada = ref(null)

// NUEVO: Estado del carrito
const carrito = ref([])

const seleccionarCategoria = (categoria) => {
  categoriaSeleccionada.value = categoria
}

// NUEVO: Evento cuando se presiona el botón del carrito
const mostrarCarrito = () => {
  console.log('Abrir carrito')
}

const tituloCategoria = computed(() => {
  if (busqueda.value.trim()) {
    return `🔎 Resultados para "${busqueda.value.trim()}"`
  }

  if (categoriaSeleccionada.value) {
    return `🛍️ ${categoriaSeleccionada.value.charAt(0).toUpperCase() + categoriaSeleccionada.value.slice(1)}`
  }

  return '🔥 Ofertones de la semana'
})



const imagenes = [
  '/src/img/baner6.png',
  '/src/img/baner6.png',
  '/src/img/baner6.png'
]

const indiceActual = ref(0)

const siguiente = () => {
  indiceActual.value = (indiceActual.value + 1) % imagenes.length
}

const anterior = () => {
  indiceActual.value =
    (indiceActual.value - 1 + imagenes.length) % imagenes.length
}


// Si no hay búsqueda ni categoría seleccionada, se muestran solo ofertones
const mostrarOfertones = computed(() => {
  return !busqueda.value && !categoriaSeleccionada.value
})

// Filtrado de productos
const productosFiltrados = computed(() => {
  return productos.value.filter(producto => {
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase())

    // Si hay búsqueda activa, solo importa la coincidencia de nombre
    if (busqueda.value.trim()) {
      return coincideBusqueda
    }

    // Si no hay búsqueda, filtrar por categoría o mostrar ofertones
    const coincideCategoria = !categoriaSeleccionada.value || producto.categoria === categoriaSeleccionada.value

    if (mostrarOfertones.value) {
      return producto.oferton === true
    }

    return coincideCategoria
  })
})


</script>
