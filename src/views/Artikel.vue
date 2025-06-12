<template>
  <div class="articles-page">
    <!-- Animated Background -->
    <div class="background-animation">
      <div class="floating-circle" v-for="i in 15" :key="i" :style="getCircleStyle(i)"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-main">Artikel</span>
            <span class="title-sub">Mental Health</span>
          </h1>
          <p class="hero-description">
            Temukan wawasan, tips, dan panduan untuk kesehatan mental yang lebih baik
          </p>
        </div>
      </div>
    </section>

    <!-- Search & Filter Section -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Cari artikel yang kamu butuhkan..."
            class="search-input"
            @input="filterArticles"
          >
          <button class="search-btn">
            <span class="search-text">Cari</span>
          </button>
        </div>
        
        <div class="filter-tabs">
          <button 
            v-for="category in categories" 
            :key="category.name"
            :class="['filter-tab', { active: activeCategory === category.name }]"
            @click="setActiveCategory(category.name)"
          >
            <span class="tab-icon">{{ category.icon }}</span>
            <span class="tab-text">{{ category.name }}</span>
            <span class="tab-counter">({{ getCategoryCount(category.name) }})</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Articles Grid -->
    <section class="articles-section">
      <div class="articles-container">
        <!-- Empty State -->
        <div v-if="filteredArticles.length === 0" class="empty-state">
          <div class="empty-emoji">😔</div>
          <h3 class="empty-title">Artikel tidak ditemukan</h3>
          <p class="empty-text">Coba gunakan kata kunci yang berbeda atau pilih kategori lain</p>
          <button
            @click="resetSearch"
            class="reset-button"
          >
            🔄 Reset Pencarian
          </button>
        </div>

        <!-- Popular Articles Section -->
        <div v-if="popularArticles.length > 0" class="articles-section-wrapper">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-emoji">🔥</span>
              Artikel Populer
            </h2>
            <p class="section-subtitle">Artikel dengan pembaca terbanyak</p>
          </div>
          
          <div class="popular-articles-grid">
            <article 
              v-for="article in popularArticles" 
              :key="'popular-' + article.id"
              class="article-card popular-card"
              @click="openArticle(article)"
            >
              <div class="card-image">
                <img :src="article.image" :alt="article.title" class="article-image">
                <div class="card-badge">{{ article.category }}</div>
                <button 
                  class="save-btn" 
                  :class="{ saved: article.isSaved }"
                  @click.stop="toggleSave(article)"
                >
                  <span class="save-icon">{{ article.isSaved ? '❤' : '🤍' }}</span>
                </button>
              </div>
              
              <div class="card-content">
                <h3 class="card-title">{{ article.title }}</h3>
                <p class="card-excerpt">{{ article.excerpt }}</p>
                
                <div class="card-meta">
                  <div class="meta-left">
                    <span class="read-time">
                      <span class="meta-icon">⏱</span>
                      {{ article.readTime }} menit
                    </span>
                    <span class="card-date">{{ formatDate(article.date) }}</span>
                  </div>
                  <div class="meta-right">
                    <span class="views trending">
                      <span class="meta-icon">👁</span>
                      {{ formatNumber(article.views) }}
                    </span>
                    <span class="likes">
                      <span class="meta-icon">👍</span>
                      {{ formatNumber(article.likes) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <router-link to="/detailartikel" class="card-hover-overlay">
                <span class="read-more">Baca Selengkapnya →</span>
              </router-link>
            </article>
          </div>
        </div>

        <!-- Other Articles Section -->
        <div v-if="otherArticles.length > 0" class="articles-section-wrapper">
          <div class="section-header">
            <h2 class="section-title">
              <span class="section-emoji">📚</span>
              Artikel Lainnya
            </h2>
            <p class="section-subtitle">Jelajahi lebih banyak topik menarik</p>
          </div>
          
          <div class="articles-grid">
            <article 
              v-for="article in paginatedOtherArticles" 
              :key="'other-' + article.id"
              class="article-card"
              @click="openArticle(article)"
            >
              <div class="card-image">
                <img :src="article.image" :alt="article.title" class="article-image">
                <div class="card-badge">{{ article.category }}</div>
                <button 
                  class="save-btn" 
                  :class="{ saved: article.isSaved }"
                  @click.stop="toggleSave(article)"
                >
                  <span class="save-icon">{{ article.isSaved ? '❤' : '🤍' }}</span>
                </button>
              </div>
              
              <div class="card-content">
                <h3 class="card-title">{{ article.title }}</h3>
                <p class="card-excerpt">{{ article.excerpt }}</p>
                
                <div class="card-meta">
                  <div class="meta-left">
                    <span class="read-time">
                      <span class="meta-icon">⏱</span>
                      {{ article.readTime }} menit
                    </span>
                    <span class="card-date">{{ formatDate(article.date) }}</span>
                  </div>
                  <div class="meta-right">
                    <span class="views">
                      <span class="meta-icon">👁</span>
                      {{ formatNumber(article.views) }}
                    </span>
                    <span class="likes">
                      <span class="meta-icon">👍</span>
                      {{ formatNumber(article.likes) }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="card-hover-overlay">
                <span class="read-more">Baca Selengkapnya →</span>
              </div>
            </article>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination-container" v-if="otherArticlesTotalPages > 1 && otherArticles.length > 0">
          <button 
            class="pagination-btn prev" 
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            <span class="desktop-text">← Sebelumnya</span>
            <span class="mobile-arrow">←</span>
          </button>
          
          <div class="pagination-numbers">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              :class="['page-number', { active: currentPage === page }]"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            class="pagination-btn next" 
            :disabled="currentPage === otherArticlesTotalPages"
            @click="changePage(currentPage + 1)"
          >
            <span class="desktop-text">Selanjutnya →</span>
            <span class="mobile-arrow">→</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Mental Health Tips Carousel -->
    <section class="tips-section">
      <div class="tips-container">
        <h2 class="tips-title">💡 Tips Kesehatan Mental Hari Ini</h2>
        <div class="tips-carousel">
          <button class="carousel-nav prev" @click="prevTip" aria-label="Previous tip">
            ←
          </button>
          <button class="carousel-nav next" @click="nextTip" aria-label="Next tip">
            →
          </button>
          <div 
            v-for="(tip, index) in mentalHealthTips" 
            :key="index"
            :class="['tip-card', { active: activeTip === index }]"
          >
            <div class="tip-icon">{{ tip.icon }}</div>
            <h4 class="tip-title">{{ tip.title }}</h4>
            <p class="tip-content">{{ tip.content }}</p>
            <span class="tip-category">{{ tip.category }}</span>
          </div>
        </div>
        <div class="tips-navigation">
          <button 
            v-for="(tip, index) in mentalHealthTips" 
            :key="index"
            :class="['nav-dot', { active: activeTip === index }]"
            @click="setActiveTip(index)"
          ></button>
        </div>
      </div>
    </section>

    <!-- Floating Action Button -->
    <div class="fab-container">
      <button
        @click="scrollToTop"
        class="fab-button"
        :class="{ 'visible': showFab }"
      >
        ↑
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MentalHealthArticlesPage',
  data() {
    return {
      searchQuery: '',
      activeCategory: 'Semua',
      activeTip: 0,
      currentPage: 1,
      articlesPerPage: 6,
      showFab: false,
      categories: [
        { name: 'Semua', icon: '🌟' },
        { name: 'Stress', icon: '😰' },
        { name: 'Kecemasan', icon: '😟' },
        { name: 'Depresi', icon: '💙' },
        { name: 'Self-Care', icon: '🧘‍♀' },
        { name: 'Mindfulness', icon: '🧠' },
        { name: 'Hubungan', icon: '💕' },
        { name: 'Emosi', icon: '😃' }
      ],
      articles: [
        {
          id: 1,
          title: 'Mengatasi Kecemasan di Era Digital',
          excerpt: 'Pelajari strategi efektif untuk mengurangi kecemasan yang disebabkan oleh penggunaan media sosial dan teknologi modern.',
          category: 'Kecemasan',
          readTime: 5,
          date: new Date('2024-03-15'),
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop&crop=faces',
          views: 2543,
          likes: 189,
          isSaved: false
        },
        {
          id: 2,
          title: 'Self-Care Routine untuk Mahasiswa',
          excerpt: 'Rutinitas sederhana yang dapat membantu mahasiswa menjaga kesehatan mental selama masa kuliah yang penuh tekanan.',
          category: 'Self-Care',
          readTime: 7,
          date: new Date('2024-03-12'),
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&crop=faces',
          views: 1876,
          likes: 234,
          isSaved: true
        },
        {
          id: 3,
          title: 'Mindfulness untuk Pemula',
          excerpt: 'Panduan praktis memulai latihan mindfulness dalam kehidupan sehari-hari dengan teknik yang mudah dipraktikkan.',
          category: 'Mindfulness',
          readTime: 6,
          date: new Date('2024-03-10'),
          image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=250&fit=crop&crop=center',
          views: 3211,
          likes: 412,
          isSaved: false
        },
        {
          id: 4,
          title: 'Mengenali Tanda-tanda Burnout',
          excerpt: 'Pelajari cara mengidentifikasi dan mencegah burnout sebelum terlambat, serta strategi recovery yang efektif.',
          category: 'Stress',
          readTime: 8,
          date: new Date('2024-03-08'),
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop&crop=center',
          views: 4567,
          likes: 298,
          isSaved: false
        },
        {
          id: 5,
          title: 'Manajemen Stress di Tempat Kerja',
          excerpt: 'Strategi sehat untuk mengatasi tekanan pekerjaan tanpa harus mengorbankan kesehatan mental.',
          category: 'Stress',
          readTime: 6,
          date: new Date('2024-03-25'),
          image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=533&fit=crop&crop=center',
          views: 3298,
          likes: 289,
          isSaved: false
        },
        {
          id: 6,
          title: 'Teknik Pernapasan untuk Relaksasi',
          excerpt: 'Metode pernapasan sederhana yang dapat membantu menenangkan pikiran dan tubuh dalam situasi stres.',
          category: 'Mindfulness',
          readTime: 4,
          date: new Date('2024-03-03'),
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=250&fit=crop&crop=center',
          views: 1654,
          likes: 167,
          isSaved: false
        },
        {
          id: 7,
          title: 'Komunikasi Sehat dalam Hubungan',
          excerpt: 'Panduan untuk membangun komunikasi yang sehat dan efektif dalam hubungan interpersonal.',
          category: 'Hubungan',
          readTime: 6,
          date: new Date('2024-03-01'),
          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop&crop=faces',
          views: 2134,
          likes: 201,
          isSaved: false
        },
        {
          id: 8,
          title: 'Mengelola Kecemasan Sosial dalam Kehidupan Sehari-hari',
          excerpt: 'Tips untuk mengatasi rasa gugup berlebihan saat berada di lingkungan sosial atau bertemu orang baru.',
          category: 'Kecemasan',
          readTime: 5,
          date: new Date('2024-02-22'),
          image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&h=250&fit=crop&crop=center',
          views: 2754,
          likes: 219,
          isSaved: false
        },
        {
          id: 9,
          title: 'Latihan Pernapasan untuk Mengurangi Cemas',
          excerpt: 'Teknik pernapasan sederhana yang terbukti membantu menenangkan pikiran dan tubuh.',
          category: 'Kecemasan',
          readTime: 4,
          date: new Date('2024-03-15'),
          image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=533&fit=crop&crop=center',
          views: 2760,
          likes: 230,
          isSaved: false
        },
        {
          id: 10,
          title: 'Hubungan Sehat Dimulai dari Diri Sendiri',
          excerpt: 'Mengapa mengenal dan mencintai diri sendiri penting untuk membangun hubungan yang sehat.',
          category: 'Hubungan',
          readTime: 7,
          date: new Date('2024-03-03'),
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=250&fit=crop&crop=faces',
          views: 2078,
          likes: 212,
          isSaved: false
        },
        {
          id: 11,
          title: 'Mengatasi Stress dengan Aktivitas Fisik Ringan',
          excerpt: 'Olahraga ringan seperti jalan kaki dan yoga bisa menjadi solusi ampuh melawan stress.',
          category: 'Stress',
          readTime: 5,
          date: new Date('2024-03-09'),
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop&crop=center',
          views: 3187,
          likes: 264,
          isSaved: false
        },
        {
          id: 12,
          title: 'Menjaga Kesehatan Emosional dalam Hubungan Romantis',
          excerpt: 'Langkah-langkah membangun keterbukaan dan empati dengan pasangan demi hubungan yang sehat.',
          category: 'Hubungan',
          readTime: 6,
          date: new Date('2024-03-04'),
          image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&h=250&fit=crop&crop=faces',
          views: 2421,
          likes: 226,
          isSaved: true
        }
      ],
      mentalHealthTips: [
        {
          icon: '🌅',
          title: 'Morning Gratitude',
          content: 'Mulai hari dengan menyebutkan 3 hal yang kamu syukuri. Praktik sederhana ini dapat meningkatkan mood dan mindset positif sepanjang hari.',
          category: 'Mindfulness'
        },
        {
          icon: '💧',
          title: 'Hydration Check',
          content: 'Minum air putih secukupnya untuk menjaga mood tetap stabil. Dehidrasi ringan dapat mempengaruhi konsentrasi dan suasana hati.',
          category: 'Self-Care'
        },
        {
          icon: '🚶‍♀',
          title: 'Mini Walk Break',
          content: 'Berjalan selama 5-10 menit dapat meningkatkan energi, fokus, dan mengurangi stres. Coba keluar rumah dan nikmati udara segar.',
          category: 'Aktivitas'
        },
        {
          icon: '📱',
          title: 'Digital Detox',
          content: 'Matikan notifikasi selama 1-2 jam untuk mengurangi distraksi dan memberikan waktu untuk diri sendiri tanpa gangguan teknologi.',
          category: 'Balance'
        },
        {
          icon: '🎯',
          title: 'Deep Breathing',
          content: 'Lakukan teknik pernapasan 4-7-8: hirup selama 4 detik, tahan 7 detik, hembuskan 8 detik. Ulangi 3-4 kali untuk relaksasi instan.',
          category: 'Mindfulness'
        },
        {
          icon: '📝',
          title: 'Journal Time',
          content: 'Tulis 3 kalimat tentang perasaanmu hari ini. Journaling membantu memproses emosi dan meningkatkan kesadaran diri.',
          category: 'Self-Care'
        }
      ]
    }
  },
  computed: {
    filteredArticles() {
      let filtered = this.articles;
      
      if (this.activeCategory !== 'Semua') {
        filtered = filtered.filter(article => article.category === this.activeCategory);
      }
      
      if (this.searchQuery) {
        filtered = filtered.filter(article => 
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      return filtered;
    },
    totalPages() {
      return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.filteredArticles.slice(start, end);
    },
    visiblePages() {
      const pages = [];
      const total = this.otherArticlesTotalPages;
      const current = this.currentPage;
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (current > 4) pages.push('...');
        
        const start = Math.max(2, current - 2);
        const end = Math.min(total - 1, current + 2);
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        if (current < total - 3) pages.push('...');
        pages.push(total);
      }
      
      return pages;
    },
    popularArticles() {
      return this.filteredArticles
        .slice()
        .sort((a, b) => b.views - a.views)
        .slice(0, 3);
    },
    otherArticles() {
      const popularIds = this.popularArticles.map(article => article.id);
      return this.filteredArticles.filter(article => !popularIds.includes(article.id));
    },
    paginatedOtherArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.otherArticles.slice(start, end);
    },
    otherArticlesTotalPages() {
      return Math.ceil(this.otherArticles.length / this.articlesPerPage);
    }
  },
  mounted() {
    // Auto-rotate tips
    setInterval(() => {
      this.activeTip = (this.activeTip + 1) % this.mentalHealthTips.length;
    }, 5000);

    // Handle scroll for FAB
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.tipInterval) {
      clearInterval(this.tipInterval);
    }
  },
  methods: {
    getCircleStyle(index) {
      const colors = ['#86A788', '#FFFDEC', '#FFE2E2', '#FFCFCF'];
      const size = Math.random() * 60 + 20;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      
      return {
        width: size + 'px',
        height: size + 'px',
        left: left + '%',
        backgroundColor: colors[index % colors.length],
        animationDuration: animationDuration + 's',
        animationDelay: delay + 's'
      };
    },
    getCategoryCount(categoryName) {
      if (categoryName === 'Semua') {
        return this.articles.filter(article => {
          if (this.searchQuery) {
            return article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                   article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
          }
          return true;
        }).length;
      }
      
      return this.articles.filter(article => {
        const matchesCategory = article.category === categoryName;
        if (this.searchQuery) {
          const matchesSearch = article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                               article.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
          return matchesCategory && matchesSearch;
        }
        return matchesCategory;
      }).length;
    },
    filterArticles() {
      this.currentPage = 1;
    },
    setActiveCategory(category) {
      this.activeCategory = category;
      this.currentPage = 1;
    },
    setActiveTip(index) {
      this.activeTip = index;
    },
    nextTip() {
      this.activeTip = (this.activeTip + 1) % this.mentalHealthTips.length;
    },
    prevTip() {
      this.activeTip = this.activeTip === 0 
        ? this.mentalHealthTips.length - 1 
        : this.activeTip - 1;
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    toggleSave(article) {
      article.isSaved = !article.isSaved;
    },
    openArticle(article) {
      console.log('Opening article:', article.title);
    },
    resetSearch() {
      this.searchQuery = '';
      this.activeCategory = 'Semua';
      this.currentPage = 1;
    },
    handleScroll() {
      this.showFab = window.pageYOffset > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    formatDate(date) {
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* {
  box-sizing: border-box;
}

.articles-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #FFFDEC 0%, #FFE2E2 100%);
  font-family: 'Poppins', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Animated Background */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.3;
  animation: floatUpDown 20s infinite ease-in-out;
}

@keyframes floatUpDown {
  0%, 100% { 
    transform: translateY(100vh) rotate(0deg); 
    opacity: 0;
  }
  10%, 90% { 
    opacity: 0.3; 
  }
  50% { 
    transform: translateY(-100px) rotate(180deg); 
    opacity: 0.5;
  }
}

/* Hero Section */
.hero-section {
  padding: 1rem;
  text-align: center;
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
  height: auto !important;
  min-height: 20vh !important;
  margin-top: 3rem;

}


.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.title-main {
  color: #3c552d;
  display: block;
  background: linear-gradient(135deg, #3c552d, #86A788);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-sub {
  color: #CA7373;
  display: block;
  font-size: 0.8em;
}

.hero-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 400;
}

/* Search Section */
.search-section {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  border-radius: 2rem 2rem 0 0;
  margin-top: 2rem;
  position: relative;
  z-index: 1;
  overflow: visible; /* Pastikan tidak memotong hover effects */
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  padding-right: 5rem;
  border: 3px solid #86A788;
  border-radius: 2rem;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;
  outline: none;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 15px rgba(134, 167, 136, 0.1);
}

.search-input:focus {
  border-color: #3c552d;
  box-shadow: 0 0 0 3px rgba(60, 85, 45, 0.1), 0 8px 25px rgba(134, 167, 136, 0.15);
  transform: translateY(-2px);
}

.search-input::placeholder {
  color: #aaa;
  transition: color 0.3s ease;
}

.search-input:focus::placeholder {
  color: transparent;
}

.search-btn {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: #3c552d;
  color: white;
  border: none;
  border-radius: 1.5rem;
  padding: 0.8rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(60, 85, 45, 0.3);
}

.search-btn:hover {
  background: #CA7373;
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 6px 18px rgba(202, 115, 115, 0.4);
}

.search-text {
  font-size: 0.9rem;
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  overflow-x: auto;
  padding-bottom: 1rem; /* Tambah padding untuk ruang hover */
  padding-top: 0.5rem; /* Tambah padding atas juga */
}

.filter-tab {
  padding: 0.8rem 1.5rem;
  border: 2px solid #86A788;
  border-radius: 2rem;
  background: white;
  color: #3c552d;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Poppins', sans-serif;
  flex-shrink: 0;
}

.filter-tab:hover {
  background: #86A788;
  color: white;
  transform: translateY(-2px) scale(0.8); /* Ubah transform untuk tidak terlalu besar */
  box-shadow: 0 6px 20px rgba(134, 167, 136, 0.4); /* Shadow yang lebih besar */
  z-index: 10; /* Pastikan di atas elemen lain */
  position: relative; /* Untuk z-index bekerja */
}

.filter-tab.active {
  background: #3c552d;
  color: white;
  border-color: #3c552d;
  box-shadow: 0 4px 15px rgba(60, 85, 45, 0.3);
}

.tab-icon {
  font-size: 1rem;
}

/* Articles Section */
.articles-section {
  padding: 2rem 2rem;
  background: white;
  position: relative;
  z-index: 1;
}

.articles-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.empty-emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 0.5rem;
}

.empty-text {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.reset-button {
  background: #86A788;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 15px rgba(134, 167, 136, 0.3);
}

.reset-button:hover {
  background: #3c552d;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(60, 85, 45, 0.4);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.article-card {
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.article-card:hover::before {
  opacity: 1;
}

.article-card:active {
  transform: translateY(-4px) scale(0.98);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.article-card:hover .article-image {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #3c552d;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.save-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.save-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.save-btn:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.save-btn.saved {
  background: #FFE2E2;
}

.save-icon {
  font-size: 1.2rem;
}

.card-content {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.card-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #888;
}

.meta-left, .meta-right {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.read-time, .card-date, .views, .likes {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.meta-icon {
  font-size: 0.8rem;
}

.card-hover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(60, 85, 45, 0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
}

.article-card:hover .card-hover-overlay {
  opacity: 1;
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.pagination-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid #86A788;
  border-radius: 1rem;
  background: white;
  color: #3c552d;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 8px rgba(134, 167, 136, 0.15);
}

.pagination-btn:hover:not(:disabled) {
  background: #86A788;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(134, 167, 136, 0.3);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #86A788;
  border-radius: 50%;
  background: white;
  color: #3c552d;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 8px rgba(134, 167, 136, 0.15);
}

.page-number:hover {
  background: #86A788;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(134, 167, 136, 0.3);
}

.page-number.active {
  background: #3c552d;
  color: white;
  border-color: #3c552d;
  box-shadow: 0 4px 15px rgba(60, 85, 45, 0.3);
}

/* Tips Section */
.tips-section {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #FFFDEC, #FFE2E2);
  position: relative;
  z-index: 1;
}

.tips-container {
  max-width: 1200px;
  margin: 0 auto;
}

.tips-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 2rem;
}

.tips-carousel {
  position: relative;
  height: 350px;
  overflow: hidden;
  border-radius: 1.5rem;
  margin-bottom: 2rem;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  color: #3c552d;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.carousel-nav:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.carousel-nav.prev {
  left: 1rem;
}

.carousel-nav.next {
  right: 1rem;
}

.tip-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  padding: 2rem 1.5rem; /* Kurangi padding default */
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transform: translateX(100%);
  transition: all 0.5s ease;
  border-radius: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Mencegah overflow */
}

.tip-card.active {
  opacity: 1;
  transform: translateX(0);
}

.tip-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tip-content {
  font-size: 1rem; /* Kurangi ukuran font default */
  color: #666;
  line-height: 1.5;
  max-width: 90%; /* Buat lebih responsif dengan persentase */
  margin-bottom: 1rem;
  word-wrap: break-word; /* Agar teks panjang terbungkus */
  hyphens: auto; /* Auto hyphenation */
}

.tip-title {
  font-size: 1.3rem; /* Kurangi ukuran font default */
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 1rem;
  word-wrap: break-word;
}

.tip-category {
  display: inline-block;
  background: #86A788;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.tips-navigation {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: #3c552d;
  transform: scale(1.2);
}

.nav-dot:hover {
  background: #CA7373;
}

/* Floating Action Button */
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 100;
}

.fab-button {
  width: 3.5rem;
  height: 3.5rem;
  background: #3c552d;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(60, 85, 45, 0.4);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(100px);
  font-family: 'Poppins', sans-serif;
}

.fab-button.visible {
  opacity: 1;
  transform: translateY(0);
}

.fab-button:hover {
  background: #86A788;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(134, 167, 136, 0.6);
}

.fab-button:active {
  transform: scale(0.95);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .filter-tabs {
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #86A788 #f1f1f1;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 1.5rem 1.5rem;
  }

  .hero-title {
    font-size: clamp(2rem, 6vw, 3rem); 
  }
  
  .search-section {
    padding: 1.5rem 1rem;
    border-radius: 1.5rem 1.5rem 0 0;
  }
  
  .articles-section {
    padding: 2rem 1rem;
  }
  
  .tips-section {
    padding: 2rem 1rem;
  }
  
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .filter-tabs {
    gap: 0.5rem;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
  }
  
  .filter-tab {
    font-size: 0.8rem;
    padding: 0.6rem 1rem;
    flex-shrink: 0;
  }
  
  .tip-card {
    padding: 1.5rem 1rem;
  }
  
  .tips-title {
    font-size: 2rem;
  }

  .tip-icon {
    font-size: 2rem; /* Kurangi ukuran icon */
  }
  
  .tip-title {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  .tip-content {
    font-size: 0.9rem;
    line-height: 1.4;
    max-width: 95%;
  }
  
  .tips-carousel {
    height: 280px; /* Kurangi tinggi di mobile */
  }
  
  .pagination-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pagination-numbers {
    order: -1;
  }
  
  .card-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .meta-right {
    align-self: flex-end;
  }
  
  .desktop-text {
    display: none;
  }
  
  .mobile-arrow {
    display: inline;
  }

    .carousel-nav {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1rem;
  }
  
  .carousel-nav.prev {
    left: 0.5rem;
  }
  
  .carousel-nav.next {
    right: 0.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .search-input {
    padding-right: 4rem;
    font-size: 0.9rem;
  }
  
  .search-btn {
    padding: 0.6rem 1rem;
  }
  
  .search-text {
    font-size: 0.8rem;
  }
  
  .pagination-btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
  
  .tip-card {
    padding: 1rem 0.8rem;
  }

  .tips-carousel {
    height: 250px;
  }
  
  .tip-icon {
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
  }
  
  .tip-title {
    font-size: 1rem;
    margin-bottom: 0.6rem;
  }
  
  .tip-content {
    font-size: 0.85rem;
    line-height: 1.3;
    max-width: 98%;
    margin-bottom: 0.8rem;
  }

  .tip-category {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }

  .fab-container {
    bottom: 1rem;
    right: 1rem;
  }
  
  .fab-button {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
  }
}

@media (min-width: 769px) {
  .mobile-arrow {
    display: none;
  }
  
  .desktop-text {
    display: inline;
  }
}

/* Custom scrollbar for filter tabs */
.filter-tabs::-webkit-scrollbar {
  height: 4px;
}

.filter-tabs::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.filter-tabs::-webkit-scrollbar-thumb {
  background: #86A788;
  border-radius: 2px;
}

.filter-tabs::-webkit-scrollbar-thumb:hover {
  background: #3c552d;
}

/* Enhanced visual feedback */
.article-card:active {
  transform: translateY(-4px) scale(0.98);
}

.save-btn:active {
  transform: scale(0.9);
}

.pagination-btn:active:not(:disabled),
.page-number:active {
  transform: translateY(1px);
}

/* Focus states for accessibility */
.search-input:focus,
.filter-tab:focus,
.pagination-btn:focus,
.page-number:focus,
.nav-dot:focus,
.save-btn:focus,
.fab-button:focus {
  outline: 2px solid #CA7373;
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
button, input, .article-card, .tip-card {
  transition: all 0.3s ease;
}

/* Enhanced gradient effect */
.title-main {
  background: linear-gradient(135deg, #3c552d, #86A788);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Loading animation for images */
.article-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
}

/* Enhanced shadows and effects */
.search-input:focus,
.filter-tab:hover,
.article-card:hover,
.pagination-btn:hover:not(:disabled),
.page-number:hover,
.fab-button:hover {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Micro-interactions */
.search-input::placeholder {
  transition: opacity 0.3s ease;
}

.search-input:focus::placeholder {
  opacity: 0;
}

/* Enhanced button states */
.search-btn:active,
.filter-tab:active,
.pagination-btn:active:not(:disabled),
.page-number:active {
  transform: scale(0.98);
}

/* Empty state styles */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  max-width: 500px;
  margin: 0 auto;
  animation: fadeInUp 0.6s ease;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-emoji {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 0.5rem;
}

.empty-text {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.reset-button {
  background: #86A788;
  color: white;
  border: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 15px rgba(134, 167, 136, 0.3);
}

.reset-button:hover {
  background: #3c552d;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(60, 85, 45, 0.4);
}

.reset-button:active {
  transform: translateY(0) scale(0.98);
}

/* Articles Counter */
.articles-counter {
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
}

.counter-card {
  background: linear-gradient(135deg, #3c552d, #86A788);
  color: white;
  padding: 1.5rem 2.5rem;
  border-radius: 2rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(60, 85, 45, 0.3);
  transform: translateY(-10px);
  animation: counterPulse 2s ease-in-out infinite;
}

@keyframes counterPulse {
  0%, 100% { transform: translateY(-10px) scale(1); }
  50% { transform: translateY(-15px) scale(1.02); }
}

.counter-number {
  font-size: 2.5rem;
  font-weight: 800;
  display: block;
  line-height: 1;
}

.counter-text {
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.9;
  display: block;
  margin-top: 0.5rem;
}

/* Section Headers */
.articles-section-wrapper {
  margin-bottom: 4rem;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #86A788, #CA7373);
  border-radius: 2px;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #3c552d;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.section-emoji {
  font-size: 2.5rem;
  animation: sectionPulse 3s ease-in-out infinite;
}

@keyframes sectionPulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(5deg); }
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  font-weight: 400;
  opacity: 0.8;
}

/* Popular Articles Grid */
.popular-articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.popular-card {
  position: relative;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border: 2px solid transparent;
  background-clip: padding-box;
}

.popular-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border-radius: 1.5rem;
  padding: 2px;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: subtract;
  -webkit-mask-composite: xor;
  z-index: -1;
}

.popular-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #333;
  padding: 0.5rem 1.2rem;
  border-radius: 1.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  animation: popularBadgeShine 2s ease-in-out infinite;
}

@keyframes popularBadgeShine {
  0%, 100% { box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4); }
  50% { box-shadow: 0 6px 20px rgba(255, 215, 0, 0.6); }
}

.popular-emoji {
  font-size: 1rem;
  animation: crownRotate 3s ease-in-out infinite;
}

@keyframes crownRotate {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

.popular-text {
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Enhanced Views Counter for Popular Articles */
.popular-card .views.trending {
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.8rem;
  animation: trendingPulse 2s ease-in-out infinite;
}

@keyframes trendingPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .counter-card {
    padding: 1rem 2rem;
  }
  
  .counter-number {
    font-size: 2rem;
  }
  
  .counter-text {
    font-size: 0.9rem;
  }
  
  .section-title {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .section-emoji {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
  
  .popular-articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .popular-badge {
    font-size: 0.7rem;
    padding: 0.4rem 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 2rem 1rem 1rem;
  }

  .hero-title {
    font-size: clamp(1.8rem, 7vw, 2.5rem); /* Lebih nyaman untuk layar kecil */
  }
  .articles-section-wrapper {
    margin-bottom: 3rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .section-emoji {
    font-size: 1.8rem;
  }
  
  .counter-number {
    font-size: 1.8rem;
  }
  
  .popular-badge {
    top: -8px;
    font-size: 0.65rem;
    padding: 0.3rem 0.8rem;
  }
}

</style>