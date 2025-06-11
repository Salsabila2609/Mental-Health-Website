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
  name: 'KuisPage',
  data() {
    return {
      tests: [
        { type: 'depresi', name: 'Tes Depresi', description: 'Jika Anda tidak yakin apakah Anda mengalami depresi, tes 5 menit kami dapat membantu mengevaluasi suasana hati Anda.', routePath: 'depresi' },
        { type: 'kecemasan', name: 'Tes Kecemasan', description: 'Cari tahu apakah kecemasan Anda bisa menjadi pertanda sesuatu yang lebih serius.', routePath: 'kecemasan' },
        { type: 'stres', name: 'Tes Stres', description: 'Identifikasi tingkat stres Anda dan dapatkan wawasan.', routePath: 'stres' },
        { type: 'burnout', name: 'Tes Burnout', description: 'Nilai risiko burnout Anda dan temukan cara untuk mengatasinya.', routePath: 'burnout' },
        { type: 'harga-diri', name: 'Tes Harga Diri', description: 'Evaluasi harga diri Anda dan bangun kepercayaan diri.', routePath: 'harga-diri' }
      ]
    };
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
  font-family: 'Arial', sans-serif;
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
  min-height: 100vh;
  color: #333;
}

.overview-header {
  text-align: center;
  margin-bottom: 50px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;
}

.overview-header h1 {
  font-size: 2.8em;
  color: #3C552D;
  margin-bottom: 15px;
}

.overview-header .subtitle {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 0;
  line-height: 1.6;
}

.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
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

@media (max-width: 768px) {
  .overview-header h1 {
    font-size: 2em;
  }
  .tests-grid {
    grid-template-columns: 1fr;
  }
  .test-card {
    margin: 0 auto;
    max-width: 400px;
  }
}
</style>