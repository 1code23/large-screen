<script setup>
import { CountTo } from "vue3-count-to";
import Chart from "./Chart.vue";
import ChartAnimation from "./ChartAnimation.vue";
import { fullScreenClick } from "@/components/common.js";
</script>

<template>
  <div class="ztpiechart" @dblclick="fullScreenClick($event)">
    <!-- <Chart /> -->
    <ChartAnimation />
  </div>
</template>


<style lang="less" scoped>
.ztpiechart {
  position: absolute;
  // right: 186px;
  // top: 348px;
  // width: 1172px;
  // height: 568px;
  width: 100%;
  height: 100%;
}
</style>
