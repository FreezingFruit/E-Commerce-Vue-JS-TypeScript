<script lang="ts" setup>
import { useUiStore } from '@/stores/UiStore'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthDialog from './AuthDialog.vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible'])

const userStore = useUserStore()
const uiStore = useUiStore()
const showLogin = ref(false)
const showRegister = ref(false)
const router = useRouter()

const logout = () => {
  ElMessageBox.confirm('Are you sure you want to logout?', 'Confirm Logout', {
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'No',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('Logout successful')
      userStore.logout()
      emit('update:visible', false)
      router.push('/')
    })
    .catch(() => {})
}
</script>

<template>
  <el-drawer
    :model-value="props.visible"
    @update:modelValue="(val: boolean) => emit('update:visible', val)"
    :withHeader="false"
    direction="rtl"
    size="70%"
    class="modern-drawer"
  >
    <div class="drawer-content">
      <router-link to="/" class="header-link"
        ><h2 class="drawer-header" data-hover="HOME">DIGISHOP</h2></router-link
      >

      <div class="nav-links">
        <router-link to="/product" class="nav-item">
          <h3>PRODUCTS</h3>
        </router-link>

        <span v-if="!userStore.currentUser" class="nav-item" @click="showLogin = true">
          <h3>LOGIN</h3>
        </span>
        <span v-if="!userStore.currentUser" class="nav-item" @click="showRegister = true">
          <h3>REGISTER</h3>
        </span>
        <AuthDialog
          v-model:visible="showLogin"
          mode="login"
          @success="emit('update:visible', false)"
        />
        <AuthDialog
          v-model:visible="showRegister"
          mode="register"
          @success="emit('update:visible', false)"
        />
        <AuthDialog v-model:visible="uiStore.loginDialogVisible" :mode="uiStore.loginDialogMode" />

        <router-link v-if="userStore.currentUser" to="/profile" class="nav-item">
          <h3>PROFILE</h3>
        </router-link>
        <span v-if="userStore.currentUser" class="nav-item" @click="logout">
          <h3>LOGOUT</h3>
        </span>

        <router-link to="/cart" class="cart-icon">
          <el-icon size="large"><ShoppingCart /></el-icon>
        </router-link>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="css" scoped>
:deep(.el-drawer) {
  background-color: #000;
  border-left: 1px solid #333;
}

.drawer-content {
  height: 100vh;
  padding: 2rem;
  color: black;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  padding: 1rem 0;
  border-bottom: 1px solid black;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.drawer-header:hover {
  padding-left: 1rem;
  background-color: black;
  color: transparent;
}

.drawer-header::after {
  content: attr(data-hover);
  position: absolute;
  top: 1;
  left: 0;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* Make the hover text appear */
.drawer-header:hover::after {
  opacity: 1;
  padding-left: 1rem;
}

.header-link {
  text-decoration: none;
  color: inherit;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.nav-item {
  position: relative;
  display: block;
  padding: 1rem 0;
  color: #111;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid black;
}

.nav-item:hover {
  background-color: black;
  padding-left: 1rem;
}

.nav-item h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}

.nav-item:hover h3 {
  color: #fff;
}

.cart-icon {
  margin-top: auto;
  padding: 1.5rem 0;
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid black;
  transition: all 0.3s ease;
}

.cart-icon:hover {
  background-color: black;

  color: #fff;
}

@media (max-width: 768px) {
  .drawer-content {
    padding: 1.5rem;
  }

  .drawer-header {
    font-size: 1.3rem;
    margin-bottom: 2rem;
  }

  .nav-item h3 {
    font-size: 1rem;
  }
}
</style>
