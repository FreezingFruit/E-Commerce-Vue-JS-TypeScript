<script lang="ts" setup>
import PersonalInformation from '@/components/PersonalInformation.vue'
import PurchaseHistory from '@/components/PurchaseHistory.vue'
import { ref } from 'vue'
const current = ref<'info' | 'history'>('info')
</script>

<template>
  <section id="profile" class="page-container">
    <div class="split-wrapper">
      <div class="left-side">
        <div class="sidebar">
          <h2 class="sidebar-title">PROFILE</h2>
          <div class="sidebar-menu">
            <div class="menu-item">
              <el-button type="primary" @click="current = 'info'">Personal Information</el-button>
            </div>
            <div class="menu-item">
              <el-button type="primary" @click="current = 'history'">Purchase History</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="content-wrapper">
          <component :is="current === 'info' ? PersonalInformation : PurchaseHistory" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.split-wrapper {
  display: flex;
  min-height: 100vh;
}

.left-side {
  width: 280px;
  background-color: #000;
  padding: 40px 0;
  flex-shrink: 0;
}

.avatar {
  margin-left: 30px;
}
.sidebar {
  padding: 0 30px;
}

.sidebar-title {
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 40px 0;
  letter-spacing: -0.5px;
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 500;
  cursor: default;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.right-side {
  flex: 1;
}

.content-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 40px;
}

:deep(.el-button) {
  background-color: black;
  min-width: 12rem;
  min-height: 4rem;
  border-color: white;
  border-radius: 10px;
  transition: all 0.3 ease-out;
  box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.2);
}

:deep(.el-button):hover {
  background-color: gray;
  border-color: white;
  box-shadow: 5px 5px 8px gray;
}
</style>
