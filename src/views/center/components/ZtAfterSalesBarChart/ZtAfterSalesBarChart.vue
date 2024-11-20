<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-02-27 15:42:25
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-08 13:03:03
 * @FilePath: /business-center/src/views/center/components/ZtAfterSalesBarChart/ZtAfterSalesBarChart.vue
 * @Description: 数据接入量---页面左边第一个模块的柱形图
-->
<script setup>
import { CountTo } from "vue3-count-to";
import Chart from "./Chart.vue";
import ChartAnimation from "./ChartAnimation.vue";
import { fullScreenClick } from "@/components/common.js";
</script>

<template>
  <div class="ztAfterSalesBarChart" @dblclick="fullScreenClick($event)">
    <!-- <Chart /> -->
    <ChartAnimation />
  </div>
</template>


<style lang="less" scoped>
.ztAfterSalesBarChart {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
