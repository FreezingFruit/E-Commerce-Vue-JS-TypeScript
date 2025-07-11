<script lang="ts" setup>
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/ProductStore'
import { useRoute } from 'vue-router'

const productStore = useProductStore()
const route = useRoute()

const categoryName = route.params.name as string
const productCategory = productStore.filtheredCategories(categoryName)
</script>

<template>
  <section id="category" class="page-container">
    <h2>{{ categoryName.toUpperCase() }}</h2>
    <ProductCard :products="productCategory" />
  </section>
</template>

<style lang="css" scoped>
#category {
  background-color: #f5f5f5;
}

h2 {
  padding: 10px 0;
  text-align: center;
}
</style>
