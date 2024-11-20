<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-02-27 15:42:25
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-08 12:24:41
 * @FilePath: /business-center/src/views/center/components/ZtBarChart/ZtBarChart.vue
 * @Description: 数据接入量---页面左边第一个模块的柱形图
-->
<script setup>
import { CountTo } from "vue3-count-to";
import Chart from "./Chart.vue";
import ChartAnimation from "./ChartAnimation.vue";
import { fullScreenClick } from "@/components/common.js";
</script>

<template>
  <div class="ztbarchart" @dblclick="fullScreenClick($event)">
    <!-- <Chart /> -->
    <ChartAnimation />
  </div>
</template>


<style lang="less" scoped>
.ztbarchart {
  position: absolute;
  // right: 186px;
  // top: 348px;
  // width: 1172px;
  // height: 568px;
  width: 100%;
  height: 100%;
}
</style>
