<template>
  <div class="article-detail-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else class="article-content">
      <!-- Header Navigation -->
      <header class="article-header">
        <div class="header-container">
          <button @click="goBack" class="back-button">
            <router-link to="/artikel">
              <span class="back-icon">←</span>
              <span class="back-text">Kembali</span>
            </router-link>

          </button>
          
          <div class="header-actions">
            <button 
              @click="toggleBookmark" 
              :class="['action-btn', 'bookmark-btn', { active: isBookmarked }]"
              :title="isBookmarked ? 'Hapus dari bookmark' : 'Simpan ke bookmark'"
            >
              <span class="action-icon">{{ isBookmarked ? '❤️' : '🤍' }}</span>
            </button>
            
            <button @click="shareArticle" class="action-btn share-btn" title="Bagikan artikel">
              <span class="action-icon">📤</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-container">
          <div class="hero-image-container">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="hero-image"
              @load="onImageLoad"
              @error="onImageError"
            >
            <div class="hero-overlay"></div>
          </div>
          
          <div class="hero-content">
            <div class="article-meta">
              <span class="category-badge">{{ article.category }}</span>
              <div class="meta-divider">•</div>
              <span class="publish-date">{{ formatDate(article.date) }}</span>
            </div>
            
            <h1 class="article-title">{{ article.title }}</h1>
            
            <div class="article-stats">
              <div class="stat-item">
                <span class="stat-icon">⏱️</span>
                <span class="stat-text">{{ article.readTime }} menit baca</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">👁️</span>
                <span class="stat-text">{{ formatNumber(article.views) }} views</span>
              </div>
              <div class="stat-item">
                <span class="stat-icon">👍</span>
                <span class="stat-text">{{ formatNumber(article.likes) }} likes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: readingProgress + '%' }"></div>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <div class="content-container">
          <!-- Article Body -->
          <article class="article-body">
            <!-- Introduction -->
            <section class="article-section intro-section">
              <p class="article-excerpt">{{ article.excerpt }}</p>
            </section>

            <!-- Content Sections -->
            <section class="article-section">
              <h2 class="section-title">Mengapa Kecemasan Digital Terjadi?</h2>
              <p class="section-content">
                Di era digital saat ini, kita dihadapkan pada berbagai tantangan baru yang dapat memicu kecemasan. 
                Media sosial, notifikasi yang tak henti-hentinya, dan tekanan untuk selalu "online" menciptakan 
                lingkungan yang dapat membuat kita merasa kewalahan.
              </p>
              <p class="section-content">
                Penelitian menunjukkan bahwa penggunaan media sosial yang berlebihan dapat meningkatkan tingkat 
                kortisol (hormon stres) dalam tubuh kita. Hal ini terjadi karena otak kita terus-menerus memproses 
                informasi dan stimulus yang datang dari berbagai platform digital.
              </p>
            </section>

            <section class="article-section">
              <h2 class="section-title">Tanda-tanda Kecemasan Digital</h2>
              <div class="highlight-box">
                <h3 class="highlight-title">Gejala yang Perlu Diwaspadai:</h3>
                <ul class="highlight-list">
                  <li>Merasa cemas ketika tidak bisa mengakses internet atau media sosial</li>
                  <li>Sering mengecek notifikasi secara kompulsif</li>
                  <li>Sulit tidur karena memikirkan aktivitas online</li>
                  <li>Membandingkan diri dengan orang lain di media sosial</li>
                  <li>Merasa FOMO (Fear of Missing Out) yang berlebihan</li>
                </ul>
              </div>
            </section>

            <section class="article-section">
              <h2 class="section-title">Strategi Mengatasi Kecemasan Digital</h2>
              
              <div class="strategy-grid">
                <div class="strategy-card">
                  <div class="strategy-icon">🧘‍♀️</div>
                  <h3 class="strategy-title">Digital Detox</h3>
                  <p class="strategy-description">
                    Sisihkan waktu khusus untuk tidak menggunakan perangkat digital. 
                    Mulai dengan 30 menit setiap hari, kemudian tingkatkan secara bertahap.
                  </p>
                </div>
                
                <div class="strategy-card">
                  <div class="strategy-icon">🔔</div>
                  <h3 class="strategy-title">Atur Notifikasi</h3>
                  <p class="strategy-description">
                    Nonaktifkan notifikasi yang tidak penting. Pilih waktu khusus untuk 
                    mengecek pesan dan media sosial, bukan sepanjang hari.
                  </p>
                </div>
                
                <div class="strategy-card">
                  <div class="strategy-icon">🌅</div>
                  <h3 class="strategy-title">Morning Routine</h3>
                  <p class="strategy-description">
                    Hindari mengecek ponsel segera setelah bangun tidur. Mulai hari dengan 
                    aktivitas yang menenangkan seperti meditasi atau membaca.
                  </p>
                </div>
                
                <div class="strategy-card">
                  <div class="strategy-icon">🛏️</div>
                  <h3 class="strategy-title">Screen-Free Bedroom</h3>
                  <p class="strategy-description">
                    Jangan bawa ponsel ke kamar tidur. Gunakan alarm konvensional dan 
                    buat kamar tidur sebagai zona bebas teknologi.
                  </p>
                </div>
              </div>
            </section>

            <section class="article-section">
              <h2 class="section-title">Teknik Mindfulness untuk Era Digital</h2>
              <p class="section-content">
                Mindfulness dapat membantu kita tetap sadar dan present di tengah hiruk-pikuk dunia digital. 
                Berikut beberapa teknik yang bisa dipraktikkan:
              </p>
              
              <div class="technique-list">
                <div class="technique-item">
                  <div class="technique-number">1</div>
                  <div class="technique-content">
                    <h4 class="technique-title">Breathing Space</h4>
                    <p class="technique-description">
                      Sebelum membuka aplikasi media sosial, ambil tiga napas dalam-dalam. 
                      Tanyakan pada diri sendiri: "Mengapa saya ingin membuka aplikasi ini?"
                    </p>
                  </div>
                </div>
                
                <div class="technique-item">
                  <div class="technique-number">2</div>
                  <div class="technique-content">
                    <h4 class="technique-title">Mindful Scrolling</h4>
                    <p class="technique-description">
                      Ketika menggunakan media sosial, lakukan dengan sadar. Perhatikan perasaan 
                      yang muncul saat melihat setiap postingan.
                    </p>
                  </div>
                </div>
                
                <div class="technique-item">
                  <div class="technique-number">3</div>
                  <div class="technique-content">
                    <h4 class="technique-title">Digital Gratitude</h4>
                    <p class="technique-description">
                      Setiap kali selesai menggunakan perangkat digital, sebutkan satu hal 
                      positif yang Anda dapatkan dari penggunaan tersebut.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Quote Section -->
            <section class="quote-section">
              <blockquote class="article-quote">
                <p class="quote-text">
                  "Teknologi adalah alat yang hebat, tetapi alat yang buruk sebagai master. 
                  Kita harus mengendalikan teknologi, bukan sebaliknya."
                </p>
                <cite class="quote-author">— Dr. Anna Lembke, Psikiater Stanford</cite>
              </blockquote>
            </section>

            <section class="article-section">
              <h2 class="section-title">Kapan Harus Mencari Bantuan Profesional?</h2>
              <p class="section-content">
                Jika kecemasan digital sudah mengganggu aktivitas sehari-hari, pekerjaan, atau hubungan 
                interpersonal, mungkin saatnya untuk mencari bantuan profesional. Beberapa tanda yang 
                perlu diwaspadai:
              </p>
              
              <div class="warning-box">
                <div class="warning-icon">⚠️</div>
                <div class="warning-content">
                  <h3 class="warning-title">Segera Konsultasi Jika:</h3>
                  <ul class="warning-list">
                    <li>Kecemasan muncul bahkan ketika tidak menggunakan perangkat digital</li>
                    <li>Mengalami serangan panik terkait teknologi</li>
                    <li>Tidak bisa tidur atau makan dengan normal</li>
                    <li>Menarik diri dari aktivitas sosial offline</li>
                  </ul>
                </div>
              </div>
            </section>

            <section class="article-section conclusion-section">
              <h2 class="section-title">Kesimpulan</h2>
              <p class="section-content">
                Mengatasi kecemasan di era digital membutuhkan kesadaran, strategi yang tepat, dan konsistensi. 
                Ingatlah bahwa teknologi seharusnya membantu hidup kita menjadi lebih baik, bukan sebaliknya. 
                Dengan menerapkan tips dan strategi yang telah dibahas, kita dapat menikmati manfaat teknologi 
                tanpa harus mengorbankan kesehatan mental kita.
              </p>
              <p class="section-content">
                Perjalanan untuk mencapai keseimbangan digital adalah proses yang berkelanjutan. Bersabarlah 
                dengan diri sendiri dan ingat bahwa setiap langkah kecil menuju perubahan positif adalah 
                sebuah pencapaian yang patut dihargai.
              </p>
            </section>
          </article>

          <!-- Engagement Section -->
          <section class="engagement-section">
            <div class="engagement-container">
              <div class="engagement-actions">
                <button 
                  @click="toggleLike" 
                  :class="['engagement-btn', 'like-btn', { active: isLiked }]"
                >
                  <span class="btn-icon">{{ isLiked ? '❤️' : '🤍' }}</span>
                  <span class="btn-text">{{ isLiked ? 'Disukai' : 'Suka' }}</span>
                  <span class="btn-count">({{ currentLikes }})</span>
                </button>
                
                <button @click="shareArticle" class="engagement-btn share-btn">
                  <span class="btn-icon">📤</span>
                  <span class="btn-text">Bagikan</span>
                </button>
                
                <button 
                  @click="toggleBookmark" 
                  :class="['engagement-btn', 'bookmark-btn', { active: isBookmarked }]"
                >
                  <span class="btn-icon">{{ isBookmarked ? '🔖' : '📑' }}</span>
                  <span class="btn-text">{{ isBookmarked ? 'Tersimpan' : 'Simpan' }}</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Author Info -->
          <section class="author-section">
            <div class="author-card">
              <div class="author-avatar">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Author" class="avatar-image">
              </div>
              <div class="author-info">
                <h3 class="author-name">Dr. Sarah Putri</h3>
                <p class="author-title">Psikolog Klinis & Digital Wellness Expert</p>
                <p class="author-bio">
                  Spesialis dalam menangani kecemasan digital dan kesehatan mental di era teknologi. 
                  Berpengalaman lebih dari 8 tahun dalam bidang psikologi klinis.
                </p>
              </div>
            </div>
          </section>

          <!-- Related Articles -->
          <section class="related-section">
            <h2 class="related-title">Artikel Terkait</h2>
            <div class="related-grid">
              <article 
                v-for="related in relatedArticles" 
                :key="related.id"
                class="related-card"
                @click="openRelatedArticle(related)"
              >
                <div class="related-image">
                  <img :src="related.image" :alt="related.title" class="related-img">
                </div>
                <div class="related-content">
                  <span class="related-category">{{ related.category }}</span>
                  <h3 class="related-title-text">{{ related.title }}</h3>
                  <div class="related-meta">
                    <span class="related-time">{{ related.readTime }} min</span>
                    <span class="related-views">{{ formatNumber(related.views) }} views</span>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>

    <!-- Floating Action Button -->
    <div class="fab-container">
      <button
        @click="scrollToTop"
        class="fab-button"
        :class="{ 'visible': showScrollTop }"
        title="Kembali ke atas"
      >
        ↑
      </button>
    </div>

    <!-- Share Modal -->
    <div v-if="showShareModal" class="modal-overlay" @click="closeShareModal">
      <div class="share-modal" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Bagikan Artikel</h3>
          <button @click="closeShareModal" class="modal-close">×</button>
        </div>
        <div class="modal-content">
          <div class="share-options">
            <button @click="shareToWhatsApp" class="share-option whatsapp">
              <span class="share-icon">📱</span>
              <span class="share-text">WhatsApp</span>
            </button>
            <button @click="shareToTwitter" class="share-option twitter">
              <span class="share-icon">🐦</span>
              <span class="share-text">Twitter</span>
            </button>
            <button @click="shareToFacebook" class="share-option facebook">
              <span class="share-icon">📘</span>
              <span class="share-text">Facebook</span>
            </button>
            <button @click="copyLink" class="share-option copy">
              <span class="share-icon">🔗</span>
              <span class="share-text">Salin Link</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification -->
    <div v-if="showToast" :class="['toast-notification', toastType]">
      <span class="toast-icon">{{ toastIcon }}</span>
      <span class="toast-message">{{ toastMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetailPage',
  data() {
    return {
      isLoading: true,
      readingProgress: 0,
      showScrollTop: false,
      isLiked: false,
      isBookmarked: false,
      currentLikes: 189,
      showShareModal: false,
      showToast: false,
      toastMessage: '',
      toastType: 'success',
      toastIcon: '✓',
      
      article: {
        id: 1,
        title: 'Mengatasi Kecemasan di Era Digital',
        excerpt: 'Pelajari strategi efektif untuk mengurangi kecemasan yang disebabkan oleh penggunaan media sosial dan teknologi modern.',
        category: 'Kecemasan',
        readTime: 5,
        date: new Date('2024-03-15'),
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop&crop=faces',
        views: 2543,
        likes: 189,
        isSaved: false
      },
      
      relatedArticles: [
        {
          id: 2,
          title: 'Mindfulness untuk Pemula: Panduan Praktis',
          category: 'Mindfulness',
          readTime: 6,
          views: 3211,
          image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=300&h=200&fit=crop&crop=center'
        },
        {
          id: 3,
          title: 'Mengenali Tanda-tanda Burnout Digital',
          category: 'Stress',
          readTime: 8,
          views: 4567,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center'
        },
        {
          id: 4,
          title: 'Self-Care Routine untuk Generasi Digital',
          category: 'Self-Care',
          readTime: 7,
          views: 1876,
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop&crop=faces'
        }
      ]
    }
  },
  
  mounted() {
    window.scrollTo(0, 0);
    // Simulate loading
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
    
    // Add scroll listeners
    window.addEventListener('scroll', this.handleScroll);
    
    // Track reading progress
    this.trackReadingProgress();
  },
  
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  
  methods: {
    goBack() {
      // In real app, use router.go(-1) or router.push('/articles')
      console.log('Going back to articles list');
      this.triggerToast('Kembali ke daftar artikel', 'info', 'ℹ️');
    },
    
    onImageLoad() {
      console.log('Hero image loaded successfully');
    },
    
    onImageError() {
      console.log('Failed to load hero image');
      this.triggerToast('Gagal memuat gambar', 'error', '⚠️');
    },
    
    handleScroll() {
      const scrollTop = window.pageYOffset;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update reading progress
      this.readingProgress = Math.min((scrollTop / documentHeight) * 100, 100);
      
      // Show/hide scroll to top button
      this.showScrollTop = scrollTop > 300;
    },
    
    trackReadingProgress() {
      // In real app, this would track actual reading progress
      // For demo, we'll just use scroll position
    },
    
    toggleLike() {
      this.isLiked = !this.isLiked;
      this.currentLikes += this.isLiked ? 1 : -1;
      
      const message = this.isLiked ? 'Artikel disukai!' : 'Like dibatalkan';
      const icon = this.isLiked ? '❤️' : '💔';
      this.triggerToast(message, 'success', icon);
    },
    
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked;
      
      const message = this.isBookmarked ? 'Artikel disimpan!' : 'Bookmark dihapus';
      const icon = this.isBookmarked ? '🔖' : '📑';
      this.triggerToast(message, 'success', icon);
    },
    
    shareArticle() {
      this.showShareModal = true;
    },
    
    closeShareModal() {
      this.showShareModal = false;
    },
    
    shareToWhatsApp() {
      const text = encodeURIComponent(`${this.article.title}\n\nBaca artikel lengkap di: ${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, '_blank');
      this.closeShareModal();
      this.triggerToast('Dibagikan ke WhatsApp!', 'success', '📱');
    },
    
    shareToTwitter() {
      const text = encodeURIComponent(this.article.title);
      const url = encodeURIComponent(window.location.href);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
      this.closeShareModal();
      this.triggerToast('Dibagikan ke Twitter!', 'success', '🐦');
    },
    
    shareToFacebook() {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
      this.closeShareModal();
      this.triggerToast('Dibagikan ke Facebook!', 'success', '📘');
    },
    
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.closeShareModal();
        this.triggerToast('Link berhasil disalin!', 'success', '🔗');
      }).catch(() => {
        this.triggerToast('Gagal menyalin link', 'error', '⚠️');
      });
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    openRelatedArticle(article) {
      console.log('Opening related article:', article.title);
      this.triggerToast('Membuka artikel terkait...', 'info', '📖');
    },
    
    triggerToast(message, type = 'success', icon = '✓') {
      this.toastMessage = message;
      this.toastType = type;
      this.toastIcon = icon;
      this.triggerToast = true;
      
      setTimeout(() => {
        this.triggerToast = false;
      }, 3000);
    },
    
    formatDate(date) {
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    },
    
    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
      }
      return num.toString();
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #FFFDEC;
}

.article-detail-page {
  min-height: 100vh;
  position: relative;
}

/* Loading State */
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #FFFDEC;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  text-align: center;
  color: #3c552d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #FFE2E2;
  border-top: 4px solid #3c552d;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Header */
.article-header {
  position: sticky;
  top: 0;
  background: rgba(255, 253, 236, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #FFE2E2;
  z-index: 100;
  padding: 1rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #3c552d;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #86A788;
  color: white;
  transform: translateX(-2px);
}

.header-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: none;
  border: 1px solid #783535;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #86A788;
  border-color: #86A788;
  transform: scale(1.1);
}

.action-btn.active {
  background: #CA7373;
  border-color: #CA7373;
  color: white;
}

/* Progress Bar */
.progress-container {
  position: sticky;
  top: 72px;
  height: 3px;
  background: #FFE2E2;
  z-index: 99;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #3c552d, #86A788);
  transition: width 0.3s ease;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 60vh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.hero-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(60, 85, 45, 0.8) 0%,
    rgba(134, 167, 136, 0.6) 50%,
    rgba(202, 115, 115, 0.4) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.9;
}

.category-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.meta-divider {
  opacity: 0.6;
}

.publish-date {
  font-weight: 300;
}

.article-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.article-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
  opacity: 0.7;
  padding: 0.25rem 0.4rem;
  color: rgb(12, 74, 12);

}

.stat-icon {
  font-size: 1.1rem;
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.content-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Article Body */
.article-body {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  border: 1px solid #FFE2E2;
}

.article-section {
  margin-bottom: 3rem;
}

.article-section:last-child {
  margin-bottom: 0;
}

.intro-section {
  padding-bottom: 2rem;
  border-bottom: 2px solid #FFE2E2;
}

.article-excerpt {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  font-weight: 400;
  text-align: center;
  font-style: italic;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #3c552d;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1rem;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #3c552d, #86A788);
  border-radius: 2px;
}

.section-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 1.5rem;
}

/* Highlight Box */
.highlight-box {
  background: linear-gradient(135deg, #FFE2E2 0%, #FFFDEC 100%);
  border: 2px solid #CA7373;
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
}

.highlight-title {
  color: #CA7373;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.highlight-list {
  list-style: none;
  padding: 0;
}

.highlight-list li {
  padding: 0.5rem 0;
  padding-left: 2rem;
  position: relative;
  color: #444;
  line-height: 1.6;
}

.highlight-list li::before {
  content: '🔸';
  position: absolute;
  left: 0;
  top: 0.5rem;
}

/* Strategy Grid */
.strategy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.strategy-card {
  background: white;
  border: 2px solid #FFE2E2;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.strategy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3c552d, #86A788, #CA7373);
}

.strategy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: #86A788;
}

.strategy-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.strategy-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #3c552d;
  margin-bottom: 1rem;
}

.strategy-description {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Technique List */
.technique-list {
  margin: 2rem 0;
}

.technique-item {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #FFFDEC;
  border-radius: 15px;
  border-left: 4px solid #86A788;
}

.technique-number {
  background: #3c552d;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.technique-content {
  flex: 1;
}

.technique-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3c552d;
  margin-bottom: 0.5rem;
}

.technique-description {
  color: #555;
  line-height: 1.6;
}

/* Quote Section */
.quote-section {
  background: linear-gradient(135deg, #3c552d 0%, #86A788 100%);
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  color: white;
  margin: 3rem 0;
  position: relative;
  overflow: hidden;
}

.quote-section::before {
  content: '"';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8rem;
  opacity: 0.1;
  font-family: serif;
}

.article-quote {
  position: relative;
  z-index: 2;
}

.quote-text {
  font-size: 1.3rem;
  line-height: 1.6;
  font-style: italic;
  margin-bottom: 1.5rem;
}

.quote-author {
  font-size: 1rem;
  opacity: 0.9;
  font-weight: 500;
}

/* Warning Box */
.warning-box {
  background: linear-gradient(135deg, #FFE2E2 0%, #FFFDEC 100%);
  border: 2px solid #CA7373;
  border-radius: 15px;
  padding: 2rem;
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.warning-icon {
  font-size: 2rem;
  color: #CA7373;
  flex-shrink: 0;
}

.warning-content {
  flex: 1;
}

.warning-title {
  color: #CA7373;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.warning-list {
  list-style: none;
  padding: 0;
}

.warning-list li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #444;
  line-height: 1.6;
}

.warning-list li::before {
  content: '⚠';
  position: absolute;
  left: 0;
  top: 0.5rem;
  color: #CA7373;
}

/* Conclusion Section */
.conclusion-section {
  background: linear-gradient(135deg, #FFFDEC 0%, #FFE2E2 100%);
  border-radius: 15px;
  padding: 2rem;
  border: 2px solid #86A788;
}

/* Engagement Section */
.engagement-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #FFE2E2;
  margin-bottom: 3rem;
}

.engagement-container {
  max-width: 600px;
  margin: 0 auto;
}

.engagement-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.engagement-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: 2px solid #FFE2E2;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.engagement-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.engagement-btn.like-btn:hover {
  border-color: #CA7373;
  background: #CA7373;
  color: white;
}

.engagement-btn.share-btn:hover {
  border-color: #86A788;
  background: #86A788;
  color: white;
}

.engagement-btn.bookmark-btn:hover {
  border-color: #3c552d;
  background: #3c552d;
  color: white;
}

.engagement-btn.active {
  background: #CA7373;
  border-color: #CA7373;
  color: white;
}

.engagement-btn.bookmark-btn.active {
  background: #3c552d;
  border-color: #3c552d;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-count {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Author Section */
.author-section {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #FFE2E2;
  margin-bottom: 3rem;
}

.author-card {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.author-avatar {
  flex-shrink: 0;
}

.avatar-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #86A788;
}

.author-info {
  flex: 1;
}

.author-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #3c552d;
  margin-bottom: 0.5rem;
}

.author-title {
  font-size: 1rem;
  color: #86A788;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.author-bio {
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Related Articles */
.related-section {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid #FFE2E2;
}

.related-title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #3c552d;
  margin-bottom: 2rem;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.related-card {
  background: #FFFDEC;
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border-color: #86A788;
}

.related-image {
  height: 200px;
  overflow: hidden;
}

.related-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-card:hover .related-img {
  transform: scale(1.05);
}

.related-content {
  padding: 1.5rem;
}

.related-category {
  background: #86A788;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.related-title-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #3c552d;
  margin: 1rem 0 0.5rem 0;
  line-height: 1.4;
}

.related-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

/* Floating Action Button */
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #3c552d;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}

.fab-button.visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.fab-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  background: #86A788;
}

/* Share Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
}

.share-modal {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid #FFE2E2;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #FFE2E2;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #3c552d;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: #FFE2E2;
  color: #CA7373;
}

.share-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.share-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 2px solid #FFE2E2;
  border-radius: 15px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #333;
}

.share-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.share-option.whatsapp:hover {
  border-color: #25D366;
  background: #25D366;
  color: white;
}

.share-option.twitter:hover {
  border-color: #1DA1F2;
  background: #1DA1F2;
  color: white;
}

.share-option.facebook:hover {
  border-color: #1877F2;
  background: #1877F2;
  color: white;
}

.share-option.copy:hover {
  border-color: #86A788;
  background: #86A788;
  color: white;
}

.share-icon {
  font-size: 2rem;
}

.share-text {
  font-weight: 500;
  font-size: 0.9rem;
}

/* Toast Notification */
.toast-notification {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #3c552d;
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 3000;
  animation: slideUp 0.3s ease;
}

.toast-notification.success {
  background: #86A788;
}

.toast-notification.error {
  background: #CA7373;
}

.toast-notification.info {
  background: #3c552d;
}

.toast-icon {
  font-size: 1.2rem;
}

.toast-message {
  font-weight: 500;
}

@keyframes slideUp {
  from {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    height: 45vh;
  }

  .hero-content {
    padding: 1rem;
    font-size: 0.95rem;
    text-align: center;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-stats {
    gap: 1rem;
  }
  
  .main-content {
    padding: 2rem 1rem;
  }
  
  .article-body {
    padding: 2rem 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .strategy-grid {
    grid-template-columns: 1fr;
  }
  
  .technique-item {
    flex-direction: column;
    text-align: center;
  }
  
  .author-card {
    flex-direction: column;
    text-align: center;
  }
  
  .related-grid {
    grid-template-columns: 1fr;
  }
  
  .engagement-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .engagement-btn {
    justify-content: center;
  }
  
  .share-options {
    grid-template-columns: 1fr;
  }
  
  .fab-container {
    bottom: 1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .article-body {
    padding: 1.5rem 1rem;
  }
  
  .hero-section {
    height: 40vh;
  }

  .hero-content {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .article-title {
    font-size: 1.8rem;
  }
  
  .quote-section {
    padding: 2rem 1.5rem;
  }
  
  .quote-text {
    font-size: 1.1rem;
  }
  
  .related-section {
    padding: 2rem 1.5rem;
  }
}
</style>