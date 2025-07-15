<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/UserStore'
import { userFormRules } from '@/composables/ruleForm'

const props = defineProps<{
  visible: boolean
  mode: 'login' | 'register'
}>()
const emit = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)
watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)
watch(dialogVisible, (v) => {
  if (v) currentMode.value = props.mode
  emit('update:visible', v)
})

//for swapping modes
const currentMode = ref(props.mode)
watch(
  () => props.mode,
  (v) => (currentMode.value = v),
)
// --------------------

const userStore = useUserStore()
const form = reactive({
  email: '',
  password: '',
  confirm: '',
})

const validForm = computed(() =>
  currentMode.value === 'register'
    ? form.email && form.password.length >= 6 && form.password === form.confirm
    : form.email && form.password,
)

const submit = () => {
  try {
    if (currentMode.value === 'register') {
      if (userStore.users.some((u) => u.email === form.email))
        throw new Error('Email already registered')
      userStore.register({
        id: Date.now(),
        email: form.email,
        password: form.password,
        address: {},
      })
      ElMessage.success('Registered!')
    } else {
      userStore.login(form.email, form.password)
      ElMessage.success('Logged in!')
    }
    dialogVisible.value = false
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    ElMessage.error(msg)
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currentMode === 'login' ? 'Login' : 'Register'"
    width="420px"
    align-center
    class="modern-dialog"
  >
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">
          {{ currentMode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT' }}
        </h2>
        <p class="form-subtitle">
          {{ currentMode === 'login' ? 'Sign in to your account' : 'Join us today' }}
        </p>
      </div>

      <el-form @submit.prevent="submit" class="modern-form" :rules="userFormRules" :model="form">
        <el-form-item prop="email" class="form-field">
          <label class="field-label">Email address</label>
          <el-input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="modern-input"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password" class="form-field">
          <label class="field-label">Password</label>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="modern-input"
            show-password
          />
        </el-form-item>

        <el-form-item prop="confirm-password" v-if="currentMode === 'register'" class="form-field">
          <label class="field-label">Confirm password</label>
          <el-input
            v-model="form.confirm"
            type="password"
            placeholder="Confirm your password"
            class="modern-input"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          :disabled="!validForm"
          @click="submit"
          class="submit-button"
          size="large"
        >
          {{ currentMode === 'login' ? 'Sign in' : 'Create account' }}
        </el-button>
      </el-form>

      <el-button
        type="primary"
        @click="currentMode = currentMode === 'login' ? 'register' : 'login'"
        class="switch-btn"
        size="large"
      >
        {{ currentMode === 'login' ? 'No Account? Sign up' : 'Have an account? Log in' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<style>
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

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-top: 20px;
  letter-spacing: -0.01em;
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
  margin-top: 20px;
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

.switch-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
  margin-top: 10px;
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
