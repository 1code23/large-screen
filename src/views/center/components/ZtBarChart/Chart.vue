<script setup>
import { ref, computed, watch } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";

import * as echarts from "echarts";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

const chartData = ref([]);

let option = computed(() => {
  return {
    dataset: chartData.value,
    tooltip: {
      backgroundColor: "#033b77",
      borderColor: "#17a2ad",
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      trigger: "item",
    },
    legend: {
      show: true,
      orient: "horizontal",
      top: "0",
      right: "0",
      itemGap: 14,
      align: "right",
      icon: "circle",
      itemWidth: 10,
      padding: [0, 0, 10, 0],
      textStyle: {
        color: "rgba(51, 51, 51, 1)",
        fontSize: "12px",
        fontWeight: 300,
      },
    },
    grid: {
      top: "30",
      left: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisPointer: {
          type: "shadow",
        },
        axisLine: {
          //是否显示以及样式设置
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.9)",
          margin: 10,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        nameGap: 15, // 坐标单位与坐标轴的距离
        fontSize: 12,
        splitLine: {
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.7)",
        },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(33, 150, 83, 1)",
            },
            {
              offset: 1,
              color: "rgba(33, 150, 83, 0)",
            },
          ]),
        },
      },
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(39, 174, 96, 1)",
            },
            {
              offset: 1,
              color: "rgba(39, 174, 96, 0)",
            },
          ]),
        },
      },
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(250, 0, 0, 1)",
            },
            {
              offset: 1,
              color: "rgba(250, 0, 0, 0)",
            },
          ]),
        },
      },
    ],
  };
});

const { run, data, err } = useRequest(ztbarchart, {
  manual: true,
  onSuccess: (res) => {
    chartData.value = res.data.data || {};
  },
});

run({});
</script>

<template>
  <div class="zt-bar-chart">
    <v-chart class="bar-chart" :autoresize="true" :option="option" />
  </div>
</template>


<style lang="less" scoped>
.zt-bar-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10px;
}
</style>