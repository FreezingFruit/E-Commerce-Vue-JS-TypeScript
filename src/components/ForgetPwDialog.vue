<script lang="ts" setup>
import { forgetFormRules } from '@/composables/ruleForgetPassword'
import { useUserStore } from '@/stores/UserStore'
import type { FormInstance } from 'element-plus'
import { nextTick, reactive, ref, watch } from 'vue'

const form = reactive({
  email: '',
  password: '',
})

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['update:visible', 'success'])
const dialogVisible = ref(props.visible)
const formRef = ref<FormInstance | null>(null)
const userStore = useUserStore()

watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)

watch(
  () => props.visible,
  async (v) => {
    if (!v) {
      form.email = ''
      form.password = ''
      await nextTick()
      formRef.value?.clearValidate()
    }
  },
)

watch(dialogVisible, (v) => emit('update:visible', v))

const submit = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    userStore.forgetPassword(form.email, form.password)
    dialogVisible.value = false
    emit('success')
  } catch {}
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="Forget Password"
    class="modern-dialog"
    align-center
    width="580px"
  >
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">RESET PASSWORD</h2>
        <p class="form-subtitle">We'll help you set a new one</p>
      </div>

      <el-form
        :model="form"
        ref="formRef"
        :rules="forgetFormRules"
        class="modern-form"
        @submit.prevent="submit"
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
          <label class="field-label">New Password</label>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter new password"
            class="modern-input"
            show-password
          />
        </el-form-item>

        <el-button native-type="submit" type="primary" class="submit-button" size="large">
          Reset Password
        </el-button>
      </el-form>
    </div>
  </el-dialog>
</template>
