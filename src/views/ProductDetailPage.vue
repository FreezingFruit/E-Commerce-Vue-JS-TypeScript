<script lang="ts" setup>
import { useProductStore } from '@/stores/ProductStore'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const quantity = ref(1)

const productName = route.params.name as string
const product = productStore.products.find(
  (product) => product.name === decodeURIComponent(productName),
)

const handleAddToCartAndCheckout = () => {
  if (product) {
    productStore.addToCart(product, quantity.value)
    router.push('/cart')
  } else {
    console.error('Product not found')
  }
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
          <el-input-number v-model="quantity" size="normal" label="Quantity" :min="1">
          </el-input-number>
        </el-form-item>

        <div class="button-container">
          <el-button
            class="action-button"
            type="primary"
            @click="handleAddToCartAndCheckout"
            style="background-color: #ffb916"
            >Buy Now</el-button
          >

          <el-button
            class="action-button"
            type="primary"
            @click="productStore.addToCart(product, quantity)"
            style="background-color: #f57224"
            >Add To Cart</el-button
          >
        </div>
      </div>
    </div>

    <div v-else>
      <h1>PRODUCT NOT FOUND</h1>
    </div>
  </section>
</template>

<style lang="css" scoped>
#details {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.product-details {
  display: flex;
  gap: 32px;
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  max-width: 1000px;
  width: 100%;
  margin-top: 20px; /* Add some top margin */
}

.product-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.detail-image {
  width: 100%;
  max-width: 400px;
  height: auto; /* Add this to maintain aspect ratio */
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  object-fit: cover;
  background-color: #fafafa;
}

.product-info-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.product-info-container h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #212121;
}

.description {
  font-size: 16px;
  color: #555;
  margin-bottom: 24px;
  line-height: 1.6;
}

.price {
  color: orangered;
  padding: 16px 0;
  border-radius: 8px;
  font-size: 30px;
  width: fit-content;
  margin-bottom: 24px;
}

.button-container {
  margin-top: 10px;
  gap: 10px;
  display: flex; /* Add this to properly align buttons */
  flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
}

.action-button {
  min-width: 200px;
  min-height: 40px;
  border: none;
}

.quantity {
  margin-top: 50px;
}

/* Responsive design */
@media (max-width: 768px) {
  #details {
    padding: 16px;
  }

  .product-details {
    flex-direction: column;
    padding: 24px;
  }

  .button-container {
    flex-direction: column;
  }

  .action-button {
    min-width: 100%;
  }
}
</style>
