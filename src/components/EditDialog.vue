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
  <el-dialog v-model="dialogVisible">
    <el-form @submit.prevent="submit">
      <el-form-item label="FIRST NAME">
        <el-input v-model="form.firstName" type="firstName" clearable />
      </el-form-item>
      <el-form-item label="LAST NAME"
        ><el-input v-model="form.lastName" type="lastName" clearable
      /></el-form-item>
      <el-form-item label="PHONE NUMBER"
        ><el-input v-model="form.phone" type="phone" clearable
      /></el-form-item>
      <el-form-item label="STREET"
        ><el-input v-model="form.street" type="street" clearable
      /></el-form-item>
      <el-form-item label="CITY"
        ><el-input v-model="form.city" type="city" clearable
      /></el-form-item>
      <el-form-item label="COUNTRY"
        ><el-input v-model="form.country" type="country" clearable
      /></el-form-item>
      <el-form-item label="POSTAL CODE"
        ><el-input v-model="form.postalCode" type="postalCode" clearable
      /></el-form-item>
      <el-button type="primary" size="default" @click="submit"></el-button>
    </el-form>
  </el-dialog>
</template>
