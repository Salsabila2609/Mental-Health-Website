<template>
  <div class="page-wrapper">
    <h1>Mood Input</h1>
    <p>Catat suasana hati kamu di sini ✨</p>

    <button @click="showModal = true" class="main-button">
      Catat Mood
    </button>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
      <div class="modal-card">
        <h2 class="modal-title">Bagaimana Perasaanmu Hari Ini?</h2>
        
        <!-- Mood Picker -->
<div
  v-for="(mood, index) in moods"
  :key="index"
  class="emoticon"
  @click="selectedMood = mood"
>
  <div
    class="emoji-wrapper"
    :class="['emoji-' + mood, selectedMood === mood ? 'selected' : '']"
  >
    <img :src="getMoodImage(mood)" :alt="mood" />
  </div>
  <p>{{ mood }}</p>
</div>


        <!-- Note -->
        <textarea v-model="note" placeholder="Tulis cerita harimu..."></textarea>

        <!-- Date Picker -->
        <input type="date" v-model="selectedDate" />

        <!-- Buttons -->
        <div class="modal-actions">
          <button @click="resetForm">Batal</button>
          <button @click="submitForm">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import senangImg from '@/assets/emotions/senang.webp'
import netralImg from '@/assets/emotions/netral.webp'
import sedihImg from '@/assets/emotions/sedih.webp'
import marahImg from '@/assets/emotions/marah.webp'
import lelahImg from '@/assets/emotions/lelah.webp'

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

      console.log("Data disimpan:");
      console.log("Mood:", this.selectedMood);
      console.log("Note:", this.note);
      console.log("Tanggal:", this.selectedDate);

      this.resetForm();
    }
  }
}


</script>

<style scoped>
.page-wrapper {
  padding: 20px;
}
.main-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
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
.modal-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.modal-title {
  text-align: center;
}

.emoticons {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
}
.emoticon {
  text-align: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: background 0.2s;
}
.emoticon {
  transition: box-shadow 0.3s ease;
  cursor: pointer;
}
.emoji-wrapper {
  display: inline-block;
  border-radius: 10px;
  padding: 5px;
  transition: box-shadow 0.3s ease;
}

/* Glow per mood (khusus gambar aja) */
.emoji-senang.selected {
  box-shadow: 0 14px 28px #4caf50, 0 10px 10px #4caf50;
}
.emoji-netral.selected {
  box-shadow: 0 14px 28px #ffeb3b, 0 10px 10px #ffeb3b;
}
.emoji-sedih.selected {
  box-shadow: 0 14px 28px #9e9e9e, 0 10px 10px #9e9e9e;
}
.emoji-marah.selected {
  box-shadow: 0 14px 28px #f44336, 0 10px 10px #f44336;
}
.emoji-lelah.selected {
  box-shadow: 0 14px 28px #2196f3, 0 10px 10px #2196f3;
}

.emoticon img {
  width: 50px;
  height: 50px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  min-height: 80px;
  resize: vertical;
  padding: 8px;
}
input[type="date"] {
  width: 100%;
  margin-top: 10px;
  padding: 8px;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.modal-actions button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.modal-actions button:first-child {
  background-color: #ccc;
}
.modal-actions button:last-child {
  background-color: #4caf50;
  color: white;
}
</style>
