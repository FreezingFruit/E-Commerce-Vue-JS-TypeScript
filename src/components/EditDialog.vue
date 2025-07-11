<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore'
import { reactive, ref, watch } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['update:visible'])
const authStore = useAuthStore()

const dialogVisible = ref(props.visible)
watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)
watch(dialogVisible, (v) => emit('update:visible', v))

const form = reactive({
  firstName: '',
  lastName: '',
  phone: 0,
  street: '',
  city: '',
  country: '',
  postalCode: 0,
})

const submit = () => {}
</script>

<template>
  <el-dialog v-model="dialogVisible" class="modern-dialog">
    <div class="form-container">
      <el-form @submit.prevent="submit">
        <el-form-item label="FIRST NAME" class="form-field">
          <el-input v-model="form.firstName" type="firstName" clearable />
        </el-form-item>
        <el-form-item label="LAST NAME" class="form-field"
          ><el-input v-model="form.lastName" type="lastName" clearable
        /></el-form-item>
        <el-form-item label="PHONE NUMBER" class="form-field"
          ><el-input v-model="form.phone" type="phone" clearable
        /></el-form-item>
        <el-form-item label="STREET" class="form-field"
          ><el-input v-model="form.street" type="street" clearable
        /></el-form-item>
        <el-form-item label="CITY" class="form-field"
          ><el-input v-model="form.city" type="city" clearable
        /></el-form-item>
        <el-form-item label="COUNTRY" class="form-field"
          ><el-input v-model="form.country" type="country" clearable
        /></el-form-item>
        <el-form-item label="POSTAL CODE" class="form-field"
          ><el-input v-model="form.postalCode" type="postalCode" clearable
        /></el-form-item>
        <el-button type="primary" size="default" @click="submit"></el-button>
      </el-form>
    </div>
  </el-dialog>
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
