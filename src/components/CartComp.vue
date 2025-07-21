<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
import { onMounted, ref } from 'vue'
const productStore = useProductStore()

const isMobile = ref(window.innerWidth <= 900)

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 900
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

function onQuantityChange(item: { product: { id: number } }, val: number) {
  productStore.updateQuantity(item.product.id, val)
}
</script>

<template>
  <section id="cart">
    <el-table v-if="!isMobile" :data="productStore.cartItems" style="width: 100%">
      <el-table-column label="Image">
        <template #default="{ row }">
          <img class="product-image" :src="row.product.image" />
        </template>
      </el-table-column>
      <el-table-column prop="product.name" label="Product Name" />
      <el-table-column label="Price">
        <template #default="{ row }"> ₱{{ row.product.price.toLocaleString() }} </template>
      </el-table-column>
      <el-table-column label="Quantity">
        <template #default="{ row }">
          <el-input-number v-model="row.quantity" :min="1" :max="100" @change="onQuantityChange" />
        </template>
      </el-table-column>
      <el-table-column label="Total">
        <template #default="{ row }">
          ₱{{ Math.floor(row.product.price * row.quantity).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column width="60px">
        <template #default="{ row }">
          <el-icon class="delete-icon" @click="productStore.deleteCartItem(row.product.id)"
            ><CircleCloseFilled
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>

    <div class="mobile-cards" v-if="isMobile">
      <el-card
        v-for="item in productStore.cartItems"
        :key="item.product.id"
        class="mobile-cart-item"
        shadow="hover"
      >
        <div class="item-header">
          <el-image :src="item.product.image" class="mobile-product-image" fit="cover" />
          <div class="item-details">
            <h4>{{ item.product.name }}</h4>
            <p class="price">₱{{ item.product.price.toLocaleString() }}</p>
          </div>
          <el-icon class="delete-icon" @click="productStore.deleteCartItem(item.product.id)"
            ><CircleCloseFilled
          /></el-icon>
        </div>
        <el-divider />
        <div class="item-footer">
          <div class="quantity-section">
            <span>Quantity:</span>
            <el-input-number
              v-model="item.quantity"
              :min="1"
              :max="100"
              size="small"
              @change="onQuantityChange"
            />
          </div>
          <div class="total">
            <el-tag type="success" size="large">
              ₱{{ Math.floor(item.product.price * item.quantity).toLocaleString() }}
            </el-tag>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<style lang="css" scoped>
h2 {
  text-align: center;
}

.product-image {
  width: 100px;
  margin-left: 10px;
}

:deep(.el-table__cell) {
  font-size: 16px;
}

.delete-icon {
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s ease-out;
}

.delete-icon:hover {
  color: rgb(226, 6, 6);
}

/* Mobile styles */
@media (max-width: 900px) {
  .mobile-cards {
    display: block;
    padding: 0 16px;
  }

  .mobile-cart-item {
    margin-bottom: 16px;
  }

  .item-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .mobile-product-image {
    width: 60px;
    height: 60px;
    border-radius: 4px;
  }

  .item-details {
    flex: 1;
  }

  .item-details h4 {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 500;
  }

  .price {
    margin: 0;
    color: var(--el-text-color-regular);
    font-size: 14px;
  }

  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .quantity-section {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
}
</style>
