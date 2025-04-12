<template>
    <aside class="w-35 bg-gray-900 text-white shadow-lg p-4 border-l border-gray-700">


        <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-white">Categorías</h2>

        </div>

        <ul class="space-y-2">
            <li class="cursor-pointer hover:text-gray-300"
                :class="{ 'font-semibold text-gray-400': categoriaSeleccionada === null }"
                @click="$emit('filtrar', null)">
                Ofertones
            </li>
            <li v-for="categoria in categorias" :key="categoria" class="cursor-pointer hover:text-gray-300"
                :class="{ 'font-semibold text-gray-400': categoriaSeleccionada === categoria }"
                @click="$emit('filtrar', categoria)">
                {{ categoria }}
            </li>
            <li>
                <button class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm relative"
                    @click="$emit('abrirCarrito')">
                    Carrito 🛒
                    <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2"
                        v-if="cantidadTotal > 0">
                        {{ cantidadTotal }}
                    </span>
                </button>
            </li>
        </ul>
    </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps({
    categorias: Array,
    categoriaSeleccionada: String
})

defineEmits(['filtrar', 'abrirCarrito'])

// Cart store
const cart = useCartStore()

const cantidadTotal = computed(() => cart.cantidadTotal)
</script>