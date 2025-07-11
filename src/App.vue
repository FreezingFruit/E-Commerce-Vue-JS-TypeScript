<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
const { layout } = useLayout()
</script>

<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<style lang="css">
/* Global styles - not scoped so they apply everywhere */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.page-container {
  flex: 1;
  min-height: calc(100vh - 64px);

  background-color: #f5f5f5;
}

/* Global responsive utilities */
@media (max-width: 768px) {
  .page-container {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .page-container {
    padding: 12px;
  }
}
</style>

<style lang="css" scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
