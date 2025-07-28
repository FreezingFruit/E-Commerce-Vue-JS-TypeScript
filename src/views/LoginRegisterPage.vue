<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { computed, nextTick, reactive, ref, watch } from 'vue'
import ForgetPwDialog from '@/components/ForgetPwDialog.vue'
import { signInPageFormRules } from '@/composables/ruleFormSignInPage'

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})
const router = useRouter()
const userStore = useUserStore()
const formRef = ref<FormInstance | null>(null)
const currentMode = ref<'login' | 'register'>('login')
const formRules = ref<FormRules>(signInPageFormRules(form, currentMode.value) as FormRules)
const showForgetPassword = ref(false)
const validForm = computed(() =>
  currentMode.value === 'register'
    ? form.email && form.password.length >= 6 && form.password === form.confirmPassword
    : form.email && form.password,
)

const submit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

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
      router.push('/')
    } else {
      userStore.login(form.email, form.password)
      ElMessage.success('Logged in!')
      router.push('/')
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      const msg = err instanceof Error ? err.message : 'Something went wrong!'
      ElMessage.error(msg)
    }
  }
}

watch(currentMode, () => {
  formRules.value = signInPageFormRules(form, currentMode.value) as FormRules
})

watch(currentMode, async () => {
  form.email = ''
  form.password = ''
  form.confirmPassword = ''

  await nextTick()
  formRef.value?.clearValidate()
})
</script>

<template>
  <section id="signin">
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">
          {{ currentMode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT' }}
        </h2>
        <p class="form-subtitle">
          {{ currentMode === 'login' ? 'Sign in to your account' : 'Join us today' }}
        </p>
      </div>
      <el-form
        @submit.prevent="submit"
        class="modern-form"
        :rules="formRules"
        :model="form"
        ref="formRef"
        :key="currentMode"
      >
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
        <p
          v-if="currentMode === 'login'"
          class="forgot-password-link"
          @click="showForgetPassword = true"
        >
          Forgot password?
        </p>

        <el-form-item prop="confirmPassword" v-if="currentMode === 'register'" class="form-field">
          <label class="field-label">Confirm password</label>
          <el-input
            v-model="form.confirmPassword"
            type="confirmPassword"
            placeholder="Confirm your password"
            class="modern-input"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          :disabled="!validForm"
          class="submit-button"
          size="large"
          native-type="submit"
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
      <ForgetPwDialog v-model:visible="showForgetPassword" />
    </div>
  </section>
</template>

<style lang="css" scoped>
#signin {
  min-height: 100vh;
}
.form-container {
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  align-items: center;
  justify-content: center;
  padding: 20px;
  max-width: 55rem;

  border: 1px solid inherit;
  border-radius: 10px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
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

.submit-button.is-disabled {
  background-color: rgba(128, 128, 128, 0.459);
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

.forgot-password-link {
  margin-top: 25px;
  font-size: 13px;
  color: #409eff;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}
.forgot-password-link:hover {
  color: #66b1ff;
}

@media (max-width: 768px) {
  .form-container {
    padding: 24px 16px;
    margin: 30px 16px;
  }

  .form-title {
    font-size: 20px;
  }

  .form-subtitle {
    font-size: 13px;
  }
}
</style>
