<template>
  <div>
    <Navbar />
    <router-view />
 
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar,
  
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  background-color: #f9f4ed;
}
</style>