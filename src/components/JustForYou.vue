<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
import { computed, ref } from 'vue'
import ProductCard from './ProductCard.vue'

const productStore = useProductStore()
const displayCount = ref(12)
const jfyProducts = computed(() => productStore.products.slice(0, displayCount.value))

const showMore = () => {
  displayCount.value += 12
}
</script>

<template>
  <section id="just-for-you">
    <h2 class="section-title">JUST FOR YOU</h2>

    <div class="product-row">
      <ProductCard :products="jfyProducts" />
    </div>

    <div class="show-more-container" v-if="displayCount < productStore.products.length">
      <el-button type="primary" @click="showMore">Show More</el-button>
    </div>
  </section>
</template>

<style lang="css" scoped>
#just-for-you {
  padding: 24px;
}

.section-title {
  font-weight: bold;
  text-align: center;
}

.product-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
  align-items: center;
}

.show-more-container {
  margin-top: 24px;
  text-align: center;
}

.show-more-container .el-button {
  background-color: black;
  color: white;
  border: none;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
  transition: all 0.3s ease;
  width: 500px;
  height: 50px;
}

.show-more-container .el-button:hover {
  background-color: #00448d;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  transform: translateY(-2px);
}
</style>
