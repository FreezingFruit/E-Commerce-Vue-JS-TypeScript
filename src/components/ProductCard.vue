<script lang="ts" setup>
import type { Product } from '@/types/Product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section id="card">
    <div v-if="products.length">
      <div class="product-grid">
        <div v-for="(product, index) in products" :key="index" class="card-link">
          <router-link :to="`/product/${encodeURIComponent(product.name)}`">
            <el-card class="product-card" shadow="hover">
              <img :src="product.image" class="product-image" />
              <div class="product-info">{{ product.name }}</div>
              <div class="product-description">{{ product.description }}</div>
              <div class="product-info-price">₱{{ product.price.toLocaleString() }}</div>
            </el-card>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>NO PRODUCTS FOUND</h1>
    </div>
  </section>
</template>

<style lang="css" scoped>
#card {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 24px;
}

.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.product-card {
  width: 200px;
  transition: transform 0.2s ease-in-out;
  border: none;
  border-radius: 8px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.product-info {
  font-weight: 600;
  font-size: 14px;
  margin-top: 8px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-info-price {
  color: orangered;
  font-weight: bold;
  font-size: 16px;
  margin-top: 4px;
}

.product-description {
  font-weight: 400;
  font-size: 13px;
  color: #666;
  margin-top: 4px;
  line-height: 1.4;

  /* Multi-line ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  height: calc(1.4em * 2);
  max-height: calc(1.4em * 2);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-link a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}
</style>
