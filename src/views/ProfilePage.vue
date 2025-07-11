<script lang="ts" setup>
import EditDialog from '@/components/EditDialog.vue'
import { useAuthStore } from '@/stores/AuthStore'
import { ref } from 'vue'

const authStore = useAuthStore()

const showEdit = ref(false)
</script>

<template>
  <section id="profile" class="page-container">
    <div class="split-wrapper">
      <div class="left-side">
        <div class="sidebar">
          <h2 class="sidebar-title">PROFILE</h2>
          <div class="sidebar-menu">
            <el-avatar
              class="avatar"
              :size="100"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            />
            <div class="menu-item">
              Welcome,<br />
              {{ authStore.currentUser?.email.split('@')[0] }}
            </div>
          </div>
        </div>
      </div>
      <div class="right-side">
        <div class="content-wrapper">
          <div class="profile-header">
            <h1>PERSONAL INFORMATION</h1>
            <p class="subtitle">Manage your personal details and contact information</p>
          </div>

          <div class="user-information">
            <div class="info-section">
              <h3>Basic Information</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>First Name</label>
                  <span>{{ authStore.currentUser?.firstName || 'No name entered' }}</span>
                </div>
                <div class="info-item">
                  <label>Last Name</label>
                  <span>{{ authStore.currentUser?.lastName || 'No name entered' }}</span>
                </div>
                <div class="info-item">
                  <label>Phone</label>
                  <span>{{ authStore.currentUser?.phone || 'No phone number entered' }}</span>
                </div>
              </div>
            </div>

            <el-divider />

            <div class="info-section">
              <h3>Address</h3>
              <div class="info-grid">
                <div class="info-item">
                  <label>Street</label>
                  <span>{{
                    authStore.currentUser?.address?.street || 'Missing street address'
                  }}</span>
                </div>
                <div class="info-item">
                  <label>City</label>
                  <span>{{ authStore.currentUser?.address?.city || 'Missing city address' }}</span>
                </div>
                <div class="info-item">
                  <label>Country</label>
                  <span>{{
                    authStore.currentUser?.address?.country || 'Missing country address'
                  }}</span>
                </div>
                <div class="info-item">
                  <label>Postal Code</label>
                  <span>{{
                    authStore.currentUser?.address?.postalCode || 'Missing postal code address'
                  }}</span>
                </div>
              </div>
            </div>

            <div class="action-section">
              <button class="edit-button" @click="showEdit = true">
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <EditDialog v-model:visible="showEdit" />
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

.profile-header {
  margin-bottom: 40px;
}

.profile-header h1 {
  color: #000;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 8px 0;
  letter-spacing: -0.8px;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
  font-weight: 400;
}

.user-information {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.info-section {
  margin-bottom: 32px;
}

.info-section:last-child {
  margin-bottom: 0;
}

.info-section h3 {
  color: #000;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  letter-spacing: -0.3px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item label {
  color: #666;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item span {
  color: #000;
  font-size: 16px;
  font-weight: 500;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.divider {
  height: 1px;
  background-color: #e5e5e5;
  margin: 32px 0;
}

.action-section {
  padding-top: 32px;
  border-top: 1px solid #e5e5e5;
}

.edit-button {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: -0.2px;
}

.edit-button:hover {
  background-color: #333;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.edit-button:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .split-wrapper {
    flex-direction: column;
  }

  .left-side {
    width: 100%;
    padding: 20px 0;
  }

  .sidebar {
    padding: 0 20px;
  }

  .sidebar-menu {
    flex-direction: row;
    overflow-x: auto;
    gap: 8px;
    padding-bottom: 8px;
  }

  .menu-item {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .content-wrapper {
    padding: 40px 20px;
  }

  .profile-header h1 {
    font-size: 28px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .user-information {
    padding: 24px;
  }
}
</style>
