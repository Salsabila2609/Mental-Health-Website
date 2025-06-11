<template>
  <div class="single-test-page">
    <router-link to="/kuis" class="back-to-overview">&larr; Kembali ke Daftar Tes</router-link>

    <div v-if="!testStarted" class="test-intro-section">
      <h1>Tes {{ testDisplayName }}</h1>
      <p class="intro-description">
        Tes ini dirancang untuk membantu Anda memahami tingkat {{ testDisplayName.toLowerCase() }} Anda. Bacalah setiap pernyataan dengan cermat dan pilih opsi yang paling sesuai dengan perasaan Anda dalam beberapa minggu terakhir.
      </p>
      <div class="instructions">
        <h3>Petunjuk Penting:</h3>
        <ul>
          <li><strong>Jujur:</strong> Jawablah sesuai kenyataan Anda, bukan yang Anda pikir seharusnya.</li>
          <li><strong>Bukan Diagnosa:</strong> Hasil tes ini bukan merupakan diagnosis medis. Selalu konsultasikan dengan profesional kesehatan mental untuk diagnosa dan penanganan yang akurat.</li>
          <li><strong>Privasi:</strong> Jawaban Anda bersifat rahasia dan anonim.</li>
        </ul>
      </div>
      <button @click="startTestQuestions" class="start-button">Mulai Tes Sekarang</button>
    </div>

    <div v-else class="question-flow-section">
      <p class="question-progress">Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ questions.length }}</p>
      <h2>{{ currentQuestion.question }}</h2>

      <div class="options">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          @click="selectAnswer(option.value)"
          :class="{ selected: selectedAnswer === option.value }"
        >
          {{ option.text }}
        </button>
      </div>

      <div class="navigation-buttons">
        <button @click="prevQuestion" :disabled="currentQuestionIndex === 0" class="nav-button-back">Kembali</button>
        <button @click="nextQuestion" :disabled="selectedAnswer === null" class="nav-button-next">
          {{ currentQuestionIndex === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleTestPage',
  props: {
    testType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      testDisplayName: '',
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      answers: [],
      testStarted: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {};
    }
  },
  watch: {
    testType: {
      immediate: true,
      handler(newType) {
        this.loadTestQuestions(newType);
        this.resetTestState(); // Ini akan membersihkan localStorage saat tes baru dipilih/direfresh
      }
    }
  },
  methods: {
    loadTestQuestions(type) {
      let questionsData = [];
      switch (type) {
        case 'depresi':
          this.testDisplayName = 'Depresi';
          questionsData = [
            { question: 'Dalam dua minggu terakhir, seberapa sering Anda merasa sedikit minat atau kesenangan dalam melakukan sesuatu?', options: [{ text: 'Tidak Sama Sekali', value: 0 }, { text: 'Beberapa Hari', value: 1 }, { text: 'Lebih dari Separuh Hari', value: 2 }, { text: 'Hampir Setiap Hari', value: 3 }] },
            { question: 'Dalam dua minggu terakhir, seberapa sering Anda merasa murung, sedih, atau putus asa?', options: [{ text: 'Tidak Sama Sekali', value: 0 }, { text: 'Beberapa Hari', value: 1 }, { text: 'Lebih dari Separuh Hari', value: 2 }, { text: 'Hampir Setiap Hari', value: 3 }] },
            { question: 'Apakah Anda merasa lelah atau memiliki energi yang rendah?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Ya, selalu', value: 3 }] },
            { question: 'Apakah Anda mengalami perubahan signifikan pada nafsu makan atau berat badan Anda?', options: [{ text: 'Tidak', value: 0 }, { text: 'Sedikit Berubah', value: 1 }, { text: 'Cukup Berubah', value: 2 }, { text: 'Sangat Berubah', value: 3 }] },
            { question: 'Apakah Anda merasa tidak berharga atau merasa bersalah secara berlebihan?', options: [{ text: 'Tidak', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir Setiap Hari', value: 3 }] }
          ];
          break;
        case 'kecemasan':
          this.testDisplayName = 'Kecemasan';
          questionsData = [
            { question: 'Seberapa sering Anda merasa gelisah atau khawatir berlebihan?', options: [{ text: 'Tidak Pernah', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir Setiap Hari', value: 3 }] },
            { question: 'Apakah Anda kesulitan mengontrol pikiran yang mengganggu?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Ya, sangat sering', value: 3 }] },
            { question: 'Apakah Anda merasa sulit untuk rileks?', options: [{ text: 'Tidak', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir selalu', value: 3 }] },
            { question: 'Apakah Anda mengalami gangguan tidur (sulit tidur, sering terbangun)?', options: [{ text: 'Tidak', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir setiap malam', value: 3 }] },
            { question: 'Apakah Anda merasa mudah lelah atau tidak bertenaga?', options: [{ text: 'Tidak', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir setiap hari', value: 3 }] }
          ];
          break;
        case 'stres':
          this.testDisplayName = 'Stres';
          questionsData = [
            { question: 'Seberapa sering Anda merasa tertekan atau kewalahan?', options: [{ text: 'Tidak Pernah', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir Setiap Hari', value: 3 }] },
            { question: 'Apakah Anda merasa mudah tersinggung atau marah?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Ya, sangat sering', value: 3 }] },
            { question: 'Apakah Anda mengalami perubahan signifikan pada nafsu makan atau pola tidur?', options: [{ text: 'Tidak', value: 0 }, { text: 'Sedikit Berubah', value: 1 }, { text: 'Cukup Berubah', value: 2 }, { text: 'Sangat Berubah', value: 3 }] },
            { question: 'Apakah Anda merasa kehilangan kontrol atau tidak mampu mengatasi masalah?', options: [{ text: 'Tidak', value: 0 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 2 }, { text: 'Hampir selalu', value: 3 }] }
          ];
          break;
        case 'burnout':
          this.testDisplayName = 'Burnout';
          questionsData = [
            { question: 'Apakah Anda merasa lelah secara emosional atau fisik akibat pekerjaan/aktivitas Anda?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Hampir setiap hari', value: 3 }] },
            { question: 'Apakah Anda merasa sinis atau jauh dari pekerjaan/aktivitas yang biasa Anda nikmati?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Hampir selalu', value: 3 }] },
            { question: 'Apakah Anda merasa kurang efektif atau tidak berprestasi dalam pekerjaan/aktivitas Anda?', options: [{ text: 'Tidak', value: 0 }, { text: 'Ya, kadang-kadang', value: 1 }, { text: 'Ya, sering', value: 2 }, { text: 'Ya, selalu', value: 3 }] }
          ];
          break;
        case 'harga-diri':
          this.testDisplayName = 'Harga Diri';
          questionsData = [
            { question: 'Seberapa sering Anda merasa positif dan yakin tentang diri sendiri?', options: [{ text: 'Sangat Sering', value: 3 }, { text: 'Sering', value: 2 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Jarang', value: 0 }] },
            { question: 'Apakah Anda merasa Anda memiliki banyak hal untuk dibanggakan?', options: [{ text: 'Ya, sangat', value: 3 }, { text: 'Ya, cukup', value: 2 }, { text: 'Ya, sedikit', value: 1 }, { text: 'Tidak', value: 0 }] },
            { question: 'Apakah Anda merasa Anda adalah orang yang berharga dan layak dihormati?', options: [{ text: 'Ya, selalu', value: 3 }, { text: 'Ya, sering', value: 2 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Jarang', value: 0 }] },
            { question: 'Apakah Anda cenderung membandingkan diri dengan orang lain secara negatif?', options: [{ text: 'Tidak', value: 3 }, { text: 'Jarang', value: 2 }, { text: 'Kadang-kadang', value: 1 }, { text: 'Sering', value: 0 }] }
          ];
          break;
        default:
          this.testDisplayName = 'Tes Kesehatan Mental';
          questionsData = [{ question: 'Tidak ada pertanyaan untuk tes ini.', options: [] }];
      }
      this.questions = questionsData;
    },
    resetTestState() {
      this.currentQuestionIndex = 0;
      this.selectedAnswer = null;
      this.answers = new Array(this.questions.length).fill(null);
      this.testStarted = false;
      // Hapus data hasil tes yang mungkin ada di localStorage saat tes baru dimulai/direfresh
      localStorage.removeItem('testAnswers');
      localStorage.removeItem('testTypeForResults');
    },
    startTestQuestions() {
      this.testStarted = true;
    },
    selectAnswer(value) {
      this.selectedAnswer = value;
      this.answers.splice(this.currentQuestionIndex, 1, value);
    },
    nextQuestion() {
      if (this.selectedAnswer === null) {
        alert("Mohon pilih jawaban terlebih dahulu.");
        return;
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.answers[this.currentQuestionIndex] !== null ? this.answers[this.currentQuestionIndex] : null;
      } else {
        // Simpan answers ke localStorage
        try {
          localStorage.setItem('testAnswers', JSON.stringify(this.answers));
          // Juga simpan testType agar TestResultPage tahu jenis tesnya saat di-reload
          localStorage.setItem('testTypeForResults', this.testType);
        } catch (e) {
          console.error("Gagal menyimpan jawaban ke localStorage:", e);
          alert("Terjadi kesalahan saat menyimpan hasil. Mohon coba lagi.");
          return;
        }

        this.$router.push({
          name: 'TestResult',
          params: {
            testType: this.testType,
          }
        });
      }
    },
    prevQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.selectedAnswer = this.answers[this.currentQuestionIndex];
      }
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

.single-test-page {
  font-family: 'Poppins', sans-serif;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: transparent;
  min-height: 100vh;
  color: #333;
  text-align: center;
}

.back-to-overview {
  display: block;
  text-align: left;
  margin-bottom: 30px;
  color: #C97372;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1em;
  transition: color 0.3s ease;
}

.back-to-overview:hover {
  color: #3C552D;
}

.test-intro-section {
  background-color: #FFFFFF;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.test-intro-section h1 {
  font-size: 2.5em;
  color: #3C552D;
  margin-bottom: 20px;
}

.intro-description {
  font-size: 1.1em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.instructions {
  background-color: #FFFEEC;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.instructions h3 {
  color: #C97372;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.instructions ul {
  list-style: none;
  padding: 0;
}

.instructions li {
  margin-bottom: 8px;
  line-height: 1.5;
  color: #444;
}

.start-button {
  padding: 15px 30px;
  background-color: #86A788;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  outline: none;
}

.start-button:hover {
  background-color: #3C552D;
  transform: translateY(-2px);
}

.question-flow-section {
  background-color: #FFFFFF;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
  border-radius: 12px;
}

.question-progress {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 15px;
}

.question-flow-section h2 {
  font-size: 1.8em;
  color: #3C552D;
  margin-bottom: 30px;
  line-height: 1.4;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.options button {
  padding: 15px 25px;
  border: 1px solid #FFCFCF;
  border-radius: 8px;
  background-color: #FFE3E2;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  width: 100%;
  color: #C97372;
  box-shadow: 0 1px 5px rgba(0,0,0,0.05);
}

.options button:hover {
  background-color: #FFCFCF;
  border-color: #C97372;
  color: #C97372;
  transform: translateY(-2px);
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}

.options button.selected {
  background-color: #C97372;
  color: white;
  border-color: #C97372;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.navigation-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.nav-button-back,
.nav-button-next {
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, color 0.3s ease;
  min-width: 120px;
  border: none;
}

.nav-button-back {
  background-color: transparent;
  color: #888;
  border: 1px solid #ddd;
}

.nav-button-back:hover {
  background-color: #f0f0f0;
  transform: translateY(-1px);
}

.nav-button-next:not(:disabled) {
  background-color: #86A788;
  color: white;
}

.nav-button-next:not(:disabled):hover {
  background-color: #3C552D;
  transform: translateY(-1px);
}

.nav-button-next:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  color: #666;
}

@media (max-width: 768px) {
  .test-intro-section, .question-flow-section {
    padding: 30px;
  }
  .test-intro-section h1 {
    font-size: 2em;
  }
  .options button {
    font-size: 1em;
  }
  .nav-button-back, .nav-button-next {
    min-width: 100px;
    padding: 10px 20px;
  }
}
</style>