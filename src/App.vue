<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <router-view class="flex-1" />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
