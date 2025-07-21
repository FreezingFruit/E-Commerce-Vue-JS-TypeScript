<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
const productStore = useProductStore()
</script>

<template>
  <section id="receipt-items">
    <div class="receipt-table-container">
      <div class="receipt-items-list">
        <div v-for="item in productStore.cartItems" :key="item.product.id" class="receipt-item">
          <div class="item-image-container">
            <img class="item-image" :src="item.product.image" :alt="item.product.name" />
          </div>

          <div class="item-details">
            <h4 class="item-name">{{ item.product.name }}</h4>
            <div class="item-info">
              <span class="item-price">₱{{ item.product.price.toLocaleString() }}</span>
              <span class="item-separator">×</span>
              <span class="item-quantity">{{ item.quantity }}</span>
            </div>
          </div>

          <div class="item-total">
            <span class="total-price"
              >₱{{ (item.product.price * item.quantity).toLocaleString() }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.receipt-table-container {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
}

.receipt-items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.receipt-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
}

.receipt-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-image-container {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.item-image:hover {
  transform: scale(1.05);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6c757d;
}

.item-price {
  font-weight: 500;
  color: #495057;
}

.item-separator {
  color: #adb5bd;
  font-weight: 400;
}

.item-quantity {
  font-weight: 500;
  color: #495057;
}

.item-total {
  flex-shrink: 0;
  text-align: right;
}

.total-price {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
}

/* Scrollbar styling */
.receipt-table-container::-webkit-scrollbar {
  width: 6px;
}

.receipt-table-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.receipt-table-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.receipt-table-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

@media (max-width: 480px) {
  .receipt-item {
    padding: 12px;
    gap: 12px;
  }

  .item-image-container {
    width: 50px;
    height: 50px;
  }

  .item-name {
    font-size: 14px;
  }

  .item-info {
    font-size: 12px;
  }

  .total-price {
    font-size: 14px;
  }
}

.receipt-items-list:empty::before {
  content: 'No items in cart';
  display: block;
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-style: italic;
}
</style>
