<script lang="ts" setup>
import CategoryCard from './CategoryCard.vue'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{ (e: 'update:visible', value: boolean): void }>()
</script>

<template>
  <el-drawer
    :model-value="props.visible"
    @update:modelValue="(val: boolean) => emit('update:visible', val)"
    size="40%"
    direction="ltr"
  >
    <CategoryCard />
  </el-drawer>
</template>
