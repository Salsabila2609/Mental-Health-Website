<template>
    <nav class="navbar">
      <div class="logo">KesehatanMentalApp</div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/chatbot">Chatbot Konseling</router-link></li>
        <li><router-link to="/artikel">Artikel</router-link></li>
        <li><router-link to="/mood-tracker">Mood Tracker</router-link></li>
        <li><router-link to="/kuis">Tes & Kuis</router-link></li>
        <li><router-link to="/profil">Profil</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarSection'
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fdfdfd;
    padding: 15px 30px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .logo {
    font-size: 20px;
    font-weight: bold;
    color: #e91e63; /* pink */
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
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
  </style>