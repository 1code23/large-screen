<script setup lang="ts">
import BigTitle from "@/components/BigTitle.vue";
import CardBox from "@/components/CardBox.vue";
import ZtThreeDPieChart from "./components/ZtThreeDPieChart/ZtThreeDPieChart.vue";
import ZtPieChart from "./components/ZtPieChart/ZtPieChart.vue";
import ZtMidData from "./components/ZtMidData/ZtMidData.vue";
import ZtMidAnimation from "./components/ZtMidAnimation/ZtMidAnimation.vue";
import ZtRightAnimation from "./components/ZtRightAnimation/ZtRightAnimation.vue";
import ZtBarChart from "./components/ZtBarChart/ZtBarChart.vue";
import ZtTableDataV from "./components/ZtTable/ZtTableDataV.vue";
import ZtAfterSalesBarChart from "./components/ZtAfterSalesBarChart/ZtAfterSalesBarChart.vue";
</script>

<template>
  <main class="data-view">
    <!-- 头部 -->
    <BigTitle />

    <!-- 左侧 -->
    <CardBox class="left-40 one" style="top: 112px; height: 238px">
      <ZtBarChart />
    </CardBox>
    <CardBox class="left-40 two" style="top: 364px; height: 312px">
      <ZtPieChart />
    </CardBox>
    <CardBox class="left-40 three" style="top: 685px; height: 394px">
      <ZtThreeDPieChart />
    </CardBox>

    <!-- 右侧 -->
    <CardBox class="right-40 five" style="top: 112px">
      <ZtRightAnimation />
    </CardBox>
    <CardBox class="right-40 six" style="top: 685px; height: 394px">
      <ZtAfterSalesBarChart />
    </CardBox>

    <!-- 中间 -->
    <CardBox
      class="center centerTop"
      style="top: 112px; height: 58px; min-height: 58px"
    >
      <ZtMidData />
    </CardBox>

    <CardBox class="center centerTop" style="top: 256px; height: 362px">
      <ZtMidAnimation />
    </CardBox>
    <CardBox class="center four" style="top: 685px; height: 394px">
      <ZtTableDataV />
    </CardBox>

  </main>
</template>

<style lang="less">
.data-view {
  position: relative;
  width: 100%;
  height: 100%;

  .left-40 {
    left: 40px;
  }

  .right-40 {
    right: 40px;
  }
  .center {
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 743px;
  }
}
</style>