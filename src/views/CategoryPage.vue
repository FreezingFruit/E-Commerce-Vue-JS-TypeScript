<script lang="ts" setup>
import CategoryCard from '@/components/CategoryCard.vue'
import CategoryDrawer from '@/components/CategoryDrawer.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/ProductStore'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const productStore = useProductStore()
const route = useRoute()

const categoryName = route.params.name as string
const selectedCategoryName = ref(categoryName)
const productCategory = ref(productStore.filteredCategories(categoryName))
const isMobile = ref(window.innerWidth <= 768)
const showDrawer = ref(false)

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
watch(
  () => route.params.name,
  (newCategory) => {
    selectedCategoryName.value = newCategory as string
    productCategory.value = productStore.filteredCategories(newCategory as string)
  },
)
</script>

<template>
  <section id="category" class="page-container">
    <div class="split-wrapper">
      <div class="category-menu-btn-wrapper" v-if="isMobile" @click="showDrawer = true">
        <el-icon class="category-menu-btn">
          <MoreFilled />
        </el-icon>
        <span class="menu-label">CATEGORIES</span>
      </div>
      <CategoryDrawer v-model:visible="showDrawer" />
      <div v-if="!isMobile" class="left">
        <CategoryCard />
      </div>
      <div class="right">
        <h2>{{ selectedCategoryName.toUpperCase() }}</h2>
        <ProductCard :products="productCategory" />
      </div>
    </div>
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

.split-wrapper {
  display: flex;
  min-height: 100vh;
}

.left {
  width: 280px;
  height: 60%;
  background-color: white;
  padding: 40px 0;
  flex-shrink: 0;
}

.right {
  flex: 1;
}

.category-menu-btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  height: 40px;
}

.menu-label {
  font-size: 12px;
  margin-top: 4px;
  font-weight: 700;
  color: #333;
}

.category-menu-btn {
  font-size: 24px;
  transition: all 0.3s ease;
}
.category-menu-btn:hover {
  border-radius: 20px;
  background-color: black;
  color: white;
}
</style>
