<script lang="ts" setup>
import FooterComp from '@/components/FooterComp.vue'
import NavbarComp from '@/components/NavbarComp.vue'
</script>
<template>
  <header><NavbarComp /></header>
  <main>
    <slot></slot>
  </main>
  <footer><FooterComp /></footer>
</template>
