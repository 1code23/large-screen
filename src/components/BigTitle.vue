<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2023-04-23 11:24:10
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-04 10:01:27
 * @FilePath: /business-center/src/components/BigTitle.vue
 * @Description: 中台页面头部
-->
<script setup lang="ts">
defineProps<{
  title: string;
}>();
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
  background: url(../assets/imgs/titlePic.png) no-repeat center center;
  background-size: 100%;
}
</style>
