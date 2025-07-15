<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'
import type { Product } from '@/types/Product'
import { ShoppingCart } from '@element-plus/icons-vue'
import { ref } from 'vue'
import AuthDialog from './AuthDialog.vue'
import { useUiStore } from '@/stores/UiStore'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const productStore = useProductStore()
const uiStore = useUiStore()
const searchText = ref('')
const router = useRouter()
const querySearchAsync = (queryString: string, cb: (results: Product[]) => void) => {
  const results = productStore.products.filter((product) =>
    product.name.toLowerCase().includes(queryString.toLowerCase()),
  )
  cb(results)
}

const handleSelect = (item: { name: string }) => {
  router.push(`/product/${encodeURIComponent(item.name)}`)
}

const logout = () => {
  ElMessage.success('Log out successful')
  userStore.logout()
  router.push('/')
}

const showLogin = ref(false)
const showRegister = ref(false)
</script>

<template>
  <section id="navbar">
    <el-header class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="dashboard-link">
          <div class="logo">
            <h1>DIGISHOP</h1>
          </div>
        </router-link>

        <el-autocomplete
          v-model="searchText"
          :fetch-suggestions="querySearchAsync"
          placeholder="Search for a product..."
          @select="handleSelect"
          value-key="name"
          class="search-bar"
          prefix-icon="Search"
          clearable
        />

        <div class="nav-links">
          <router-link to="/product" class="product-link">
            <h3>PRODUCTS</h3>
          </router-link>

          <span v-if="!userStore.currentUser" class="product-link" @click="showLogin = true">
            <h3>LOGIN</h3>
          </span>
          <span v-if="!userStore.currentUser" class="product-link" @click="showRegister = true">
            <h3>REGISTER</h3>
          </span>
          <AuthDialog v-model:visible="showLogin" mode="login" />
          <AuthDialog v-model:visible="showRegister" mode="register" />
          <AuthDialog
            v-model:visible="uiStore.loginDialogVisible"
            :mode="uiStore.loginDialogMode"
          />

          <router-link v-if="userStore.currentUser" to="/profile" class="product-link">
            <h3>PROFILE</h3>
          </router-link>
          <span v-if="userStore.currentUser" class="product-link" @click="logout">
            <h3>LOGOUT</h3>
          </span>

          <router-link to="/cart" class="cart-icon">
            <el-icon size="large"><ShoppingCart /></el-icon>
          </router-link>
        </div>
      </div>
    </el-header>
  </section>
</template>

<style lang="css" scoped>
.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 72px;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-container {
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* LOGO */
.logo h1 {
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  color: #222;
  letter-spacing: -0.5px;
}

/* SEARCH */
.search-bar {
  flex-grow: 1;
  max-width: 600px;
  margin: 0 24px;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-bar :deep(.el-input__wrapper:hover) {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2);
}

.search-bar :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

/* NAV LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-link,
.dashboard-link {
  text-decoration: none;
  color: inherit;
  position: relative;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.product-link:hover,
.dashboard-link:hover {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.06);
  transform: translateY(-2px);
}

.product-link::after,
.dashboard-link::after {
  content: '';
  position: absolute;
  left: 12px;
  bottom: 6px;
  width: calc(100% - 24px);
  height: 2px;
  background-color: #409eff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.product-link:hover::after,
.dashboard-link:hover::after {
  transform: scaleX(1);
}

.product-link h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
}

/* CART ICON */
.cart-icon {
  display: inline-flex;
  align-items: center;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 10px;
  border-radius: 8px;
}

.cart-icon:hover {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.06);
  transform: translateY(-1px);
}
</style>
