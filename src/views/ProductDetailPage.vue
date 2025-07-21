<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Product } from '@/types/Product'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const quantity = ref(1)
const userStore = useUserStore()

const product = ref<Product | undefined>()

const loadProduct = () => {
  const productName = route.params.name as string
  product.value = productStore.products.find((p) => p.name === decodeURIComponent(productName))
}

loadProduct()

watch(
  () => route.params.name,
  () => {
    loadProduct()
  },
)

const handleBuyNow = () => {
  if (!userStore.isLoggedIn) {
    router.push('/signin')
    ElMessage.warning('You must be logged in to access this feature')
    return
  }
  if (userStore.isLoggedIn) {
    if (product.value) {
      productStore.addToCart(product.value, quantity.value)
      router.push('/cart')
    } else {
      console.error('Product not found')
    }
  } else {
    router.push('/signin')
    ElMessage.warning('You must be logged in to access this feature')
  }
}

const handleAddToCart = () => {
  if (!userStore.isLoggedIn) {
    router.push('/signin')
    ElMessage.warning('You must be logged in to access this feature')

    return
  }
  productStore.addToCart(product.value!, quantity.value)
}
</script>

<template>
  <section id="details" class="page-container">
    <div v-if="product" class="product-details">
      <div class="product-image-container">
        <img :src="product.image" class="detail-image" />
      </div>

      <div class="product-info-container">
        <h2>{{ product.name }}</h2>

        <p class="description">{{ product.description }}</p>

        <p class="price">₱{{ product.price.toLocaleString() }}</p>

        <el-form-item label="Quantity" size="normal" class="quantity">
          <el-input-number v-model="quantity" size="normal" label="Quantity" :min="1" :max="100">
          </el-input-number>
        </el-form-item>

        <div class="button-container">
          <el-button class="action-button primary-button" type="primary" @click="handleBuyNow"
            >Buy Now</el-button
          >

          <el-button class="action-button secondary-button" type="default" @click="handleAddToCart"
            >Add To Cart</el-button
          >
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h1>PRODUCT NOT FOUND</h1>
    </div>
  </section>
</template>

<style lang="css" scoped>
#details {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  min-height: 100vh;
  background-color: #f8f9fa;
}

:deep(.el-button) {
  margin-left: 0 !important;
}

.product-details {
  display: flex;
  gap: 32px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
  width: 100%;
  margin-top: 20px;
  border: 1px solid #e5e7eb;
}

.product-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
}

.detail-image {
  width: 100%;
  max-width: 450px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  object-fit: cover;
  background-color: #fafafa;
}

.product-info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
}

.product-info-container h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #111827;
  line-height: 1.3;
}

.description {
  font-size: 16px;
  color: #374151;
  margin-bottom: 24px;
  line-height: 1.6;
}

.price {
  color: #111827;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 24px;
  padding: 12px 0;
}

.quantity {
  margin-bottom: 32px;
}

.quantity :deep(.el-form-item__label) {
  color: #111827;
  font-weight: 500;
}

.button-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.action-button {
  flex: 1;
  min-width: 180px;
  min-height: 48px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
}

.primary-button {
  background-color: #111827;
  color: white;
  border: 2px solid #111827;
}

.primary-button:hover {
  background-color: #374151;
  border-color: #374151;
  transform: translateY(-2px);
}

.secondary-button {
  background-color: white;
  color: #111827;
  border: 2px solid #111827;
  margin-left: 0;
}

.secondary-button:hover {
  background-color: #f9fafb;
  transform: translateY(-2px);
}

.not-found {
  text-align: center;
  padding: 48px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.not-found h1 {
  color: #111827;
  font-size: 24px;
  font-weight: 600;
}

/* Tablet styles */
@media (max-width: 1024px) {
  .product-details {
    max-width: 100%;
    padding: 24px;
    gap: 24px;
  }

  .product-info-container h2 {
    font-size: 24px;
  }

  .price {
    font-size: 28px;
  }

  .action-button {
    min-width: 160px;
  }
}

/* Mobile styles */
@media (max-width: 768px) {
  #details {
    padding: 12px;
  }

  .product-details {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    margin-top: 0;
  }

  .product-image-container {
    order: 1;
  }

  .product-info-container {
    order: 2;
  }

  .product-info-container h2 {
    font-size: 22px;
    margin-bottom: 12px;
  }

  .description {
    font-size: 15px;
    margin-bottom: 20px;
  }

  .price {
    font-size: 26px;
    margin-bottom: 20px;
  }

  .quantity {
    margin-bottom: 24px;
  }

  .button-container {
    flex-direction: column;
    gap: 12px;
  }

  .action-button {
    min-width: 100%;
    flex: none;
  }
}

/* Small mobile styles */
@media (max-width: 480px) {
  #details {
    padding: 8px;
  }

  .product-details {
    padding: 16px;
    gap: 16px;
  }

  .product-info-container h2 {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }

  .price {
    font-size: 24px;
  }

  .action-button {
    min-height: 44px;
    font-size: 15px;
  }
}

/* Very small screens */
@media (max-width: 320px) {
  .product-details {
    padding: 12px;
  }

  .product-info-container h2 {
    font-size: 18px;
  }

  .price {
    font-size: 22px;
  }
}
</style>
