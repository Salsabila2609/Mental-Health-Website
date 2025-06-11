<template>
  <div class="container">
   
    <section class="hero" id="chat">
      <div class="hero-content">
        <h1>Chatbot Konseling</h1>
        <p class="hero-subtitle">Ngobrol dengan chatbot kami kapan saja</p>
        <p class="hero-description">Halaman utama berisi tampilan chat, input teks, kirim & reset.</p>
        <router-link to="/chat" class="cta-button">Mulai Konseling</router-link>
      </div>
    </section>

    <section class="features" id="articles">
      <h2>Artikel Kesehatan Mental</h2>
      <p class="features-subtitle">Artikel dan video bermanfaat berdasarkan kategori</p>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🧠</div>
          <h3>Daftar Artikel</h3>
          <p>Telusuri artikel dan video dengan ringkasan singkat.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📚</div>
          <h3>Detail Artikel</h3>
          <p>Baca artikel lengkap, tonton video, dan beri komentar.</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Filter Kategori</h3>
          <p>Pilih topik seperti stres, kecemasan, atau tidur.</p>
        </div>
      </div>
    </section>

    <section class="stats" id="mood">
      <h2>Mood Tracker</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">📆</div>
          <div class="stat-label">Input Harian</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">📊</div>
          <div class="stat-label">Riwayat Mood</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">💡</div>
          <div class="stat-label">Insight & Tips</div>
        </div>
      </div>
    </section>

    <section class="process" id="tests">
      <h2>Tes & Kuis Kesehatan Mental</h2>
      <div class="process-steps">
        <div class="process-step" data-step="1">
          <h3>Daftar Tes</h3>
          <p>Telusuri tes stres, kecemasan, depresi, dll.</p>
        </div>
        <div class="process-step" data-step="2">
          <h3>Detail Tes</h3>
          <p>Lihat petunjuk dan info sebelum mengerjakan tes.</p>
        </div>
        <div class="process-step" data-step="3">
          <h3>Isi Tes</h3>
          <p>Jawab pertanyaan satu per satu atau semua sekaligus.</p>
        </div>
        <div class="process-step" data-step="4">
          <h3>Hasil Tes</h3>
          <p>Lihat hasil tes dan rekomendasi lanjutannya.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>&copy; 2025 MindCare. Semua Hak Dilindungi.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomePage"
}
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #FFFEEC, #FFE3E2);
  color: #3C552D;
  padding: 0 20px;
}
.header {
  padding: 20px 0;
  background: rgba(255, 254, 236, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(60, 85, 45, 0.1);
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
}
.nav-links a {
  text-decoration: none;
  color: #3C552D;
  font-weight: 500;
}
.hero {
  padding: 80px 0;
  text-align: center;
}
.hero h1 {
  font-size: 3rem;
  background: linear-gradient(135deg, #3C552D, #C97372);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.cta-button {
  margin-top: 20px;
  display: inline-block;
  background: #86A788;
  color: white;
  padding: 10px 30px;
  border-radius: 30px;
  text-decoration: none;
}
.features, .stats, .process {
  padding: 60px 0;
}
.features-grid, .stats-grid, .process-steps {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.feature-card, .process-step {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.feature-icon, .stat-number {
  font-size: 2rem;
}
.footer {
  background: #3C552D;
  color: white;
  text-align: center;
  padding: 30px 0;
}
</style>