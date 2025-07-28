<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ReceiptList from './ReceiptList.vue'

const props = defineProps<{
  visible: boolean
}>()

const user = useUserStore()
const product = useProductStore()
const dialogVisible = ref(props.visible)
const router = useRouter()
const isMobile = ref(window.innerWidth <= 768)

const checkoutItems = ref(product.getSelectedCartItems.slice())
const checkoutTotal = ref(product.getTotalSelectedCartItems)

onMounted(() => {
  const checkIsMobile = () => {
    isMobile.value = window.innerWidth <= 768
  }

  checkIsMobile()
  addEventListener('resize', checkIsMobile)
})

const handleClose = () => {
  checkoutItems.value = product.getSelectedCartItems.slice()
  checkoutTotal.value = product.getTotalSelectedCartItems

  product.checkout()
  router.push('/')
}

const emit = defineEmits(['update:visible'])
watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)
watch(dialogVisible, (v) => emit('update:visible', v))
</script>

<template>
  <section id="receipt">
    <el-dialog
      v-model="dialogVisible"
      :width="isMobile ? '95%' : '800px'"
      center
      close-on-click-modal
      @close="handleClose"
      class="receipt-dialog"
      :class="{ 'mobile-dialog': isMobile }"
    >
      <template #header>
        <div class="receipt-header">
          <h2 class="receipt-title">DIGIPLUS RECEIPT</h2>
          <p class="receipt-subtitle">Thank you for your order!</p>
        </div>
      </template>

      <div class="receipt-content">
        <div class="shipping-section">
          <h3 class="section-title">SHIPPING ADDRESS</h3>
          <div class="address-info">
            <p class="address-line">
              <strong>{{ user.currentUser?.firstName }} {{ user.currentUser?.lastName }}</strong>
            </p>
            <p class="address-line">{{ user.currentUser?.address?.street }}</p>
            <p class="address-line">{{ user.currentUser?.address?.city }}</p>
            <p class="address-line">{{ user.currentUser?.address?.country }}</p>
            <p class="address-line">{{ user.currentUser?.address?.postalCode }}</p>
          </div>
        </div>

        <div class="order-section">
          <h3 class="section-title">ORDER SUMMARY</h3>
          <div class="order-summary">
            <ReceiptList :items="checkoutItems" />
          </div>
        </div>

        <div class="total-section">
          <div class="total-row">
            <span class="total-label">SUBTOTAL:</span>
            <span class="total-amount">₱{{ checkoutTotal.toLocaleString() }}</span>
          </div>
          <div class="total-row shipping-fee">
            <span class="total-label">SHIPPING:</span>
            <span class="total-amount">FREE</span>
          </div>
          <div class="total-row grand-total">
            <span class="total-label">TOTAL:</span>
            <span class="total-amount">₱{{ checkoutTotal.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>

<style lang="css" scoped>
:deep(.receipt-dialog .el-dialog) {
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

:deep(.receipt-dialog .el-dialog__header) {
  padding: 24px 32px 0;
  border-bottom: none;
}

:deep(.receipt-dialog .el-dialog__body) {
  padding: 0 32px 32px;
}

.receipt-header {
  text-align: center;
  margin-bottom: 16px;
}

.receipt-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: 2px;
}

.receipt-subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.receipt-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.shipping-section,
.order-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 16px 0;
  letter-spacing: 1px;
}

.address-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.address-line {
  margin: 0;
  font-size: 14px;
  color: #495057;
  line-height: 1.4;
}

.address-line:first-child {
  font-size: 16px;
  color: #1a1a1a;
}

.order-summary {
  margin-top: 8px;
}

.total-section {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #000;
  margin-top: 8px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 16px;
}

.total-row.shipping-fee {
  color: #28a745;
  font-weight: 500;
}

.total-row.grand-total {
  border-top: 2px solid #000;
  margin-top: 12px;
  padding-top: 16px;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
}

.total-label {
  letter-spacing: 1px;
}

.total-amount {
  font-weight: 600;
}

.grand-total .total-amount {
  font-size: 24px;
  color: #000;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .receipt-title {
    font-size: 24px;
  }

  .total-row.grand-total {
    font-size: 18px;
  }

  .grand-total .total-amount {
    font-size: 20px;
  }

  .receipt-items-list.mobile-layout .receipt-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .receipt-items-list.mobile-layout .item-details {
    width: 100%;
  }

  .receipt-items-list.mobile-layout .item-total {
    width: 100%;
    text-align: left;
  }
}
</style>
