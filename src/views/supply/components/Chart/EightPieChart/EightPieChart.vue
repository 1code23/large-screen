<script setup>
import { ref, computed, watch } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { getEightpiechart } from "@/server/api/businessThree";

// import echartsGl from 'echarts-gl';
import * as echarts from "echarts";
import "echarts-gl";
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

import { getPie3D, getParametricEquation } from "./EightPieChart.js";
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

const props = defineProps({
  date: Array,
  refreshKey: Number,
});

const color = ["#57DAEF", "#27AE60", "#4387F8", "#FF7723", "#9258FF"];
const chartData = ref([]);

let options = computed(() => {
  var option = {};
  chartData.value.forEach((item, index) => {
    item.itemStyle = {
      color: color[index],
    };
    item.label = {
      show: false,
      color: color[index],
      formatter: ["{b|{b}}", "{c|{c}}{b|人}", "{d|{d}%}"].join("\n"),
      // 用\n来换行
      rich: {
        b: {
          color: "#fff",
          lineHeight: 25,
          align: "left",
        },
        c: {
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.6)",
          textShadowColor: "#1c90a6",
          textShadowOffsetX: 0,
          textShadowOffsetY: 2,
          textShadowBlur: 5,
        },
        d: {
          color: color[index],
          align: "left",
        },
      },
    };
    item.labelLine = {
      lineStyle: {
        width: 10,
        color: "rgba(255,255,255,0.7)",
      },
    };
  });

  option = getPie3D(chartData.value, 0.8, 180, 26, 10, 0.9);
  // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
  option.series.push({
    name: "labelLine", //自己根据场景修改
    backgroundColor: "transparent",
    type: "pie",
    zlevel: -99,
    label: {
      opacity: 1,
      fontSize: 13,
      lineHeight: 20,
    },
    startAngle: -40,
    // 起始角度，支持范围[0, 360]。
    clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["10%", "50%"],
    center: ["50%", "10%"],
    // top: "center",
    // left: "10%",
    data: chartData.value,
    itemStyle: {
      opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
    },
  });

  return option;
});

const { run, data, err } = useRequest(getEightpiechart, {
  manual: true,
  onSuccess: (res) => {
    chartData.value = res.data.data || [];
  },
});

run({});
</script>

<template>
  <div class="eight-chart-box" id="3dPie">
    <v-chart
      class="chart"
      v-if="chartData.length"
      :autoresize="true"
      :option="options"
    />
  </div>
</template>

<style lang="less" scoped>
.eight-chart-box {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
