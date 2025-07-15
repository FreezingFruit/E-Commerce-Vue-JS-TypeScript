<script lang="ts" setup>
import { Categories } from '@/utils/CategoryUtil'
</script>

<template>
  <h2>CATEGORIES</h2>
  <section id="category">
    <div class="category-container">
      <router-link
        v-for="(category, index) in Categories"
        :key="index"
        class="card-link"
        :to="`/category/${encodeURIComponent(category)}`"
      >
        <el-card class="category-card" shadow="hover">
          <p>{{ category.toUpperCase() }}</p>
        </el-card>
      </router-link>
    </div>
  </section>
</template>

<style lang="css" scoped>
#category {
  width: 100%;
}
h2 {
  text-align: center;
  margin: 15px 0;
}

.category-card {
  padding: 10px;
  min-width: 200px;
  text-align: center;
  cursor: pointer;
}

.category-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 3px;
}

.category-card p {
  font-size: 16px;
  font-weight: bold;
}

.card-link {
  text-decoration: none;
  color: inherit;
}
</style>
