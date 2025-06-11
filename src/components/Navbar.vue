<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="logo">
        <img src="@/assets/logoLumora.png" alt="Logo" class="logo-img" />
      </router-link>
    </div>

    <div class="nav-right">
      <button class="hamburger" @click="toggleMenu">
        ☰
      </button>

      <ul :class="['nav-links', { show: isMobileMenuOpen }]">
       <li><router-link to="/artikel" @click="closeMenu">Artikel</router-link></li>
        <li><router-link to="/mood-tracker" @click="closeMenu">Mood Tracker</router-link></li>
        <li><router-link to="/kuis" @click="closeMenu">Tes & Kuis</router-link></li>
        <li class="profil-link"><router-link to="/chatbot" @click="closeMenu">chatbot</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarSection',
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMenu() {
      this.isMobileMenuOpen = false;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 30px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Poppins', sans-serif;
  position: relative;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 60px;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-links {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 25px;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links li a:hover {
  color: #e91e63;
}

.profil-link a {
  background-color: #ffe4ec;
  padding: 8px 16px;
  border-radius: 20px;
  color: #e91e63;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.profil-link a:hover {
  background-color: #fdd0dc;
  color: #b9134f;
}

.hamburger {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: #e91e63;
  background-color: #ffe4ec;
  padding: 6px 12px;
  border-radius: 8px;
}

/* Responsive for mobile */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 30px;
    background-color: #fff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 20px;
    z-index: 999;
    width: max-content;
  }

  .nav-links.show {
    display: flex;
  }

  .hamburger {
    display: block;
  }
}
</style>
