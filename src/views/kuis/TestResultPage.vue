<template>
  <div class="test-result-page">
    <router-link to="/kuis" class="back-to-overview">&larr; Kembali ke Daftar Tes</router-link>
    <router-link :to="`/kuis/${testType}`" class="repeat-this-test">&larr; Ulangi Tes Ini</router-link>

    <div class="result-container">
      <h1>Hasil Tes {{ testDisplayName }} Anda</h1>
      <p class="score-display">Skor Anda: <span>{{ score }}</span></p>
      <p class="interpretation">{{ interpretation }}</p>
      <p class="recommendation">{{ recommendation }}</p>

      <div class="additional-resources">
        <h3>Sumber Daya & Langkah Selanjutnya:</h3>
        <ul>
          <li>
            <router-link to="/artikel">Baca artikel tentang {{ testDisplayName.toLowerCase() }}</router-link>
          </li>
          <li>
            <router-link to="/chatbot">Dapatkan dukungan dari Chatbot kami</router-link>
          </li>
          <li>
            <router-link to="/mood-tracker">Lacak suasana hati Anda dengan Mood Tracker</router-link>
          </li>
          <li>
            <a href="https://www.google.com/search?q=profesional+kesehatan+mental+terdekat" target="_blank">Temukan profesional kesehatan mental terdekat</a>
          </li>
        </ul>
      </div>

      <button @click="resetToOverview" class="reset-to-overview-button">Kembali ke Daftar Tes</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestResultPage',
  props: {
    testType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      testDisplayName: '',
      score: 0,
      interpretation: '',
      recommendation: '',
      parsedAnswers: []
    };
  },
  created() {
    // console.log("TestResultPage Created. Query params:", this.$route.query); // Debugging
    this.parseAndCalculateResult();
  },
  methods: {
    parseAndCalculateResult() {
      const answersString = this.$route.query.answers;
      // console.log("Answers string from query:", answersString); // Debugging

      try {
        this.parsedAnswers = answersString ? JSON.parse(answersString) : [];
        // console.log("Parsed answers:", this.parsedAnswers); // Debugging
      } catch (e) {
        console.error("Gagal parse jawaban dari query params:", e);
        this.parsedAnswers = [];
      }

      this.score = this.parsedAnswers.reduce((sum, value) => {
        // console.log(`Sum: ${sum}, Value: ${value}, Type: ${typeof value}`); // Debugging
        return sum + Number(value);
      }, 0);

      // console.log("Skor akhir:", this.score); // Debugging

      const typeMap = {
        'depresi': 'Depresi',
        'kecemasan': 'Kecemasan',
        'stres': 'Stres',
        'burnout': 'Burnout',
        'harga-diri': 'Harga Diri'
      };
      this.testDisplayName = typeMap[this.testType] || 'Kesehatan Mental';

      // Logika Interpretasi Hasil dan Rekomendasi
      if (this.testType === 'depresi') {
        if (this.score <= 4) {
          this.interpretation = 'Tingkat depresi Anda rendah. Pertahankan pola hidup sehat dan aktivitas sosial yang positif.';
          this.recommendation = 'Terus pantau perasaan Anda dan jangan ragu untuk mencari dukungan jika ada perubahan suasana hati yang signifikan.';
        } else if (this.score <= 9) {
          this.interpretation = 'Tingkat depresi Anda ringan hingga sedang. Anda mungkin merasa sedih atau kehilangan minat sesekali.';
          this.recommendation = 'Coba tingkatkan aktivitas fisik, jaga pola makan sehat, dan luangkan waktu untuk kegiatan yang menyenangkan dan bermakna.';
        } else {
          this.interpretation = 'Tingkat depresi Anda sedang hingga parah. Gejala yang Anda alami mungkin membutuhkan perhatian serius dan berdampak pada kehidupan sehari-hari.';
          this.recommendation = 'Sangat penting untuk segera mencari bantuan dari profesional kesehatan mental, seperti psikolog atau psikiater, untuk diagnosis dan rencana perawatan yang tepat.';
        }
      } else if (this.testType === 'kecemasan') {
        if (this.score <= 4) {
          this.interpretation = 'Tingkat kecemasan Anda rendah. Anda memiliki kemampuan yang baik dalam mengelola emosi sehari-hari.';
          this.recommendation = 'Terus jaga kesehatan mental Anda dengan gaya hidup sehat, seperti olahraga teratur dan istirahat cukup.';
        } else if (this.score <= 9) {
          this.interpretation = 'Tingkat kecemasan Anda sedang. Anda mungkin mengalami beberapa gejala kecemasan yang sesekali mengganggu.';
          this.recommendation = 'Perhatikan pemicu kecemasan Anda dan coba praktikkan teknik relaksasi seperti pernapasan dalam atau meditasi singkat.';
        } else {
          this.interpretation = 'Tingkat kecemasan Anda tinggi. Gejala yang Anda alami mungkin signifikan dan berdampak pada kehidupan Anda.';
          this.recommendation = 'Sangat disarankan untuk mencari dukungan profesional dari psikolog atau konselor untuk evaluasi lebih lanjut dan strategi penanganan yang efektif.';
        }
      } else if (this.testType === 'stres') {
        if (this.score <= 3) {
          this.interpretation = 'Tingkat stres Anda rendah. Anda efektif dalam mengelola tekanan sehari-hari dan menghadapi tantangan.';
          this.recommendation = 'Lanjutkan strategi pengelolaan stres Anda yang sudah baik, seperti menjaga keseimbangan kerja-hidup dan hobi.';
        } else if (this.score <= 7) {
          this.interpretation = 'Tingkat stres Anda sedang. Ada baiknya mengidentifikasi sumber stres dan mencari solusi untuk mengurangi beban.';
          this.recommendation = 'Prioritaskan waktu istirahat, pastikan Anda mendapatkan tidur yang cukup, dan coba teknik manajemen waktu.';
        } else {
          this.interpretation = 'Tingkat stres Anda tinggi. Stres ini mungkin berdampak pada kesehatan fisik dan mental Anda secara signifikan.';
          this.recommendation = 'Pertimbangkan untuk mengurangi beban kerja, melatih mindfulness, atau berkonsultasi dengan ahli untuk strategi koping yang lebih baik dan dukungan emosional.';
        }
      } else if (this.testType === 'burnout') {
        if (this.score <= 2) {
          this.interpretation = 'Tingkat burnout Anda rendah. Anda tampaknya memiliki keseimbangan kerja-hidup yang baik dan mengelola energi secara efektif.';
          this.recommendation = 'Terus pertahankan batasan yang sehat antara pekerjaan dan kehidupan pribadi, serta praktikkan manajemen stres proaktif.';
        } else if (this.score <= 5) {
          this.interpretation = 'Anda mungkin mulai merasakan gejala burnout, seperti kelelahan atau penurunan motivasi.';
          this.recommendation = 'Coba delegasikan tugas jika memungkinkan, ambil cuti, atau evaluasi kembali prioritas pekerjaan Anda untuk mengurangi tekanan.';
        } else {
          this.interpretation = 'Anda mungkin mengalami burnout yang signifikan. Kelelahan emosional dan fisik sangat tinggi, memengaruhi produktivitas dan kesejahteraan Anda.';
          this.recommendation = 'Penting untuk istirahat total dari sumber stres dan mencari dukungan profesional untuk memulihkan diri serta mengembangkan strategi pencegahan burnout jangka panjang.';
        }
      } else if (this.testType === 'harga-diri') {
        if (this.score >= 9) { // Skor tinggi = harga diri tinggi
          this.interpretation = 'Tingkat harga diri Anda tinggi. Anda memiliki pandangan positif tentang diri sendiri dan merasa berharga.';
          this.recommendation = 'Terus kembangkan kekuatan Anda, praktikkan kasih sayang pada diri sendiri, dan kelilingi diri dengan orang-orang yang mendukung.';
        } else if (this.score >= 5) {
          this.interpretation = 'Tingkat harga diri Anda sedang. Ada area di mana Anda bisa meningkatkan kepercayaan diri dan rasa berharga.';
          this.recommendation = 'Fokus pada pencapaian kecil, hindari perbandingan diri dengan orang lain, dan latih afirmasi positif setiap hari.';
        } else {
          this.interpretation = 'Tingkat harga diri Anda rendah. Anda mungkin sering merasa tidak berharga, kurang percaya diri, atau sulit menerima diri sendiri.';
          this.recommendation = 'Disarankan untuk bekerja dengan terapis atau konselor untuk membangun kembali harga diri Anda, mengatasi pikiran negatif, dan mengembangkan strategi koping yang sehat.';
        }
      } else {
        this.interpretation = 'Hasil tes tidak dapat diinterpretasikan.';
        this.recommendation = 'Silakan coba tes lain atau hubungi dukungan.';
      }
    },
    resetToOverview() {
      this.$router.push('/kuis');
    }
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

.test-result-page {
  font-family: 'Arial', sans-serif;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: transparent;
  min-height: 100vh;
  color: #333;
  text-align: center;
}

.back-to-overview, .repeat-this-test {
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 15px;
  color: #C97372; /* Pink */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.back-to-overview:hover, .repeat-this-test:hover {
  color: #3C552D; /* Hijau Tua */
}

/* Bagian Kontainer Hasil */
.result-container {
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-top: 30px;
}

.result-container h1 {
  font-size: 2.5em;
  color: #3C552D; /* Hijau Tua */
  margin-bottom: 25px;
}

.score-display {
  font-size: 1.8em;
  font-weight: bold;
  color: #C97372; /* Pink */
  margin-bottom: 20px;
}

.score-display span {
  font-size: 1.2em;
  color: #3C552D; /* Hijau Tua */
}

.interpretation {
  font-size: 1.1em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
  font-weight: bold;
}

.recommendation {
  font-size: 1em;
  line-height: 1.6;
  color: #666;
  font-style: italic;
  margin-bottom: 40px;
}

.additional-resources {
  text-align: left;
  background-color: #FFFEEC; /* Cream */
  padding: 25px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 1px 8px rgba(0,0,0,0.05);
}

.additional-resources h3 {
  color: #C97372; /* Pink */
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.4em;
  border-bottom: 1px solid #FFCFCF; /* Pink Muda */
  padding-bottom: 10px;
}

.additional-resources ul {
  list-style: none;
  padding: 0;
}

.additional-resources li {
  margin-bottom: 10px;
}

.additional-resources a {
  color: #86A788; /* Hijau Muda */
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.additional-resources a:hover {
  color: #3C552D; /* Hijau Tua */
  text-decoration: underline;
}

.reset-to-overview-button {
  padding: 15px 30px;
  background-color: #3C552D; /* Hijau Tua */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.reset-to-overview-button:hover {
  background-color: #86A788; /* Hijau Muda */
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .result-container {
    padding: 30px;
  }
  .result-container h1 {
    font-size: 2em;
  }
  .score-display {
    font-size: 1.5em;
  }
  .back-to-overview, .repeat-this-test {
    font-size: 1em;
    margin-bottom: 20px;
  }
}
</style>