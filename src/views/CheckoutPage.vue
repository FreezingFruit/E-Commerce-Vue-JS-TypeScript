<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore'
import { useProductStore } from '@/stores/ProductStore'
import { ElMessage } from 'element-plus'
import { reactive, watchEffect } from 'vue'

const authStore = useAuthStore()
const productStore = useProductStore()
const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
})

const submitCheckout = () => {
  try {
    authStore.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: Number(form.phone) || 0,
      address: {
        street: form.street,
        city: form.city,
        postalCode: Number(form.postalCode) || 0,
        country: form.country,
      },
    })

    productStore.checkout()
    ElMessage.success('Credentials Added!')
  } catch {
    ElMessage.error('Something went wrong!')
  }
}

watchEffect(() => {
  const user = authStore.currentUser
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
  <section id="checkout" class="page-container">
    <div class="split-wrapper">
      <div class="left">
        <div class="form-container">
          <h2>SHIPPING ADDRESS</h2>
          <el-divider />
          <el-form @submit.prevent="submitCheckout" class="modern-form">
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

            <el-button type="primary" @click="submitCheckout" class="submit-button" size="large">
              CONTINUE TO DELIVERY
            </el-button>
          </el-form>
        </div>
      </div>
      <div class="right">
        <div class="summary-container">
          <h2>ORDER SUMMARY</h2>
          <div class="summary-content">
            <ul class="summary-list">
              <li
                v-for="item in productStore.cartItems"
                :key="item.product.id"
                class="summary-item"
              >
                <span class="item-name"> {{ item.product.name }} × {{ item.quantity }} </span>

                <span class="item-price">
                  ₱{{ (item.product.price * item.quantity).toLocaleString() }}
                </span>
              </li>
            </ul>
          </div>
          <strong class="total">SUBTOTAL: ₱{{ productStore.subTotal.toLocaleString() }}</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.split-wrapper {
  display: flex;
  min-height: 100vh;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 32px;
}
.modern-form {
  padding: 10px 50px;
}

.summary-list {
  list-style: none;
  padding: 0 50px;
  margin: 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.left,
.right {
  flex: 1;
}

.submit-button {
  background-color: #000000 !important;
  border: none;
  border-radius: 10px;
  align-items: center;
  width: 500px;
  height: 56px;
  letter-spacing: 1px;
  margin-top: 10px;
  transition: all 0.5 ease-out;
}

.submit-button:hover {
  background-color: gray;
  border-color: white;
  box-shadow: 5px 5px 8px gray;
}

.right {
  background: #fafafa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 32px;
}
.summary-container {
  background-color: transparent;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  width: 600px;
  height: 500px;
  border: solid 1px;
  box-shadow: 5px 5px 8px gray;
}

.summary-container h2 {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 2px;
  margin: 20px 0;
}

.summary-content {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 100%;
  overflow-y: auto;
  max-height: 300px;
}

.summary-content li {
  margin-bottom: 8px;
}

.summary-content ul {
  list-style: none;
}
.total {
  text-align: right;
  font-size: 24px;
  margin: auto 10px;
}
</style>
