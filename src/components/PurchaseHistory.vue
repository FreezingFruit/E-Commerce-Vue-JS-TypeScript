<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'

const userStore = useUserStore()
</script>

<template>
  <section id="purchase-history">
    <h1>PURCHASE HISTORY</h1>
    <el-divider />
    <el-table
      v-if="userStore.currentUser?.purchaseHistory?.length"
      :data="userStore.currentUser?.purchaseHistory"
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

      <el-table-column label="Total">
        <template #default="{ row }">
          ₱{{
            row.items
              .reduce((sum: number, it: any) => sum + it.product.price * it.quantity, 0)
              .toLocaleString()
          }}
        </template>
      </el-table-column>

      <el-table-column label="Clear History" align="right" width="100px">
        <template #default="{ row }">
          <el-icon class="delete-icon" @click="userStore.deletePurchaseHistory(row.id)"
            ><CircleCloseFilled
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="NO PURCHASE HISTORY" />
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

:deep(.el-table__cell) {
  font-size: 16px;
}
</style>
