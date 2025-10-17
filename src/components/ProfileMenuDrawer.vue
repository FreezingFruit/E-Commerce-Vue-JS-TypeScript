<script lang="ts" setup>
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'mode', value: 'info' | 'history' | 'timeline'): void
}>()
</script>

<template>
  <el-drawer
    :model-value="props.visible"
    @update:modelValue="(val: boolean) => emit('update:visible', val)"
    :withHeader="false"
    direction="ltr"
    size="70%"
    class="drawer"
  >
    <div class="drawer-content">
      <h2 class="drawer-header">PROFILE</h2>
      <div class="nav-links">
        <span class="nav-item" @click="emit('mode', 'info')"><h3>PERSONAL INFORMATION</h3> </span>
        <span class="nav-item" @click="emit('mode', 'history')"><h3>PURCHASE HISTORY</h3></span>
        <span class="nav-item" @click="emit('mode', 'timeline')"><h3>TRACK YOUR ORDER</h3></span>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="css" scoped>
:deep(.el-drawer) {
  border-left: 1px solid black;
}

:deep(.el-drawer__body) {
  padding: 0;
}

.drawer-content {
  height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  padding: 2rem 0;
  color: #333;
  cursor: default;
  transition: all 0.3s ease;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.nav-item {
  position: relative;
  display: block;
  padding: 1rem 0;
  color: #111;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid black;
}

.nav-item:hover {
  background-color: black;
  color: white;
  padding-left: 1rem;
}

.nav-item h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  transition: all 0.3s ease;
}
</style>
