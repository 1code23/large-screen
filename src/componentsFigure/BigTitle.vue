<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="big-title"></div>
</template>

<style scoped>
.big-title {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100px;
  background: url(../assets/imgsFigure/title-bg.png);
  background-size: 100% 100%;
}
</style>
