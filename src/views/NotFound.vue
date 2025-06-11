<template>
  <div class="not-found-page">
    <div class="not-found-content">
      <h1>404</h1>
      <h2>Halaman Tidak Ditemukan</h2>
      <p>Maaf, halaman yang Anda cari tidak ada. Mungkin URL-nya salah atau halaman telah dipindahkan.</p>
      <router-link to="/" class="home-button">Kembali ke Halaman Utama</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
/* Hex Codes (Pastikan ini sesuai dengan palet Anda) */
/* Hijau Muda: #86A788 */
/* Cream: #FFFEEC */
/* Pink Muda Banget: #FFE3E2 */
/* Pink Muda: #FFCFCF */
/* Hijau Tua: #3C552D */
/* Pink: #C97372 */

.not-found-page {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background: linear-gradient(to bottom, #FFE3E2 0%, #FFFEEC 100%);
  color: #333;
}

.not-found-content {
  background-color: #FFFFFF;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
}

.not-found-content h1 {
  font-size: 6em;
  margin-bottom: 10px;
  color: #C97372;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.1);
}

.not-found-content h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #3C552D;
}

.not-found-content p {
  font-size: 1.1em;
  color: #555;
  margin-bottom: 40px;
  line-height: 1.6;
}

.home-button { /* Gaya untuk tombol utama, sekarang tanpa .kuis-button */
  display: inline-block;
  padding: 15px 30px;
  margin: 0 auto; /* Tengah tombol jika hanya satu */
  background-color: #86A788; /* Hijau Muda */
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.home-button:hover {
  background-color: #3C552D; /* Hijau Tua */
  transform: translateY(-2px);
}

/* Gaya .kuis-button dihapus karena elemennya tidak ada */

/* Responsivitas */
@media (max-width: 768px) {
  .not-found-content {
    padding: 40px 20px;
  }
  .not-found-content h1 {
    font-size: 4em;
  }
  .not-found-content h2 {
    font-size: 2em;
  }
  .home-button { /* Tombol menjadi satu per baris di layar kecil */
    padding: 12px 25px;
    font-size: 1em;
    margin: 10px auto; /* Tengah jika hanya satu tombol */
    display: block;
  }
}
</style>