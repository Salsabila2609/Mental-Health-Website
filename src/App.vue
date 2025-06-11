<template>
  <div>
    <Navbar />
    <router-view />
 
  </div>
</template>

<script>
import HeroSection from './components/HeroSection.vue'
import MissionSection from './components/MissionSection.vue'
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar,
    HeroSection,
    MissionSection
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