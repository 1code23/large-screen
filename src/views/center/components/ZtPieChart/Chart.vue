<script setup>
import { ref, computed, watch } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztpiechart } from "@/server/api/data";

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
    tooltip: {
      trigger: "item",
      formatter: "{b} : <br/>{c} ({d}%)",
    },
    legend: {
      bottom: "0",
      itemHeight: 12,
      itemWidth: 12,
      orient: "horizontal",
      left: "center",
      textStyle: {
        color: "rgba(51, 51, 51, 1)",
        fontSize: 14,
      },
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: "70%",
        center: ["50%", "45%"],
        // data: chartData.value.sort(function (a, b) {
        //   return a.value - b.value;
        // }),
        roseType: "radius",
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c}个 {d}%}",
          edgeDistance: 10,
          lineHeight: 30,
          fontSize: 14,
          rich: {
            time: {
              fontSize: 14,
              color: "rgba(33, 150, 83, 1)",
            },
          },
          textStyle: {
            color: "#000",
          },
        },
        labelLine: {
          lineStyle: {
            color: "#8591A5",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        data: [
          {
            name: chartData.value[0]?.name,
            value: chartData.value[0]?.value,
            itemStyle: {
              normal: {
                color: "rgba(111, 207, 151, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
          {
            name: chartData.value[1]?.name,
            value: chartData.value[1]?.value,
            itemStyle: {
              normal: {
                color: "rgba(39, 174, 96, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
          {
            name: chartData.value[2]?.name,
            value: chartData.value[2]?.value,
            itemStyle: {
              normal: {
                color: "rgba(33, 150, 83, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
      },
    ],
  };
});

const { run, data, err } = useRequest(ztpiechart, {
  manual: true,
  onSuccess: (res) => {
    chartData.value = res.data.data || [];
  },
});

run({});
</script>

<template>
  <div class="zt-pie-chart">
    <v-chart class="pie-chart" :autoresize="true" :option="option" />
  </div>
</template>


<style lang="less" scoped>
.zt-pie-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // padding-top: 20px;
}
</style>