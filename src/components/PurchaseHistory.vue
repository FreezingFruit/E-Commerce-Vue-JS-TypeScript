<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()
const isMobile = ref(window.innerWidth <= 1175)

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 1175
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
</script>

<template>
  <section id="purchase-history">
    <div class="history-container" v-if="!isMobile">
      <div class="table-wrapper">
        <h1>PURCHASE HISTORY</h1>
        <el-divider />
        <el-table
          v-if="userStore.currentUser?.purchaseHistory?.length"
          :data="userStore.currentUser?.purchaseHistory"
          class="table"
        >
          <el-table-column prop="date" label="Date" min-width="120">
            <template #default="{ row }">
              {{ new Date(row.date).toLocaleString() }}
            </template>
          </el-table-column>
          <el-table-column label="Products Ordered" min-width="120">
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

          <el-table-column label="Total" min-width="120">
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
      </div>
    </div>

    <!-------------MOBILE VIEW--------------->

    <div class="mobile-container" v-if="isMobile">
      <h1>PURCHASE HISTORY</h1>
      <el-divider />
      <el-empty
        v-if="!userStore.currentUser?.purchaseHistory?.length"
        description="NO PURCHASE HISTORY"
      />
      <el-card
        class="history-card"
        v-for="(order, index) in userStore.currentUser?.purchaseHistory"
        :key="index"
      >
        <el-button class="delete-btn" @click="userStore.deletePurchaseHistory(order.id)"
          ><el-icon><Close /></el-icon
        ></el-button>

        <el-collapse accordion>
          <el-collapse-item :title="`Order #${order.id}`">
            <ul class="history-list">
              <li v-for="item in order.items" :key="item.product.id">
                <span>{{ item.product.name }} X {{ item.quantity }}</span>
                <span>₱{{ (item.product.price * item.quantity).toLocaleString() }}</span>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </section>
</template>

<style lang="css" scoped>
#purchase-history {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: 100%;
}

.history-container {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

h1 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 5px;
}

:deep(.el-table__cell) {
  font-size: 16px;
}

.history-card {
  padding: 10px 20px;
  margin-top: 10px;
}

.history-list li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.delete-btn {
  padding: 10px 20px;
  margin-bottom: 10px;
  color: black;
  background-color: white;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background-color: black;
  transform: scale(1.1);
  color: white;
  border: none;
}

@media (max-width: 768px) {
  #purchase-history {
    padding: 16px;
    overflow: hidden;
  }

  .table-wrapper {
    margin: 0 -16px;
    padding: 0 16px;
  }
}
</style>
