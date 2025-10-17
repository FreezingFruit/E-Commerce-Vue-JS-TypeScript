<script lang="ts" setup>
import CategoryCard from '@/components/CategoryCard.vue'
import JustForYou from '@/components/JustForYou.vue'
import { Images } from '@/utils/ImageUtil'
import { onMounted, ref } from 'vue'

const isMobile = ref(window.innerWidth <= 768)

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
</script>

<template>
  <section id="home" class="page-container">
    <el-carousel
      height="450px"
      trigger="click"
      class="carousel-wrapper"
      indicator-position="outside"
      v-if="!isMobile"
    >
      <el-carousel-item v-for="(img, index) in Images" :key="index">
        <img :src="img.image" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
    <CategoryCard />
    <JustForYou />
  </section>
</template>

<style lang="css" scoped>
#home {
  padding: 0 !important;
  margin: 0;
  background-color: #f5f5f5;
  width: 100%;
  min-height: 100vh;
}

h1 {
  text-align: center;
}

.carousel-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 20px auto;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
}

@media (max-width: 768px) {
  .carousel-wrapper {
    max-width: none;
    border-radius: 0;
  }

  .carousel-img {
    border-radius: 0;
  }
}

.carousel-wrapper :deep(.el-carousel__item) {
  overflow: hidden;
  border-radius: 8px;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 8px;
}

@media (max-width: 480px) {
  #home {
    padding: 0 !important;
  }

  .carousel-wrapper {
    height: 200px;
    margin: 0;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  #home {
    padding: 0 !important;
  }

  .carousel-wrapper {
    height: 250px;
    margin: 0;
  }
}

@media (min-width: 769px) and (max-width: 1200px) {
  .carousel-wrapper {
    height: 350px;
  }
}

@media (min-width: 1201px) {
  .carousel-wrapper {
    height: 450px;
  }
}
</style>
