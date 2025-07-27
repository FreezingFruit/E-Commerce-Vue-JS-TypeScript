<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { reactive } from 'vue'

const userStore = useUserStore()

const stepState = reactive<Record<number, number>>({})

const nextStep = (orderId: number) => {
  const maxStep = 5
  stepState[orderId] = (stepState[orderId] ?? 0) + 1
  if (stepState[orderId] > maxStep) stepState[orderId] = 0
}
</script>

<template>
  <section id="order-timeline">
    <h2>TRACK YOUR ORDER</h2>
    <el-empty
      v-if="!userStore.currentUser?.purchaseHistory?.length"
      description="NO ORDERS TO TRACK"
    />
    <el-card
      class="timeline-card"
      v-for="order in userStore.currentUser?.purchaseHistory"
      :key="order.id"
      shadow="hover"
    >
      <el-empty v-if="!userStore.currentUser?.purchaseHistory?.length" description="description" />

      <el-collapse accordion>
        <el-collapse-item :title="`Order #${order.id}`">
          <ul class="product-list">
            <li v-for="item in order.items" :key="item.product.id">
              <span>{{ item.product.name }} X {{ item.quantity }}</span>
              <span>₱{{ (item.product.price * item.quantity).toLocaleString() }}</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <el-steps style="margin-top: 20px" :active="stepState[order.id] ?? 0" finish-status="success">
        <el-step title="Item Ordered" />
        <el-step title="Processing" />
        <el-step title="Shipped" />
        <el-step title="Out for Delivery" />
        <el-step title="Delivered" />
      </el-steps>
      <el-button class="timeline-btn" @click="nextStep(order.id)">Next step</el-button>
    </el-card>
  </section>
</template>

<style lang="css" scoped>
li {
  list-style: none;
}

.product-list {
  list-style: none;
  margin: 0;
  padding: 0 8px 8px;
  font-size: 17px;
  line-height: 1.6;
}

.product-list li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-list li:last-child {
  border-bottom: none;
}

.product-list li span:last-child {
  font-weight: 600;
  white-space: nowrap;
}
h2 {
  text-align: center;
}

.timeline-btn {
  margin-top: 10px;
  background-color: white;
  color: black;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  transition: all 0.5 ease-in;
  border: 1px solid black;
}

.timeline-btn:hover {
  background-color: black;
  color: white;
  box-shadow: 0 0 15px 10px rgba(0, 0, 0, 0.2);
  border: none;
}
.timeline-card {
  margin-top: 10px;
}

:deep(.el-collapse-item__header) {
  background: #fafafa;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.5px;
}
</style>
