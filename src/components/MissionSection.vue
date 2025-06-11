<template>
    <div class="mission">
      <h2>
        Our mission is to provide individuals with valuable insights into their personality
      </h2>
      <div class="info-boxes">
        <div class="box">
          <h3>Our Mission</h3>
          <p>Understand yourself better and unlock your growth potential.</p>
        </div>
        <div class="box">
          <h3>Our Expertise</h3>
          <p>Backed by psychology and data to ensure accurate personality insights.</p>
        </div>
        <div class="box">
          <h3>Our Approach</h3>
          <p>Friendly, engaging, and meaningful experiences tailored to you.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {}
  </script>
  
  <style scoped>
  .mission {
    padding: 60px 30px;
    text-align: center;
    background-color: #fdf6ee;
  }
  
  .mission h2 {
    font-size: 1.8rem;
    margin-bottom: 40px;
    color: #0d2b2e;
  }
  
  .info-boxes {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  }
  
  .box {
    background-color: #fff;
    padding: 20px;
    border-radius: 20px;
    width: 280px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    text-align: left;
  }
  
  .box h3 {
    color: #cc7351;
    margin-bottom: 10px;
  }
  </style>