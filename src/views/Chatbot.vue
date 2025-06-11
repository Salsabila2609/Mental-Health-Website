<template>
  <div class="chatbot-container">
    <div class="chatbot-page">
      <div class="chatbot-header">
        <h1><i class="fas fa-robot"></i> Chatbot Konseling</h1>
        <p>Dukungan kesehatan mental kapan saja dan di mana saja</p>
      </div>

      <div class="tabs">
        <button @click="activeTab = 'chat'" :class="{ active: activeTab === 'chat' }">
          <i class="fas fa-comments"></i> <span>Chat</span>
        </button>
        <button @click="activeTab = 'history'" :class="{ active: activeTab === 'history' }">
          <i class="fas fa-history"></i> <span>Riwayat</span>
        </button>
        <button @click="activeTab = 'info'" :class="{ active: activeTab === 'info' }">
          <i class="fas fa-info-circle"></i> <span>Info</span>
        </button>
      </div>

      <!-- Chat Tab -->
      <div v-if="activeTab === 'chat'" class="tab-content">
        <div class="chatbox">
          <div class="messages" ref="messagesContainer">
            <div class="chat-bubble bot-bubble">
              <strong>Bot:</strong> Halo! Saya chatbot konseling. Saya di sini untuk mendengarkan ceritamu. Ceritakan apa yang sedang kamu alami.
            </div>
            <div v-for="(msg, index) in messages" :key="index"
                :class="['chat-bubble', msg.sender === 'Anda' ? 'user-bubble' : 'bot-bubble']">
              <strong>{{ msg.sender }}:</strong> {{ msg.text }}
            </div>
          </div>

          <div class="input-area">
            <input v-model="inputText" @keyup.enter="sendMessage" placeholder="Tulis pesanmu di sini...">
            <button @click="sendMessage">
              <i class="fas fa-paper-plane"></i> Kirim
            </button>
            <button @click="resetChat">
              <i class="fas fa-redo"></i> Reset
            </button>
          </div>
        </div>
      </div>

      <!-- History Tab -->
      <div v-if="activeTab === 'history'" class="tab-content history-content">
        <h2><i class="fas fa-history"></i> Riwayat Chat</h2>
        <ul>
          <li v-for="(msg, index) in messages" :key="index">
            <strong>{{ msg.sender }}:</strong> <span>{{ msg.text }}</span>
          </li>
          <li v-if="messages.length === 0">
            Belum ada riwayat percakapan
          </li>
        </ul>
      </div>

      <!-- Info Tab -->
      <div v-if="activeTab === 'info'" class="tab-content info-content">
        <h2><i class="fas fa-info-circle"></i> Tentang Chatbot</h2>
        <p>Chatbot ini didesain untuk memberikan dukungan awal dalam masalah kesehatan mental. Kami berkomitmen untuk memberikan ruang aman bagi Anda untuk berbagi perasaan dan pikiran.</p>
        
        <ul>
          <li>Gunakan bahasa yang santai dan jujur</li>
          <li>Semua percakapan bersifat privat dan aman</li>
          <li>Fitur reset memungkinkan Anda memulai percakapan baru</li>
          <li>Respon chatbot bersifat umum dan bukan pengganti profesional</li>
        </ul>
        
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-lock"></i>
          </div>
          <div class="feature-text">
            <h3>Privasi Terjamin</h3>
            <p>Percakapan Anda tidak disimpan di server kami dan hanya tersimpan di perangkat Anda selama sesi ini.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: 'ChatbotPage',
  data() {
    return {
      activeTab: 'chat',
      inputText: '',
      messages: []
    }
  },
  methods: {
    sendMessage() {
      if (this.inputText.trim() === '') return
      
      this.messages.push({ 
        sender: 'Anda', 
        text: this.inputText 
      })
      
      const userInput = this.inputText
      this.inputText = ''
      
      // Auto-scroll ke bawah
      this.$nextTick(() => {
        this.scrollToBottom();
      });
      
      // Simulasi bot sedang mengetik
      setTimeout(() => {
        this.messages.push({
          sender: 'Bot',
          text: this.generateBotResponse(userInput)
        })
        
        // Auto-scroll ke bawah setelah bot merespon
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }, 1000)
    },
    
    generateBotResponse(input) {
      const responses = [
        `Terima kasih sudah berbagi cerita. Aku bisa merasakan bahwa "${input}" adalah sesuatu yang berat bagimu.`,
        `Aku mendengarmu. "${input}" adalah pengalaman yang tidak mudah. Kamu tidak sendirian.`,
        `Aku mengapresiasi kejujuranmu. "${input}" adalah langkah besar dalam proses pemulihan.`,
        `Aku di sini untuk mendukungmu. Ceritamu tentang "${input}" sangat berarti.`,
        `Terima kasih atas kepercayaanmu. "${input}" menunjukkan kekuatan dalam dirimu.`
      ]
      
      return responses[Math.floor(Math.random() * responses.length)]
    },
    
    resetChat() {
      this.messages = []
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  },
  mounted() {
    this.scrollToBottom();
  }
}
</script>

<style scoped>
/* Reset dan base styling */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.chatbot-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #FFFEEC;
}

.chatbot-page {
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(60, 85, 45, 0.15);
}

.chatbot-header {
  background: linear-gradient(135deg, #86A788 0%, #3C552D 100%);
  color: white;
  padding: 25px 30px;
  text-align: center;
  position: relative;
}

.chatbot-header h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.chatbot-header p {
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  background-color: #FFE3E2;
  padding: 5px;
}

.tabs button {
  flex: 1;
  padding: 16px 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  color: #3C552D;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.tabs button:hover {
  background-color: rgba(201, 115, 114, 0.15);
}

.tabs button.active {
  color: #C97372;
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 10%;
  width: 80%;
  height: 4px;
  background-color: #C97372;
  border-radius: 4px;
}

.tab-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chatbox {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 15px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: #FFE3E2;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

.chat-bubble {
  max-width: 85%;
  padding: 15px 20px;
  border-radius: 20px;
  word-wrap: break-word;
  position: relative;
  animation: fadeIn 0.4s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.user-bubble {
  background-color: #86A788;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.bot-bubble {
  background-color: #C97372;
  color: white;
  align-self: flex-start;
  border-bottom-left-radius: 5px;
}

.chat-bubble strong {
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  opacity: 0.9;
}

.input-area {
  display: flex;
  gap: 12px;
  padding-top: 10px;
}

input {
  flex: 1;
  padding: 15px 20px;
  border-radius: 50px;
  border: 2px solid #FFCFCF;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: #FFFEEC;
}

input:focus {
  outline: none;
  border-color: #86A788;
  box-shadow: 0 0 0 3px rgba(134, 167, 136, 0.2);
}

.input-area button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 15px 20px;
  border-radius: 50px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  white-space: nowrap;
}

.input-area button:first-of-type {
  background-color: #86A788;
  color: white;
}

.input-area button:last-of-type {
  background-color: #FFCFCF;
  color: #3C552D;
}

.input-area button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.input-area button:active {
  transform: translateY(0);
}

.tab-content h2 {
  color: #3C552D;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #FFCFCF;
  display: flex;
  align-items: center;
  gap: 10px;
}

.history-content {
  display: flex;
  flex-direction: column;
}

.history-content ul {
  list-style: none;
  flex: 1;
  overflow-y: auto;
}

.history-content li {
  padding: 15px;
  border-bottom: 1px solid #FFE3E2;
  display: flex;
  gap: 10px;
}

.history-content li:last-child {
  border-bottom: none;
}

.history-content li strong {
  color: #C97372;
  min-width: 60px;
}

.info-content {
  display: flex;
  flex-direction: column;
}

.info-content p {
  margin-bottom: 20px;
  line-height: 1.7;
}

.info-content ul {
  padding-left: 25px;
  margin-bottom: 20px;
}

.info-content li {
  margin-bottom: 15px;
  line-height: 1.6;
  position: relative;
}

.info-content li::before {
  content: '•';
  color: #C97372;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.feature-card {
  background-color: #FFE3E2;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: auto;
}

.feature-icon {
  background: linear-gradient(135deg, #C97372 0%, #FFCFCF 100%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.5rem;
  color: white;
}

.feature-text h3 {
  color: #3C552D;
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.feature-text p {
  margin-bottom: 0;
  font-size: 0.95rem;
}

/* Scrollbar styling */
.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-track {
  background: #FFCFCF;
  border-radius: 10px;
}

.messages::-webkit-scrollbar-thumb {
  background: #86A788;
  border-radius: 10px;
}

/* Responsive Design */
@media (max-width: 992px) {
  .chatbot-page {
    height: 85vh;
  }
}

@media (max-width: 768px) {
  .chatbot-container {
    padding: 10px;
  }
  
  .chatbot-page {
    height: 100vh;
    border-radius: 0;
  }
  
  .chatbot-header {
    padding: 20px 15px;
  }
  
  .chatbot-header h1 {
    font-size: 1.8rem;
  }
  
  .chatbot-header p {
    font-size: 1rem;
  }
  
  .tabs button {
    font-size: 1rem;
    padding: 14px 0;
  }
  
  .tabs button span {
    display: none;
  }
  
  .tab-content {
    padding: 15px;
  }
  
  .chat-bubble {
    max-width: 90%;
    padding: 12px 16px;
  }
  
  .input-area {
    flex-direction: column;
  }
  
  .input-area button {
    width: 100%;
    padding: 14px;
  justify-content: center;
  }
  
  .feature-card {
    flex-direction: column;
    text-align: center;
  }
  
  .feature-icon {
    margin-bottom: 15px;
  }
}

@media (max-width: 480px) {
  .chatbot-header h1 {
    font-size: 1.5rem;
  }
  
  .chatbot-header p {
    font-size: 0.9rem;
  }
  
  .tabs button {
    font-size: 0.9rem;
    padding: 12px 0;
  }
  
  .tab-content h2 {
    font-size: 1.3rem;
  }
  
  .history-content li {
    flex-direction: column;
    gap: 5px;
    padding: 12px;
  }
  
  .history-content li strong {
    min-width: auto;
  }
}
</style>