<script lang="ts" setup>
import { useAuthStore } from '@/stores/AuthStore'

const authStore = useAuthStore()
</script>

<template>
  <section id="purchase-history">
    <h1>PURCHASE HISTORY</h1>
    <el-divider />
    <el-table
      v-if="authStore.currentUser?.purchaseHistory?.length"
      :data="authStore.currentUser?.purchaseHistory"
      style="width: 100%"
    >
      <el-table-column prop="date" label="Date">
        <template #default="{ row }">
          {{ new Date(row.date).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="Products Ordered">
        <template #default="{ row }">
          <ul v-for="item in row.items" :key="item">
            {{
              item.product.name
            }}
            *
            {{
              item.quantity
            }}
          </ul>
        </template></el-table-column
      >

      <el-table-column label="Total" align="right">
        <template #default="{ row }">
          ₱{{
            row.items
              .reduce((sum: number, it: any) => sum + it.product.price * it.quantity, 0)
              .toLocaleString()
          }}
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="description" />
  </section>
</template>

<style lang="css" scoped>
#purchase-history {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h1 {
  text-align: center;
  font-size: 24px;
}
</style>
