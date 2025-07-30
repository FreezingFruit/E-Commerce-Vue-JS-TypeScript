<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { ref } from 'vue'
import EditDialog from './EditDialog.vue'

const userStore = useUserStore()
const showEdit = ref(false)
</script>

<template>
  <section id="profile-information">
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
              <span>{{ userStore.currentUser?.firstName || 'No name entered' }}</span>
            </div>
            <div class="info-item">
              <label>Last Name</label>
              <span>{{ userStore.currentUser?.lastName || 'No name entered' }}</span>
            </div>
            <div class="info-item">
              <label>Phone</label>
              <span>{{ userStore.currentUser?.phone || 'No phone number entered' }}</span>
            </div>
          </div>
        </div>

        <el-divider />

        <div class="info-section">
          <h3>Address</h3>
          <div class="info-grid">
            <div class="info-item">
              <label>Street</label>
              <span>{{ userStore.currentUser?.address?.street || 'Missing street address' }}</span>
            </div>
            <div class="info-item">
              <label>City</label>
              <span>{{ userStore.currentUser?.address?.city || 'Missing city address' }}</span>
            </div>
            <div class="info-item">
              <label>Country</label>
              <span>{{
                userStore.currentUser?.address?.country || 'Missing country address'
              }}</span>
            </div>
            <div class="info-item">
              <label>Postal Code</label>
              <span>{{
                userStore.currentUser?.address?.postalCode || 'Missing postal code address'
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
  </section>

  <EditDialog v-model:visible="showEdit" />
</template>

<style lang="css" scoped>
.user-information {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.profile-header {
  text-align: center;
}

.profile-header h1 {
  font-size: 35px;
}

.profile-header p {
  font-size: 20px;
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

@media (max-width: 768px) {
  .user-information {
    padding: 24px;
  }
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
