<script lang="ts" setup>
import CategoryComp from '@/components/CategoryComp.vue'
import JustForYou from '@/components/JustForYou.vue'
import { Images } from '@/utils/ImageUtil'
</script>

<template>
  <section id="home" class="page-container">
    <el-carousel
      height="450px"
      trigger="click"
      class="carousel-wrapper"
      indicator-position="outside"
    >
      <el-carousel-item v-for="(img, index) in Images" :key="index">
        <img :src="img.image" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
    <CategoryComp />

    <JustForYou />
  </section>
</template>

<style lang="css" scoped>
#home {
  padding: 0;
  margin: 0;
  background-color: #f5f5f5;
}

h1 {
  text-align: center;
}

.carousel-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}
</style>
