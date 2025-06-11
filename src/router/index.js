import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChatbotPage from '../views/Chatbot.vue'
import ArtikelPage from '../views/Artikel.vue'
import MoodTrackerPage from '../views/MoodTracker.vue'
import KuisPage from '../views/Kuis.vue'
import DetailPage from '../views/DetailArtikel.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/chatbot', component: ChatbotPage },
  { path: '/artikel', component: ArtikelPage },
  { path: '/mood-tracker', component: MoodTrackerPage },
  { path: '/kuis', component: KuisPage },
  { path: '/detailartikel', component: DetailPage }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
