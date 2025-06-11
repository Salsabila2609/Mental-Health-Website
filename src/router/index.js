
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ChatbotPage from '../views/Chatbot.vue'
import ArtikelPage from '../views/Artikel.vue'
import MoodTrackerPage from '../views/MoodTracker.vue'
import DetailArtikel from '@/views/DetailArtikel.vue'

// Kuis
import KuisPage from '../views/Kuis.vue'
import SingleTestPage from '../views/kuis/SingleTestPage.vue'
import TestResultPage from '../views/kuis/TestResultPage.vue'

import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/chatbot',
    name: 'Chatbot',
    component: ChatbotPage
  },
  {
    path: '/artikel',
    name: 'Artikel',
    component: ArtikelPage
  },
  {
    path: '/mood-tracker',
    name: 'MoodTracker',
    component: MoodTrackerPage
  },
  {
    path: '/kuis',
    name: 'KuisOverview',
    component: KuisPage
  },

  // Route untuk Kuis
  {
    path: '/kuis/:testType',
    name: 'SingleTest',
    component: SingleTestPage,
    props: true
  },
  {
    path: '/kuis/:testType/hasil',
    name: 'TestResult',
    component: TestResultPage,
    props: true
  },
  {
    path: '/detailartikel',
    name: 'DetailArtikel',
    component: DetailArtikel,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router