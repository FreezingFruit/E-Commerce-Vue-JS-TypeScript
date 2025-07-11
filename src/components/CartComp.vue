<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
const productStore = useProductStore()
</script>

<template>
  <section id="cart">
    <el-table :data="productStore.cartItems" style="width: 100%">
      <el-table-column label="Image">
        <template #default="{ row }">
          <img class="product-image" :src="row.product.image" />
        </template>
      </el-table-column>
      <el-table-column prop="product.name" label="Product Name" />
      <el-table-column label="Price">
        <template #default="{ row }"> ₱{{ row.product.price.toLocaleString() }} </template>
      </el-table-column>
      <el-table-column prop="quantity" label="Quantity" />
      <!--ADD QUANTITY el-input-number-->
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
</style>
