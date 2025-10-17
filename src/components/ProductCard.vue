<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
import { useUserStore } from '@/stores/UserStore'
import type { Product } from '@/types/Product'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const userStore = useUserStore()
const router = useRouter()

const handleAddToCart = (product: Product) => {
  if (!userStore.currentUser) {
    router.push('/signin')
    ElMessage.warning('You must be logged in to access this feature')

    return
  }

  productStore.addToCart(product, 1)
}

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <section id="card">
    <div v-if="products.length">
      <div class="product-grid">
        <div v-for="(product, index) in products" :key="index" class="card-link">
          <el-card class="product-card" shadow="hover">
            <router-link :to="`/product/${encodeURIComponent(product.name)}`">
              <img :src="product.image" class="product-image" />
              <div class="product-info">{{ product.name }}</div>
              <div class="product-description">{{ product.description }}</div>
            </router-link>
            <div class="card-buttom">
              <div class="product-info-price">₱{{ product.price.toLocaleString() }}</div>
              <el-button class="addToCart-btn" @click.stop="handleAddToCart(product)">
                <el-icon><ShoppingBag /></el-icon
              ></el-button>
            </div>
          </el-card>
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

.card-buttom {
  display: flex;
  justify-content: space-between;
}

.addToCart-btn {
  position: relative;
  font-size: 17px;
  cursor: pointer;

  padding: 10px 7px;
  border: none;
  transition: all 0.3s ease;
}

.addToCart-btn:hover {
  background-color: black;
  color: white;
  border-radius: 20px;
}
</style>
