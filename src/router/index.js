import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/HelloWorld.vue'
import About from '../components/AboutPage.vue'
import Mood from '../components/MoodInputPage.vue' // ini nanti kamu buat

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/mood', name: 'Mood Tracker', component: Mood }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
