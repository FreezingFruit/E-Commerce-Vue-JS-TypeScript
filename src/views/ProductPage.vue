<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/ProductStore'
const productStore = useProductStore()
</script>

<template>
  <section id="product" class="page-container">
    <div class="product-container">
      <span><h2>PRODUCTS</h2></span>
      <ProductCard :products="productStore.products" />
    </div>
  </section>
</template>

<style lang="css" scoped>
#product {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 24px 0;
}
main {
  flex: 1;
}
h2 {
  padding: 0 30px;
  text-align: center; /* ✅ Center text */
}
</style>
