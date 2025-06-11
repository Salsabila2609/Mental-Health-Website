<template>
  <div class="kuis-overview-page">
    <div class="overview-header">
      <h1>Perubahan bisa dimulai dengan satu langkah</h1>
      <p class="subtitle">Tes kesehatan mental online kami dapat membantu Anda memahami perasaan Anda dan menjadi langkah pertama untuk mendapatkan bantuan yang tepat.</p>
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
  </div>
</template>

<script>
export default {
  name: 'KuisPage', // Nama komponen tetap KuisPage
  data() {
    return {
      tests: [
        { type: 'depresi', name: 'Tes Depresi', description: 'Jika Anda tidak yakin apakah Anda mengalami depresi, tes 5 menit kami dapat membantu mengevaluasi suasana hati Anda.', routePath: 'depresi' },
        { type: 'kecemasan', name: 'Tes Kecemasan', description: 'Cari tahu apakah kecemasan Anda bisa menjadi pertanda sesuatu yang lebih serius.', routePath: 'kecemasan' },
        { type: 'stres', name: 'Tes Stres', description: 'Identifikasi tingkat stres Anda dan dapatkan wawasan.', routePath: 'stres' },
        { type: 'burnout', name: 'Tes Burnout', description: 'Nilai risiko burnout Anda dan temukan cara untuk mengatasinya.', routePath: 'burnout' },
        { type: 'harga-diri', name: 'Tes Harga Diri', description: 'Evaluasi harga diri Anda dan bangun kepercayaan diri.', routePath: 'harga-diri' }
        // Tambahkan tes lainnya jika ada di masa depan
      ]
    };
  }
};
</script>

<style scoped>
/* Variabel Warna */
:root {
  --hijau-muda: #86A788;
  --cream: #FFFEEC;
  --pink-muda-bgt: #FFE3E2; /* Paling terang */
  --pink-muda: #FFCFCF;
  --hijau-tua: #3C552D;
  --pink: #C97372; /* Paling gelap */
}

.kuis-overview-page {
  font-family: 'Arial', sans-serif;
  padding: 40px 20px;
  max-width: 1200px; /* Lebar maksimum halaman keseluruhan */
  margin: 0 auto;
  background-color: var(--cream); /* Latar belakang halaman ikhtisar */
  min-height: 100vh;
  color: #333;
}

.overview-header {
  text-align: center;
  margin-bottom: 50px; /* Jarak bawah dari header */
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px; /* Menambahkan padding di bagian bawah header */
}

.overview-header h1 {
  font-size: 2.8em;
  color: var(--hijau-tua);
  margin-bottom: 15px;
}

.overview-header .subtitle {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 0; /* Menghilangkan margin bottom karena informasi dokter dihapus */
  line-height: 1.6;
}

/* Class .doctor-info telah dihapus karena elemennya tidak ada */

.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Tata letak grid responsif */
  gap: 30px; /* Jarak antar kartu */
}

.test-card {
  background-color: #FFFFFF; /* Latar belakang kartu putih */
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); /* Bayangan yang jelas */
  text-decoration: none; /* Hapus garis bawah dari router-link */
  color: #333;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* Pastikan konten tidak meluber */
  display: flex; /* Untuk menyusun konten di tengah vertikal jika diperlukan */
  flex-direction: column;
}

.test-card:hover {
  transform: translateY(-5px); /* Efek melayang saat hover */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-content {
  padding: 25px;
  text-align: center;
  flex-grow: 1; /* Agar konten mengisi ruang yang tersedia */
}

.card-content h2 {
  font-size: 1.5em;
  color: var(--pink); /* Judul kartu pink */
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
  background-color: var(--hijau-muda); /* Warna hijau muda */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none; /* Penting karena ini button di dalam router-link */
}

.start-test-button:hover {
  background-color: var(--hijau-tua); /* Warna hijau tua saat hover */
}

/* Media queries untuk tampilan responsif */
@media (max-width: 768px) {
  .overview-header h1 {
    font-size: 2em;
  }
  .tests-grid {
    grid-template-columns: 1fr; /* Satu kolom di layar kecil */
  }
  .test-card {
    margin: 0 auto; /* Tengah kartu */
    max-width: 400px;
  }
}
</style>