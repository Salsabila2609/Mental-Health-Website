<template>
    <div class="hero">
      <div class="hero-left">
        <h1>
          Where we empower you to embrace your unique
          <span>🧠🎨</span> personality and unleash your full potential
        </h1>
        <div class="test-stats">
          <button @click="startTest">Start Test</button>
          <span>236+ Tests taken today</span>
          <span>98% Results rated</span>
        </div>
        <div class="tags">
          <span class="tag">Bold personality</span>
          <span class="tag">Self-discovery</span>
          <span class="tag">Personal growth</span>
        </div>
      </div>
      <div class="hero-right">
        <img src="@/assets/logo.png" alt="People illustration" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      startTest() {
        alert('Test started!')
      }
    }
  }
  </script>
  
  <style scoped>
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 60px;
    background-color: #0d2b2e;
    color: white;
    border-radius: 30px;
    margin: 30px;
    flex-wrap: wrap;
  }
  
  .hero-left {
    flex: 1;
    min-width: 300px;
    max-width: 600px;
  }
  
  .hero-left h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .test-stats {
    margin: 20px 0;
  }
  
  .test-stats button {
    background-color: #fcbf49;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: bold;
    margin-right: 20px;
    cursor: pointer;
  }
  
  .test-stats span {
    display: inline-block;
    margin-right: 10px;
  }
  
  .tags .tag {
    display: inline-block;
    background-color: #3e7a5e;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.9rem;
    margin-right: 10px;
    margin-top: 5px;
    color: white;
  }
  
  .hero-right img {
    max-width: 400px;
    width: 100%;
    margin-top: 20px;
  }
  </style>