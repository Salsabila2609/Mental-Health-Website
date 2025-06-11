import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
import ChatbotPage from '../views/Chatbot.vue'
import ArtikelPage from '../views/Artikel.vue'
import MoodTrackerPage from '../views/MoodTracker.vue'
import KuisPage from '../views/Kuis.vue'
import ProfilPage from '../views/Profil.vue'
import LoginPage from '../views/Login.vue'
import RegisterPage from '../views/Register.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/chatbot', component: ChatbotPage },
  { path: '/artikel', component: ArtikelPage },
  { path: '/mood-tracker', component: MoodTrackerPage },
  { path: '/kuis', component: KuisPage },
  { path: '/profil', component: ProfilPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
