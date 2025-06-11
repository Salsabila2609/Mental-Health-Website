<template>
  <div class="kuis-overview-page">
    <div class="overview-hero-section">
      <div class="background-overlay"></div>
      <div class="hero-content">
        <h1>Perubahan bisa dimulai dengan satu langkah</h1>
        <p class="subtitle">Tes kesehatan mental online kami dapat membantu Anda memahami perasaan Anda dan menjadi langkah pertama untuk mendapatkan bantuan yang tepat.</p>
      </div>
    </div>

    <div class="test-benefits-section">
      <h2>Mengapa Melakukan Tes Kesehatan Mental Ini?</h2>
      <p class="benefits-description">
        Tes-tes ini dirancang sebagai alat bantu awal untuk memahami diri Anda lebih baik. Dengan menjawab pertanyaan-pertanyaan ini, Anda dapat mulai mengidentifikasi pola pikir atau perasaan yang mungkin memerlukan perhatian. Ini adalah langkah proaktif menuju kesehatan mental yang lebih baik.
      </p>
      <div class="benefits-icon-grid">
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">🗣️</span>
          </div>
          <h3>Berbicara dengan Penasihat</h3>
          <p>Dapatkan panduan dari penasihat klinis berpengalaman dalam hitungan menit.</p>
        </div>
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">📅</span>
          </div>
          <h3>Fleksibilitas Janji Temu</h3>
          <p>Pilih antara janji temu virtual atau tatap muka sesuai kenyamanan Anda.</p>
        </div>
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">🤝</span>
          </div>
          <h3>Spesialis yang Tepat</h3>
          <p>Spesialis kami dicocokkan dengan cermat sesuai kebutuhan individu Anda.</p>
        </div>
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">📈</span>
          </div>
          <h3>Dukungan Berkelanjutan</h3>
          <p>Dukungan berkelanjutan dari panggilan pertama Anda hingga seterusnya.</p>
        </div>
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">📍</span>
          </div>
          <h3>Klinik di Seluruh Area</h3>
          <p>Akses klinik tatap muka di seluruh wilayah untuk kemudahan Anda.</p>
        </div>
        <div class="benefit-item-icon">
          <div class="icon-circle">
            <span class="icon-placeholder">✨</span>
          </div>
          <h3>Transparan & Aksesibel</h3>
          <p>Layanan yang transparan, mudah diakses, dan selalu sesuai keinginan Anda.</p>
        </div>
      </div>
    </div>

    <div class="tests-grid">
      <router-link
        v-for="test in tests"
        :key="test.type"
        :to="`/kuis/${test.routePath}`"
        class="test-card"
      >
        <div class="card-content">
          <h2>{{ test.name }}</h2>
          <p>{{ test.description }}</p>
          <button class="start-test-button">Mulai Tes</button>
        </div>
      </router-link>
    </div>

    <div class="faq-section">
      <h2>Pertanyaan yang Sering Diajukan</h2>
      <div class="faq-list">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <span class="faq-icon">{{ faq.open ? '-' : '+' }}</span>
          </div>
          <div v-if="faq.open" class="faq-answer">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="fab-container">
      <button
        @click="scrollToTop"
        class="fab-button"
        :class="{ 'visible': showBackToTopButton }"
      >
        ↑
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KuisPage',
  data() {
    return {
      tests: [
        { type: 'depresi', name: 'Tes Depresi', description: 'Jika Anda tidak yakin apakah Anda mengalami depresi, tes 5 menit kami dapat membantu mengevaluasi suasana hati Anda.', routePath: 'depresi' },
        { type: 'kecemasan', name: 'Tes Kecemasan', description: 'Cari tahu apakah kecemasan Anda bisa menjadi pertanda sesuatu yang lebih serius.', routePath: 'kecemasan' },
        { type: 'stres', name: 'Tes Stres', description: 'Identifikasi tingkat stres Anda dan dapatkan wawasan.', routePath: 'stres' },
        { type: 'burnout', name: 'Tes Burnout', description: 'Nilai risiko burnout Anda dan temukan cara untuk mengatasinya.', routePath: 'burnout' },
        { type: 'harga-diri', name: 'Tes Harga Diri', description: 'Evaluasi harga diri Anda dan bangun kepercayaan diri.', routePath: 'harga-diri' }
      ],
      faqs: [
        { question: 'Apakah hasil tes ini merupakan diagnosis medis?', answer: 'Tidak, hasil tes ini hanyalah alat bantu awal dan tidak dapat menggantikan diagnosis profesional. Untuk diagnosis yang akurat dan rencana perawatan, Anda harus berkonsultasi dengan psikolog atau psikiater.', open: false },
        { question: 'Bagaimana privasi data saya dijamin?', answer: 'Jawaban tes Anda bersifat rahasia dan tidak disimpan bersama informasi identitas pribadi pribadi Anda. Kami hanya menggunakan data agregat untuk tujuan analisis dan peningkatan kualitas layanan.', open: false },
        { question: 'Apakah saya bisa mengulang tes yang sama?', answer: 'Ya, Anda dapat mengulang tes kapan saja untuk memantau perubahan kondisi Anda dari waktu ke waktu.', open: false },
        { question: 'Apa yang harus saya lakukan setelah mendapatkan hasil tes?', answer: 'Berdasarkan hasil tes, kami akan memberikan interpretasi dan rekomendasi awal. Jika hasil mengindikasikan kebutuhan akan dukungan lebih lanjut, kami sangat menyarankan Anda untuk mencari bantuan dari profesional kesehatan mental.', open: false },
        { question: 'Apakah tes ini gratis?', answer: 'Ya, semua tes kesehatan mental yang kami sediakan adalah gratis dan dapat diakses kapan saja.', open: false }
      ],
      // Menggunakan nama yang sama dengan halaman artikel untuk konsistensi
      showBackToTopButton: false 
    };
  },
  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    // Mengubah handleScroll untuk menggunakan pageYOffset seperti di halaman artikel
    handleScroll() {
      // Sesuaikan nilai 300px jika Anda ingin tombol muncul lebih cepat/lambat
      this.showBackToTopButton = window.pageYOffset > 300; 
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  },
  mounted() {
    // Tambahkan event listener saat komponen dipasang
    window.addEventListener('scroll', this.handleScroll);
    // Panggil sekali saat dimuat untuk mengatur status awal tombol
    this.handleScroll();
  },
  beforeUnmount() {
    // Hapus event listener saat komponen akan dilepas
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
/* Hex Codes */
/* Hijau Muda: #86A788 */
/* Cream: #FFFEEC */
/* Pink Muda Banget: #FFE3E2 */
/* Pink Muda: #FFCFCF */
/* Hijau Tua: #3C552D */
/* Pink: #C97372 */

.kuis-overview-page {
  padding: 0;
  width: 100%;
  margin: 0 auto;
  background-color: transparent;
  min-height: 100vh;
  color: #333;
  /* Font family dan background-animation dari halaman artikel bisa ditambahkan di sini
     jika Anda ingin konsistensi visual penuh. Untuk saat ini, saya hanya fokus pada FAB. */
  font-family: 'Poppins', sans-serif; /* Menambahkan font Poppins untuk konsistensi */
  position: relative; /* Penting untuk z-index FAB */
  overflow-x: hidden; /* Mencegah scrollbar horizontal */
}

/* Bagian Hero Section (Header Baru - Gambar sebagai Background Penuh) */
/* Ini adalah gaya DEFAULT untuk DESKTOP dan LAYAR MENENGAH (> 768px) */
.overview-hero-section {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 600px; /* Tinggi gambar */
  padding: 80px 40px;
  color: white;
  width: 100%;
  box-sizing: border-box;

  background-image: url('../assets/header-mental-test-photo.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #3C552D; /* Fallback color */

  transform: scaleX(-1);
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Gradien ini sekarang menjadi default untuk desktop dan layar menengah.
     Lebih gelap dan meluas untuk memastikan teks terbaca di area terang. */
  background: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.9) 0%, /* Sangat gelap di kiri */
    rgba(0, 0, 0, 0.7) 45%, /* Gelap hingga 45% */
    rgba(0, 0, 0, 0.2) 80%, /* Mulai transparan di 80%, fading out slowly */
    rgba(0, 0, 0, 0.0) 100%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  /* Max-width dan padding-right ini adalah default untuk desktop dan layar menengah.
     Ini akan menjaga teks tetap di area yang lebih gelap. */
  max-width: 600px;
  text-align: left;
  padding-right: 20px; /* Memberikan ruang tambahan di sisi kanan teks */
  margin-right: 0px;
  transform: scaleX(-1);
}

.hero-content h1 {
  /* Ukuran font ini adalah default untuk desktop dan layar menengah. */
  font-size: 2.8em; /* Disesuaikan agar lebih mirip dengan artikel */
  color: #FFFFFF;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-content .subtitle {
  /* Ukuran font ini adalah default untuk desktop dan layar menengah. */
  font-size: 1.2em; /* Disesuaikan agar lebih mirip dengan artikel */
  color: #e0e0e0;
  margin-bottom: 30px;
  line-height: 1.5;
}

.test-benefits-section {
  text-align: center;
  margin-bottom: 50px;
  padding: 40px 0;
  background-color: #FFFFFF;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
}

.test-benefits-section h2 {
  font-size: 2em;
  color: #3C552D;
  margin-bottom: 25px;
}

.benefits-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.benefits-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.benefit-item-icon {
  text-align: center;
  background-color: transparent;
}

.icon-circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #C97372;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px auto;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.icon-circle:hover {
  background-color: #FFCFCF;
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
}

.icon-placeholder {
  font-size: 3em;
  color: #FFFFFF;
}

.benefit-item-icon h3 {
  font-size: 1.3em;
  color: #3C552D;
  margin-bottom: 10px;
}

.benefit-item-icon p {
  font-size: 0.95em;
  line-height: 1.5;
  color: #666;
}

.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.test-card {
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.test-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 25px;
  text-align: center;
  flex-grow: 1;
}

.card-content h2 {
  font-size: 1.5em;
  color: #C97372;
  margin-bottom: 15px;
}

.card-content p {
  font-size: 0.95em;
  line-height: 1.5;
  color: #666;
  margin-bottom: 25px;
}

.start-test-button {
  display: inline-block;
  padding: 12px 25px;
  background-color: #86A788;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
}

.start-test-button:hover {
  background-color: #3C552D;
}

.faq-section {
  text-align: center;
  padding: 40px 20px;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 40px;
}

.faq-section h2 {
  font-size: 2em;
  color: #C97372;
  margin-bottom: 30px;
}

.faq-list {
  text-align: left;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.faq-item {
  background-color: #FFFEEC;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.faq-item:hover {
  background-color: #FFE3E2;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #3C552D;
  font-size: 1.15em;
  margin-bottom: 0;
}

.faq-question h3 {
  margin: 0;
  flex-grow: 1;
}

.faq-icon {
  font-size: 1.5em;
  color: #C97372;
  margin-left: 15px;
  transition: transform 0.2s ease;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  padding-top: 15px;
  font-size: 0.95em;
  line-height: 1.6;
  color: #666;
  border-top: 1px solid #eee;
  margin-top: 15px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, border-top 0.3s ease-out;
}

.faq-item.open .faq-answer {
  max-height: 200px;
  padding-top: 15px;
  border-top: 1px solid #ddd;
}

/* Floating Action Button (FAB) - Meniru gaya dari halaman Artikel */
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100; /* Pastikan di atas elemen lain */
}

.fab-button {
  width: 3.5rem;
  height: 3.5rem;
  background: #3C552D; /* Warna hijau tua dari palet Anda */
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(60, 85, 45, 0.4); /* Menggunakan shadow dari artikel */
  transition: all 0.3s ease;
  opacity: 0; /* Dimulai tersembunyi */
  transform: translateY(100px); /* Dimulai dari bawah layar */
  font-family: 'Poppins', sans-serif; /* Konsisten dengan artikel */
}

.fab-button.visible {
  opacity: 1; /* Menjadi terlihat */
  transform: translateY(0); /* Meluncur ke posisi */
}

.fab-button:hover {
  background: #86A788; /* Warna hijau muda saat di-hover */
  transform: scale(1.1); /* Sedikit membesar */
  box-shadow: 0 6px 20px rgba(134, 167, 136, 0.6); /* Shadow yang lebih besar */
}

.fab-button:active {
  transform: scale(0.95); /* Sedikit mengecil saat ditekan */
}

/* Responsive Design */
@media (max-width: 768px) {
  .overview-hero-section {
    flex-direction: column;
    padding: 60px 20px;
    min-height: auto;
  }
  .background-overlay { /* --- OVERLAY MOBILE: SOLID --- */
    background: rgba(0, 0, 0, 0.6); /* Warna solid gelap */
  }
  .hero-content {
    text-align: center;
    padding-right: 0; /* Hapus padding kanan yang ada di desktop */
    margin-bottom: 30px;
    padding-left: 0;
    max-width: 100%; /* Untuk mobile, konten hero bisa mengambil lebar penuh */
    transform: scaleX(-1);
    text-shadow: none; /* Hapus text-shadow di mobile jika tidak cocok */
  }
  .hero-content h1 {
    font-size: 2.5em;
  }
  .hero-content .subtitle {
    font-size: 1.1em;
  }
  /* Bagian .overview-header h1 dan .overview-header dihapus karena tidak ada di HTML Anda */
  /*
  .overview-header h1 {
    font-size: 2em;
  }
  .overview-header {
    padding: 30px 15px 20px;
  }
  */
  .test-benefits-section {
    padding: 30px 0;
    border-radius: 0;
    box-shadow: none;
  }
  .test-benefits-section h2, .faq-section h2 {
    font-size: 1.8em;
  }
  .benefits-description {
    padding: 0 15px;
  }
  .benefits-icon-grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  .tests-grid {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
  .test-card {
    margin: 0 auto;
    max-width: 400px;
  }
  .faq-section {
    padding: 30px 15px;
    max-width: 100%;
    border-radius: 0;
    box-shadow: none;
  }
  .faq-list {
    max-width: 100%;
  }
  .faq-item {
    padding: 15px;
  }
  .faq-item h3 {
    font-size: 1em;
  }
  .faq-question .faq-icon {
    font-size: 1.2em;
  }

  /* FAB untuk Mobile */
  .fab-container {
    bottom: 1rem; /* Sedikit lebih ke atas untuk mobile */
    right: 1rem; /* Sedikit lebih ke kiri untuk mobile */
  }
  .fab-button {
    width: 3rem; /* Sedikit lebih kecil untuk mobile */
    height: 3rem;
    font-size: 1.2rem; /* Ukuran panah lebih kecil */
  }
}

/* Memastikan semua elemen interaktif memiliki transisi halus */
button, input, a, .test-card, .faq-item, .benefit-item-icon .icon-circle {
  transition: all 0.3s ease;
}

/* Tambahan: Focus states for accessibility */
.start-test-button:focus,
.faq-item:focus,
.test-card:focus,
.fab-button:focus {
  outline: 2px solid #C97372; /* Warna pink sebagai outline */
  outline-offset: 2px;
}
</style>