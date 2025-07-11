<script lang="ts" setup>
import CartComp from '@/components/CartComp.vue'
import { useProductStore } from '@/stores/ProductStore'

const productStore = useProductStore()
</script>

<template>
  <section id="cart" class="page-container">
    <div class="cart-content">
      <h1>
        - - - YOUR CART {{ productStore.totalProducts }}
        {{ productStore.totalProducts == 1 ? 'ITEM' : 'ITEMS' }} - - -
      </h1>

      <div class="cart-main">
        <CartComp />

        <div class="summary">
          <h2>ORDER SUMMARY</h2>
          <el-divider />
          <p class="summary-price">TOTAL: ₱{{ productStore.subTotal.toLocaleString() }}</p>
          <el-divider />
          <el-button
            :disabled="!productStore.cartItems.length"
            class="checkoutBtn"
            type="primary"
            size="large"
            @click="productStore.checkout"
          >
            CHECK OUT
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
#cart {
  display: flex;
  flex-direction: column;
}

.cart-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

h1 {
  margin: 30px auto;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.cart-main {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.summary {
  padding: 32px;
  border-radius: 12px;
  align-self: flex-end;
  min-width: 350px;
  text-align: right;
}

.summary h2 {
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.summary-price {
  font-size: 25px;
  font-weight: 700;
  margin: 16px 0;
  color: #333;
}

.checkoutBtn {
  width: 100%;
  max-width: 300px;
  height: 55px;
  background-color: black;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease-in,
    transform 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease;
}

.checkoutBtn:hover {
  background-color: #333;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
  color: cadetblue;
}

.checkoutBtn:disabled {
  background-color: #ccc !important;
  color: #666 !important;
  border: none !important;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
