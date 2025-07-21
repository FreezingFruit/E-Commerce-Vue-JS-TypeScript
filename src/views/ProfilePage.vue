<script lang="ts" setup>
import OrderTimeline from '@/components/OrderTimeline.vue'
import PersonalInformation from '@/components/PersonalInformation.vue'
import ProfileMenuDrawer from '@/components/ProfileMenuDrawer.vue'
import PurchaseHistory from '@/components/PurchaseHistory.vue'
import { computed, onMounted, ref } from 'vue'

type View = 'info' | 'history' | 'timeline'
const current = ref<View>('info')
const isMobile = ref(window.innerWidth <= 768)
const showDrawer = ref(false)

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

const currentComponent = computed(() => {
  switch (current.value) {
    case 'info':
      return PersonalInformation
    case 'history':
      return PurchaseHistory
    case 'timeline':
      return OrderTimeline

    default:
      return null
  }
})
</script>

<template>
  <section id="profile" class="page-container">
    <div class="split-wrapper">
      <el-icon v-if="isMobile" class="menu-mobile" @click="showDrawer = true"
        ><MoreFilled
      /></el-icon>
      <div class="left-side" v-if="!isMobile">
        <div class="sidebar">
          <h2 class="sidebar-title">PROFILE</h2>
          <div class="sidebar-menu">
            <div class="menu-item">
              <el-button class="menu-btn" type="primary" @click="current = 'info'"
                >Personal Information</el-button
              >
            </div>
            <div class="menu-item">
              <el-button class="menu-btn" type="primary" @click="current = 'history'"
                >Purchase History</el-button
              >
            </div>
            <div class="menu-item">
              <el-button class="menu-btn" type="primary" @click="current = 'timeline'"
                >Track your order</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="content-wrapper">
          <component :is="currentComponent" />
        </div>
      </div>
    </div>
    <ProfileMenuDrawer
      v-model:visible="showDrawer"
      @mode="
        (val) => {
          current = val
          showDrawer = false
        }
      "
    />
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
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 40px;
}

.menu-btn {
  background-color: black;
  min-width: 12rem;
  min-height: 4rem;
  border-color: white;
  border-radius: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.2);
}

.menu-btn:hover {
  background-color: gray;
  border-color: white;
  box-shadow: 5px 5px 8px gray;
}

.menu-mobile {
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-mobile:hover {
  transform: scale(1.2);
  background-color: black;
  color: white;
  border-radius: 20px;
}
</style>
