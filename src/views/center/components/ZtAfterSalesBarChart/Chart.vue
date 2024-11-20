<script setup>
import { ref, computed, watch } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztaftersalesbarchart } from "@/server/api/data";

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

const chartBg = ref([]);
const chartName = ref([]);
const chartData = ref([]);

let option = computed(() => {
  return {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "40",
      containLabel: false, // 图表两侧是否留白
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (params) {
        // return "及格率<br>" + params[0].name + ": " + params[0].value + "%";
      },
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: "16",
            lineHeight: 16,
          },
          // 调整左侧文字的3个属性，缺一不可
          verticalAlign: "bottom",
          align: "right",
          //调整文字上右下左
          padding: [0, -90, 16, 0],
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: chartName.value,
      },
      {
        type: "category",
        inverse: true,
        axisLabel: {
          textStyle: {
            color: "rgba(33, 150, 83, 1)",
            fontSize: "16",
            lineHeight: 16,
            fontWeight: 700,
          },
          // 调整左侧文字的3个属性，缺一不可
          verticalAlign: "bottom",
          align: "right",
          //调整文字上右下左
          padding: [0, 10, 16, 0],
          formatter: "{value} {b|(万元)}",
          rich: {
            b: {
              color: "rgba(153, 150, 144, 1)",
              fontSize: 12,
              lineHeight: 16,
            },
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: chartData.value,
      },
    ],
    series: [
      {
        showBackground: true,
        backgroundStyle: {
          color: "rgba(61, 61, 61, 0.32)",
        },
        name: "值",
        type: "bar",
        zlevel: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: "rgba(33, 150, 83, 1)" },
              { offset: 1, color: "rgba(0, 0, 0, 1)" },
            ]),
          },
        },
        barWidth: 12,
        data: chartData.value,
      },
      {
        //顶部的横杠
        type: "pictorialBar",
        symbol: "rect",
        symbolSize: [4, 16],
        symbolOffset: [4, 0, 4, 0],
        symbolPosition: "end",
        data: chartData.value,
        itemStyle: {
          color: "rgba(33, 150, 83, 1)",
        },
      },
    ],
  };
});

const { run, data, err } = useRequest(ztaftersalesbarchart, {
  manual: true,
  onSuccess: (res) => {
    chartName.value = res.data.data.name || [];
    chartData.value = res.data.data.value || [];
    chartBg.value = res.data.data.bg || [];
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
}
</style>