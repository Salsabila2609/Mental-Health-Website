<template>
  <div id="app">
    <!-- Floating Background Shapes -->
    <div class="floating-shapes">
      <div class="shape circle" style="width: 60px; height: 60px; top: 10%; left: 10%; animation-delay: 0s;"></div>
      <div class="shape triangle" style="top: 20%; right: 15%; animation-delay: 1s;"></div>
      <div class="shape square" style="width: 40px; height: 40px; bottom: 30%; left: 20%; animation-delay: 2s;"></div>
      <div class="shape circle" style="width: 80px; height: 80px; top: 60%; right: 10%; animation-delay: 3s;"></div>
      <div class="shape square" style="width: 30px; height: 30px; top: 40%; left: 50%; animation-delay: 4s;"></div>
    </div>

    <div class="container">
      <!-- Header -->
      <header class="header">
        <h1 class="logo">🌱 MindCare</h1>
        <p class="tagline">Platform Kesehatan Mental Terpercaya untuk Kesejahteraan Anda</p>
      </header>

      <!-- Hero Section -->
      <div class="hero-card">
        <div class="mood-section">
          <h2 class="mood-title">Bagaimana perasaan Anda hari ini?</h2>
          <div class="mood-selector">
            <button class="mood-btn" :class="{selected: selectedMood === 'happy'}" @click="selectMood('happy')">😊</button>
            <button class="mood-btn" :class="{selected: selectedMood === 'sad'}" @click="selectMood('sad')">😢</button>
            <button class="mood-btn" :class="{selected: selectedMood === 'angry'}" @click="selectMood('angry')">😠</button>
            <button class="mood-btn" :class="{selected: selectedMood === 'anxious'}" @click="selectMood('anxious')">😰</button>
            <button class="mood-btn" :class="{selected: selectedMood === 'calm'}" @click="selectMood('calm')">😌</button>
          </div>
          <p v-if="selectedMood" style="color: #3C552D; font-weight: bold;">
            {{ getMoodMessage(selectedMood) }}
          </p>
        </div>

        <div class="stats-section">
          <div class="stat-card">
            <span class="stat-number">{{ chatCount }}</span>
            <span class="stat-label">Percakapan Hari Ini</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ moodStreak }}</span>
            <span class="stat-label">Hari Tracking Mood</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ articlesRead }}</span>
            <span class="stat-label">Artikel Dibaca</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">{{ testsCompleted }}</span>
            <span class="stat-label">Tes Diselesaikan</span>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="features-grid">
        <!-- Chatbot Feature -->
        <div class="feature-card chatbot" @click="openChatbot">
          <span class="feature-icon">🤖</span>
          <h3 class="feature-title">Chatbot Konseling</h3>
          <p class="feature-desc">Bicara dengan AI counselor yang siap mendengarkan dan memberikan dukungan 24/7</p>

          <div class="chat-preview" v-if="showChatPreview">
            <div class="chat-message" v-for="message in chatMessages" :key="message.id" :class="message.type">
              <div class="message-bubble">{{ message.text }}</div>
            </div>
            <div class="chat-input-area">
              <input 
                type="text" 
                class="chat-input" 
                placeholder="Ketik pesan Anda..."
                v-model="newMessage"
                @keypress.enter="sendMessage"
              >
              <button class="send-btn" @click="sendMessage">📤</button>
            </div>
          </div>

          <button class="feature-btn" @click.stop="toggleChatPreview">
            {{ showChatPreview ? 'Tutup Chat' : 'Mulai Chat' }}
          </button>
        </div>

        <!-- Articles Feature -->
        <div class="feature-card articles" @click="openArticles">
          <span class="feature-icon">📚</span>
          <h3 class="feature-title">Artikel Kesehatan Mental</h3>
          <p class="feature-desc">Kumpulan artikel, tips, dan saran dari ahli untuk meningkatkan kesehatan mental Anda</p>
          <button class="feature-btn">Baca Artikel</button>
        </div>

        <!-- Mood Tracker Feature -->
        <div class="feature-card tracker" @click="openMoodTracker">
          <span class="feature-icon">📊</span>
          <h3 class="feature-title">Mood Tracker</h3>
          <p class="feature-desc">Lacak suasana hati harian Anda dan lihat pola emosi untuk pemahaman yang lebih baik</p>
          <button class="feature-btn">Mulai Tracking</button>
        </div>

        <!-- Tests Feature -->
        <div class="feature-card tests" @click="openTests">
          <span class="feature-icon">🧠</span>
          <h3 class="feature-title">Tes & Kuis</h3>
          <p class="feature-desc">Ikuti tes psikologi untuk memahami kondisi mental dan dapatkan rekomendasi personal</p>
          <button class="feature-btn">Mulai Tes</button>
        </div>
      </div>

      <!-- Footer -->
      <footer class="footer">
        <p>💚 MindCare - Kesehatan Mental adalah Prioritas</p>
        <p style="font-size: 0.9rem; margin-top: 10px; opacity: 0.8;">
          Layanan ini tidak menggantikan konsultasi dengan profesional kesehatan mental
        </p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      selectedMood: null,
      showChatPreview: false,
      newMessage: '',
      chatCount: 3,
      moodStreak: 7,
      articlesRead: 12,
      testsCompleted: 2,
      chatMessages: [
        { id: 1, text: 'Halo! Saya di sini untuk mendengarkan Anda. Bagaimana perasaan Anda hari ini?', type: 'message-bot' },
        { id: 2, text: 'Saya merasa sedikit cemas dengan pekerjaan', type: 'message-user' },
        { id: 3, text: 'Saya mengerti perasaan Anda. Kecemasan tentang pekerjaan adalah hal yang normal. Mau cerita lebih detail?', type: 'message-bot' }
      ]
    };
  },
  methods: {
    selectMood(mood) {
      this.selectedMood = mood;
    },
    getMoodMessage(mood) {
      const messages = {
        happy: 'Senang mendengar Anda merasa bahagia! 🌟',
        sad: 'Saya di sini untuk mendukung Anda 💙',
        angry: 'Mari kita bicarakan apa yang membuat Anda marah 🤗',
        anxious: 'Bernapas dalam-dalam, semuanya akan baik-baik saja 🌿',
        calm: 'Suasana hati yang tenang adalah hal yang indah 🕊️'
      };
      return messages[mood] || '';
    },
    toggleChatPreview() {
      this.showChatPreview = !this.showChatPreview;
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        this.chatMessages.push({
          id: Date.now(),
          text: this.newMessage,
          type: 'message-user'
        });

        setTimeout(() => {
          this.chatMessages.push({
            id: Date.now() + 1,
            text: 'Terima kasih telah berbagi. Saya memahami perasaan Anda.',
            type: 'message-bot'
          });
        }, 1000);

        this.newMessage = '';
        this.chatCount++;
      }
    },
    openChatbot() {
      alert('Membuka halaman Chatbot Konseling...');
    },
    openArticles() {
      alert('Membuka halaman Artikel Kesehatan Mental...');
    },
    openMoodTracker() {
      alert('Membuka halaman Mood Tracker...');
    },
    openTests() {
      alert('Membuka halaman Tes & Kuis...');
    }
  },
  mounted() {
    setInterval(() => {
      this.chatCount += Math.floor(Math.random() * 2);
    }, 10000);
  }
};
</script>

<style src="@/assets/MindCareStyles.css"></style>
