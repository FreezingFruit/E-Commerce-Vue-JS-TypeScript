<script lang="ts" setup>
import FooterComp from '@/components/FooterComp.vue'
import NavbarCart from '@/components/NavbarCart.vue'
</script>
<template>
  <header><NavbarCart /></header>
  <main>
    <slot></slot>
  </main>
  <footer><FooterComp /></footer>
</template>
