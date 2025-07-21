<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'
import { ElMessage, type FormInstance } from 'element-plus'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'

import ReceiptDialog from '@/components/ReceiptDialog.vue'
import { shippingDetailsRules } from '@/composables/ruleFormShipping'

const userStore = useUserStore()
const formRef = ref<FormInstance>()
const productStore = useProductStore()
const showReceipt = ref(false)
const loading = ref(false)
const isMobile = ref(window.innerWidth <= 768)

onMounted(() => {
  const checkIfMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  checkIfMobile()
  addEventListener('resize', checkIfMobile)
})
const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
})

const submitCheckout = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    await new Promise((resolve) => setTimeout(resolve, 1000))
    userStore.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        postalCode: Number(form.postalCode) || 0,
        country: form.country,
      },
    })

    showReceipt.value = true
    //no need for el message the checkout function handles it
  } catch {
    ElMessage.error('Invalid Submission')
  } finally {
    loading.value = false
  }
}

const isFormComplete = computed(
  () =>
    form.firstName &&
    form.lastName &&
    form.phone &&
    form.street &&
    form.city &&
    form.country &&
    form.postalCode,
)

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
  <section id="checkout" class="page-container">
    <div class="split-wrapper" :class="{ 'mobile-layout': isMobile }">
      <div class="left">
        <div class="form-container">
          <h2>SHIPPING ADDRESS</h2>
          <el-divider />
          <el-form
            @submit.prevent="submitCheckout"
            class="modern-form"
            :model="form"
            ref="formRef"
            :rules="shippingDetailsRules"
          >
            <el-form-item class="form-field" prop="firstName">
              <label class="field-label">First Name</label>
              <el-input
                v-model="form.firstName"
                type="firstName"
                placeholder="Enter your first name"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="lastName">
              <label class="field-label">Last Name</label>
              <el-input
                v-model="form.lastName"
                type="lastName"
                placeholder="Enter your last name"
                class="modern-input"
              />
            </el-form-item>

            <el-form-item class="form-field" prop="phone">
              <label class="field-label">Phone Number</label>
              <el-input
                v-model="form.phone"
                type="phone"
                placeholder="Enter your phone number"
                class="modern-input"
              />
            </el-form-item>

            <el-form-item class="form-field" prop="street">
              <label class="field-label">Street</label>
              <el-input
                v-model="form.street"
                type="street"
                placeholder="Enter your street"
                class="modern-input"
              />
            </el-form-item>

            <el-form-item class="form-field" prop="city">
              <label class="field-label">City</label>
              <el-input
                v-model="form.city"
                type="city"
                placeholder="Enter your city"
                class="modern-input"
              />
            </el-form-item>

            <el-form-item class="form-field" prop="country">
              <label class="field-label">Country</label>
              <el-input
                v-model="form.country"
                type="city"
                placeholder="Enter your country"
                class="modern-input"
              />
            </el-form-item>

            <el-form-item class="form-field" prop="postalCode">
              <label class="field-label">Postal Code</label>
              <el-input
                v-model="form.postalCode"
                type="postalCode"
                placeholder="Enter your postal code"
                class="modern-input"
              />
            </el-form-item>

            <el-button
              type="primary"
              :disabled="!isFormComplete || !productStore.cartItems.length"
              class="submit-button"
              size="large"
              native-type="submit"
              :loading="loading"
            >
              <template v-if="!loading">CONTINUE TO DELIVERY</template>
              <template v-else>Processing...</template>
            </el-button>
          </el-form>
        </div>
      </div>
      <div class="right">
        <div class="summary-container" :class="{ 'mobile-summary': isMobile }">
          <h2>ORDER SUMMARY</h2>
          <div v-if="productStore.cartItems.length" class="summary-content">
            <ul class="summary-list">
              <el-divider />
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
              <el-divider />
            </ul>
          </div>

          <el-empty v-else description="NO ORDERS FOUND" />
          <strong class="total">SUBTOTAL: ₱{{ productStore.subTotal.toLocaleString() }}</strong>
        </div>
      </div>
    </div>

    <ReceiptDialog v-model:visible="showReceipt" />
  </section>
</template>

<style lang="css" scoped>
.split-wrapper {
  display: flex;
  min-height: 100vh;
}
.left,
.right {
  flex: 1;
}

.right {
  background: #fafafa;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 48px 32px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;
  padding: 48px 32px;
  align-items: center;
}
.modern-form {
  padding: 10px 20px;
  list-style: none;
  max-width: 500px;
}

.summary-list {
  list-style: none;
  padding: 0 20px;
  margin: 0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.submit-button {
  background-color: #000000 !important;
  border: none;
  border-radius: 10px;
  align-items: center;
  width: 100%;
  max-width: 500px;
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

.submit-button:disabled {
  background-color: gray !important;
}

.submit-button.is-loading {
  background-color: gray !important;
  opacity: 0.85;
}

.summary-container {
  background-color: transparent;
  color: black;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
  min-width: 300px;
  max-width: 600px;
  width: 100%;
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

@media (max-width: 768px) {
  .split-wrapper.mobile-layout {
    flex-direction: column;
    min-height: auto;
  }

  .form-container {
    padding: 24px 16px;
  }

  .modern-form {
    padding: 10px 0;
  }

  .submit-button {
    width: 100%;
    height: 48px;
  }

  .right {
    padding: 24px 16px;
  }

  .summary-container.mobile-summary {
    min-width: auto;
    width: 100%;
    height: auto;
    min-height: 300px;
  }

  .summary-list {
    padding: 0 16px;
  }

  .summary-container h2 {
    font-size: 20px;
  }

  .total {
    font-size: 20px;
    margin: 16px 10px;
  }
}
</style>
