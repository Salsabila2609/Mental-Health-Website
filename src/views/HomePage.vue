<template>
  <div id="app">
  

 <!-- Hero / Landing Section -->
 <section class="landing-section">
  <div class="landing-content">
    <h1 class="landing-title">Kamu Tidak Akan Sendirian</h1>
    <p class="landing-subtitle">
      Lumora hadir untuk kamu yang sedang berjuang secara mental dan emosional.  
      Kami tahu tidak semua luka terlihat, dan tak semua rasa bisa dibagi dengan mudah.  
      Di sini, kamu bisa menemukan ruang aman untuk memahami perasaanmu,  
      mendapatkan dukungan yang tepat, dan mulai memulihkan diri—tanpa tekanan.  
      <br><br>
      Karena kamu berharga. Karena kamu layak untuk merasa lebih baik.
    </p>
    <button class="btn btn-landing" @click="scrollToMood">
      Mulai Perjalananmu
    </button>
  </div>
</section>

    <div class="container">
      <!-- Mood Quick Check -->
      <div class="mood-quick-check fade-in">
  <div class="mood-grid">
   

    <!-- Kanan: Konten teks -->
    <div class="mood-text">
      <h2>
        👋 Hai! Bagaimana perasaanmu hari ini?
      </h2>

      <div class="mood-emojis">
        <div
          v-for="mood in moods"
          :key="mood.id"
          class="mood-emoji"
          :class="{ selected: selectedMood === mood.id }"
          @click="selectMood(mood.id)"
          :title="mood.name"
        >
          {{ mood.emoji }}
        </div>
      </div>

      <div v-if="selectedMood" class="fade-in">
        <p class="mood-message">
          {{ getMoodMessage() }}
        </p>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: getMoodProgress() + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</div>


      <!-- Features Grid -->
      <div class="features-grid">
        <div class="feature-card chatbot-card fade-in" @click="openFeature('chatbot')">
          <div class="feature-icon">🤖</div>
          <h3>Chatbot Konseling</h3>
          <p>Berbicara dengan AI yang memahami perasaanmu. Dapatkan dukungan emosional kapan saja, 24/7.</p>
          <button class="btn"><span>Mulai Chat</span></button>
        </div>

        <div class="feature-card article-card fade-in" @click="openFeature('articles')">
          <div class="feature-icon">📚</div>
          <h3>Artikel Kesehatan Mental</h3>
          <p>Bacaan inspiratif dan edukatif tentang kesehatan mental, tips hidup sehat, dan motivasi harian.</p>
          <button class="btn"><span>Baca Artikel</span></button>
        </div>

        <div class="feature-card mood-card fade-in" @click="openFeature('mood')">
          <div class="feature-icon">📊</div>
          <h3>Mood Tracker</h3>
          <p>Lacak suasana hatimu setiap hari dan lihat perkembangan kesehatan mentalmu dari waktu ke waktu.</p>
          <button class="btn"><span>Lacak Mood</span></button>
        </div>

        <div class="feature-card test-card fade-in" @click="openFeature('tests')">
          <div class="feature-icon">🧠</div>
          <h3>Tes Kesehatan Mental</h3>
          <p>Kuis dan tes untuk mengetahui kondisi kesehatan mentalmu. Gratis dan hasil instan!</p>
          <button class="btn"><span>Mulai Tes</span></button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-section fade-in">
        <h2 style="color: #3C552D; margin-bottom: 20px;">
          🌟 Bergabung dengan Komunitas Sehat Mental
        </h2>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.users }}K+</div>
            <p>Pengguna Aktif</p>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.articles }}+</div>
            <p>Artikel Bermanfaat</p>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.sessions }}K+</div>
            <p>Sesi Konseling</p>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{ animatedStats.satisfaction }}%</div>
            <p>Tingkat Kepuasan</p>
          </div>
        </div>
      </div>
    </div>

  

    <!-- Notification -->
    <div class="notification-toast" :class="{ show: showToast }" v-if="notification.message">
      {{ notification.message }}
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner"></div>
  </div>
</template>

<script setup>

import { ref, reactive, onMounted } from 'vue';

const selectedMood = ref(null);
const loading = ref(false);
const showToast = ref(false);
const notification = reactive({ message: '', type: '' });

const moods = [
  { id: 1, emoji: '😢', name: 'Sedih' },
  { id: 2, emoji: '😔', name: 'Lesu' },
  { id: 3, emoji: '😐', name: 'Biasa' },
  { id: 4, emoji: '😊', name: 'Senang' },
  { id: 5, emoji: '😄', name: 'Sangat Senang' }
];

const hearts = ref([]);

const animatedStats = reactive({
  users: 0,
  articles: 0,
  sessions: 0,
  satisfaction: 0
});

const targetStats = {
  users: 150,
  articles: 500,
  sessions: 75,
  satisfaction: 98
};

function selectMood(moodId) {
  selectedMood.value = moodId;
  showNotificationMsg(`Mood ${moods.find(m => m.id === moodId).name} tersimpan!`, 'mood');
}

function getMoodMessage() {
  const messages = {
    1: "Tidak apa-apa merasa sedih. Mari kita cari cara untuk membuatmu merasa lebih baik 💚",
    2: "Hari yang berat ya? Yuk istirahat sejenak dan ambil napas dalam-dalam 🌱",
    3: "Hari yang cukup normal. Mungkin saatnya mencoba sesuatu yang menyenangkan? ✨",
    4: "Senang melihatmu bahagia! Terus jaga mood positif ini ya 🌈",
    5: "Wow! Hari yang luar biasa! Semoga kebahagiaan ini terus berlanjut 🎉"
  };
  return messages[selectedMood.value] || "";
}

function getMoodProgress() {
  return selectedMood.value * 20;
}
function scrollToMood() {
  const moodSection = document.querySelector('.mood-quick-check');
  if (moodSection) {
    moodSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function openFeature(feature) {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    const messages = {
      'chatbot': 'Membuka chatbot konseling...',
      'articles': 'Memuat artikel kesehatan mental...',
      'mood': 'Membuka mood tracker...',
      'tests': 'Mempersiapkan tes kesehatan mental...'
    };
    showNotificationMsg(messages[feature], feature);
  }, 1500);
}

function showNotificationMsg(message, type) {
  notification.message = message;
  notification.type = type;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
}

function generateHearts() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const heart = {
        id: Date.now() + Math.random(),
        style: {
          left: Math.random() * 100 + '%',
          animationDelay: Math.random() * 6 + 's',
          animationDuration: (6 + Math.random() * 4) + 's'
        }
      };
      hearts.value.push(heart);
      setTimeout(() => {
        hearts.value = hearts.value.filter(h => h.id !== heart.id);
      }, 10000);
    }, i * 500);
  }
  setTimeout(generateHearts, 10000);
}

function animateStats() {
  const duration = 2000;
  const interval = 50;
  const steps = duration / interval;
  let currentStep = 0;

  const timer = setInterval(() => {
    currentStep++;
    const progress = currentStep / steps;
    const ease = easeOutCubic(progress);
    animatedStats.users = Math.floor(targetStats.users * ease);
    animatedStats.articles = Math.floor(targetStats.articles * ease);
    animatedStats.sessions = Math.floor(targetStats.sessions * ease);
    animatedStats.satisfaction = Math.floor(targetStats.satisfaction * ease);

    if (currentStep >= steps) clearInterval(timer);
  }, interval);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function showWelcomeMessage() {
  setTimeout(() => {
    showNotificationMsg('Selamat datang di Lumora!', 'welcome');
  }, 1000);
}

onMounted(() => {
  generateHearts();
  animateStats();
  showWelcomeMessage();
});
</script>


<style scoped>
@import '@/assets/MentalHealthStyle.css';
</style>
