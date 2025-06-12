<template>
  <div class="page-wrapper mood-page bg-peach min-h-screen flex flex-col items-center justify-start py-10 px-4">
    <header class="header">
      <div class="container">
        <h1>Mood Tracker</h1>
        <p>Catat suasana hati kamu di sini</p>
      </div>
    </header>

    <!-- Card Kedua -->
    <div class="card-container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mb-6">
      <!-- Header Section -->
      <div class="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">
          Berdasarkan History Anda
        </h2>
        <button @click="showModal = true" class="send-btn">
          Catat Mood
        </button>
      </div>
      
      <!-- Content Section -->
     <!-- Content Section -->
      <div class="p-6 flex items-stretch h-48"> <!-- Atur tinggi fixed jika perlu -->
        <!-- Persentase Besar -->
        <div class="w-1/4 flex items-center justify-center">
          <span class="font-bold text-[#86A788]" style="font-size: 8rem; line-height: 0.8">80%</span>
        </div>
        
        <!-- Teks Panjang -->
        <div class="w-3/4 pl-6 flex items-center">
          <p class="text-lg text-gray-700">
            Berdasarkan catatan mood Anda selama ini, sebagian besar hari Anda diisi dengan perasaan bahagia dan positif. Terus pertahankan energi baik ini!
          </p>
        </div>
      </div>
    </div>

    <!-- Card Wrapper -->
    <div class="card-container bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
      <!-- Header Section with Title and Button -->
      <div class="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
        <h2 class="text-lg font-semibold text-gray-800">
          Riwayat Mood Kamu 💕
        </h2>
        <button @click="showModal = true" class="send-btn">
          Catat Mood
        </button>
      </div>
      
      <!-- Chart Section -->
      <div class="p-6">
        <div id="mood-graph" class="graph-holder h-[300px]"></div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <h2 class="modal-title">Bagaimana Perasaanmu Hari Ini?</h2>

        <!-- Mood Picker -->
        <div class="emoji-row">
          <button
            v-for="(mood, index) in moods"
            :key="index"
            class="emoji-btn"
            :class="['emoji-' + mood, selectedMood === mood ? 'selected' : '']"
            @click="selectedMood = mood"
          >
            <img :src="getMoodImage(mood)" :alt="mood" />
          </button>
        </div>

        <!-- Note -->
        <textarea v-model="note" placeholder="Tulis cerita harimu..."></textarea>

        <!-- Date Picker -->
        <input type="date" v-model="selectedDate" />

        <!-- Buttons -->
        <div class="modal-actions">
          <button @click="resetForm" class="send-btn">Batal</button>
          <button @click="submitForm" class="send-btn">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import senangImg from '@/assets/emotions/senang.webp'
import netralImg from '@/assets/emotions/netral.webp'
import sedihImg from '@/assets/emotions/sedih.png'
import marahImg from '@/assets/emotions/marah.webp'
import lelahImg from '@/assets/emotions/lelah.webp'
import ApexCharts from 'apexcharts'


export default {
  name: 'MoodInputPage',
  data() {
    return {
      showModal: false,
      moods: ['senang', 'netral', 'sedih', 'marah', 'lelah'],
      selectedMood: null,
      note: '',
      selectedDate: '',
      moodImages: {
        senang: senangImg,
        netral: netralImg,
        sedih: sedihImg,
        marah: marahImg,
        lelah: lelahImg
      }
    }
  },
  methods: {
    getMoodImage(mood) {
      return this.moodImages[mood];
    },
    resetForm() {
      this.showModal = false;
      this.selectedMood = null;
      this.note = '';
      this.selectedDate = '';
    },
    submitForm() {
      if (!this.selectedMood || !this.selectedDate) {
        alert("Pilih mood dan tanggal dulu ya~");
        return;
      }

      const existing = JSON.parse(localStorage.getItem("diary-entries")) || [];

      existing.push({
        mood: this.selectedMood,
        note: this.note,
        date: this.selectedDate
      });

      localStorage.setItem("diary-entries", JSON.stringify(existing));
      renderMoodGraph();
      this.resetForm();
    }
  },
  mounted() {
    renderMoodGraph();
  }
}


function renderMoodGraph() {
    const container = document.getElementById("mood-graph");
    container.innerHTML = ""; // Bersihin dulu kalau ada grafik lama

    let diaryEntries = JSON.parse(localStorage.getItem("diary-entries")) || [];

    if (diaryEntries.length === 0) {
        container.innerHTML = "<p style='text-align:center; color: #888;'>Belum ada data mood untuk ditampilkan.</p>";
        return;
    }

    const moodMap = {
      'senang': 5,
      'netral': 4,
      'sedih': 3,
      'marah': 2,
      'lelah': 1
    };


    let sortedEntries = diaryEntries.sort((a, b) => new Date(a.date) - new Date(b.date));

    const seriesData = sortedEntries.map(entry => moodMap[entry.mood]);
    const xCategories = sortedEntries.map(entry => entry.date);

    const options = {
        chart: {
          type: 'area',
          height: 400,
          width: '100%', // Tambahin ini kalo belum ada
          background: '#ffffff',
          toolbar: {
            show: false
          }
        },
        series: [{
            name: 'Mood',
            data: seriesData
        }],
        xaxis: {
            categories: xCategories,
            labels: {
                rotate: -45
            }
        },
        yaxis: {
            min: 0,
            max: 5,
            tickAmount: 3,
              labels: {
                formatter: function (value) {
                  if (value === 1) return "lelah";
                  if (value === 2) return "marah";
                  if (value === 3) return "sedih";
                  if (value === 4) return "netral";
                  if (value === 5) return "senang";
                  return "";
                }
              }

        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        stroke: {
            curve: 'smooth'
        },
        colors: ["#FFCFCF"]
    };

    const chart = new ApexCharts(container, options);
    chart.render();
}

</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.chart-card {
  border: 1px solid #eee;
  transition: box-shadow 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.graph-holder {
  height: 300px;
  max-width: 1200px; /* Tambahan */
  margin: 0 auto;    /* Biar tetap center */
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}


.modal-card {
  background: #FFFEEC;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
}

.modal-title {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #3C552D;
}

.emoji-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.emoji-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: transform 0.2s, box-shadow 0.2s;
}
.emoji-btn img {
  width: 50px;
  height: 50px;
}
.emoji-btn:hover {
  transform: scale(1.1);
}
.emoji-senang.selected {
  box-shadow: 0 0 12px #4caf50;
}
.emoji-netral.selected {
  box-shadow: 0 0 12px #ffeb3b;
}
.emoji-sedih.selected {
  box-shadow: 0 0 12px #9e9e9e;
}
.emoji-marah.selected {
  box-shadow: 0 0 12px #f44336;
}
.emoji-lelah.selected {
  box-shadow: 0 0 12px #2196f3;
}

textarea,
input[type="date"] {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.send-btn {
  background: #86A788;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
}
.send-btn:hover {
  background: #3C552D;
  transform: scale(1.1);
}
.container {
max-width: 1200px;
margin: 0 auto;
padding: 0 20px;
position: relative;
z-index: 2;
}
.header {
background: linear-gradient(135deg, #86A788 0%, #3C552D 100%);
color: white;
padding: 20px 0;
text-align: center;
box-shadow: 0 4px 20px rgba(0,0,0,0.1);
position: relative;
overflow: hidden;
}
.header::before {
content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            position: relative;
            z-index: 1;
            animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }

        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
        }



/* Tambahan untuk posisi konten di atas background */
.page-wrapper {
  position: relative;
  overflow: hidden;
  font-family: 'Poppins', sans-serif;
}
.card-container {
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto; /* Tambahkan margin atas bawah dan auto untuk center */
  width: 95%; /* Lebar lebih responsif */
  max-width: 1200px; /* Lebar maksimum lebih kecil */
}
/* Perubahan untuk header section */
.flex.justify-between.items-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

/* Perbaikan spacing untuk tombol */
.send-btn {
  padding: 0.5rem 1.25rem; /* Ukuran lebih compact */
  font-size: 0.9rem;
  margin: 0; /* Hapus margin default */
}
.info-btn {
  background: transparent;
  color: #86A788;
  border: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-btn:hover {
  color: #3C552D;
  transform: scale(1.2);
}

.info-btn svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 640px) {
  .card-container {
    padding: 16px;
  }
  .graph-holder {
    height: 200px;
  }
  .emoji-btn img {
    width: 40px;
    height: 40px;
  }
  .send-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
</style>
