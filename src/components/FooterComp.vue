<script lang="ts" setup></script>

<template>
  <section id="footer" class="footer">
    <a
      href="https://github.com/your-username"
      target="_blank"
      rel="noopener noreferrer"
      class="github-link"
    >
      <i class="fa-brands fa-github"></i>
      <span>© FreezingFruit</span>
    </a>
  </section>
</template>

<style lang="css" scoped>
.footer {
  width: 100%;
  min-height: 64px;
  background-color: #2c3e50;
  border-top: 1px solid #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  flex-shrink: 0; /* Prevent footer from shrinking */
}

.github-link {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #ecf0f1;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 4px;
}

.github-link:hover {
  color: #3498db;
  background-color: rgba(52, 152, 219, 0.1);
  transform: translateY(-1px);
}

.github-link i {
  font-size: 16px;
}
</style>
