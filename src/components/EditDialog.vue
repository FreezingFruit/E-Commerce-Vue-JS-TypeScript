<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { ElMessage } from 'element-plus'
import { reactive, ref, watch, watchEffect } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])
const userStore = useUserStore()

const dialogVisible = ref(props.visible)
watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)
watch(dialogVisible, (v) => emit('update:visible', v))

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
})

const submit = () => {
  try {
    userStore.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: Number(form.phone),
      address: {
        street: form.street,
        city: form.city,
        postalCode: Number(form.postalCode),
        country: form.country,
      },
    })
    ElMessage.success('Credentials Added!')
    dialogVisible.value = false
  } catch {
    ElMessage.error('Something went wrong!')
  }
}

watchEffect(() => {
  const user = userStore.currentUser
  if (!user) return
  form.firstName = user.firstName || ''
  form.lastName = user.lastName || ''
  form.phone = user.phone?.toString() || ''
  form.street = user.address?.street || ''
  form.city = user.address?.city || ''
  form.country = user.address?.country || ''
  form.postalCode = user.address?.postalCode?.toString() || ''
})
</script>

<template>
  <section id="edit">
    <el-dialog v-model="dialogVisible" width="420px" align-center class="modern-dialog">
      <div class="form-container">
        <el-form @submit.prevent="submit" class="modern-form">
          <el-form-item class="form-field">
            <label class="field-label">First Name</label>
            <el-input
              v-model="form.firstName"
              type="firstName"
              placeholder="Enter your first name"
              class="modern-input"
              clearable
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">Last Name</label>
            <el-input
              v-model="form.lastName"
              type="lastName"
              placeholder="Enter your last name"
              class="modern-input"
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">Phone Number</label>
            <el-input
              v-model="form.phone"
              type="phone"
              placeholder="Enter your phone number"
              class="modern-input"
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">Street</label>
            <el-input
              v-model="form.street"
              type="street"
              placeholder="Enter your street"
              class="modern-input"
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">City</label>
            <el-input
              v-model="form.city"
              type="city"
              placeholder="Enter your city"
              class="modern-input"
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">Country</label>
            <el-input
              v-model="form.country"
              type="city"
              placeholder="Enter your country"
              class="modern-input"
            />
          </el-form-item>

          <el-form-item class="form-field">
            <label class="field-label">Postal Code</label>
            <el-input
              v-model="form.postalCode"
              type="postalCode"
              placeholder="Enter your postal code"
              class="modern-input"
            />
          </el-form-item>

          <el-button type="primary" @click="submit" class="submit-button" size="large">
            Submit
          </el-button>
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<style lang="css" scoped>
.modern-dialog .el-dialog {
  border-radius: 16px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
}

.modern-dialog .el-dialog__header {
  display: none;
}

.modern-dialog .el-dialog__body {
  padding: 0;
}

.form-container {
  padding: 48px 32px 32px;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.form-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.modern-form {
  width: 100%;
}

.form-field {
  margin-bottom: 24px;
}

.form-field:last-of-type {
  margin-bottom: 32px;
}

.modern-input .el-input__wrapper {
  border-radius: 8px;
  border: 1.5px solid #e5e5e5;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: none;
}

.modern-input .el-input__wrapper:hover {
  border-color: #000;
}

.modern-input .el-input__wrapper.is-focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.modern-input .el-input__inner {
  font-size: 14px;
  color: #000;
  font-weight: 400;
}

.modern-input .el-input__inner::placeholder {
  color: #999;
  font-weight: 400;
}

.submit-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  background-color: black !;
  border: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
}

.submit-button:hover:not(.is-disabled) {
  background-color: #00beee;
  transform: translateY(-1px);
}

.submit-button:active:not(.is-disabled) {
  transform: translateY(0);
}

.submit-button.is-disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.modern-form .el-form-item {
  margin-bottom: 10px;
}

.modern-form .el-form-item__content {
  line-height: normal;
}

@media (max-width: 480px) {
  .form-container {
    padding: 32px 24px 24px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>
