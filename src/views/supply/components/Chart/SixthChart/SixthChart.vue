<template>
  <div
    class="sixthchart"
    ref="chartDom"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { getSixthchart } from "@/server/api/businessThree";

const chartDom = ref<null | HTMLDivElement>(null);
const seriesList = ref([]);
const xAxisList = ref([]);
const dataZoomEndValue = 8;

const xdata = ref([]);
const chartData = ref([]);

const option = computed(() => {
  return {
    grid: {
      left: 0,
      right: 10,
      top: 45,
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisList.value,
      axisLabel: {
        // 这里添加或修改X轴标签样式
        color: "#4FA674", // 设置X轴标签文字颜色
        fontSize: 12, // 设置X轴标签文字大小
        rotate: -25, // 倾斜45度
        interval: 0, // 显示所有标签
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#0C6E46",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "单位(吨)",
      nameTextStyle: {
        color: "#000",
        fontSize: 12,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#0C6E46",
        },
      },
      axisLabel: {
        color: "#000",
        fontSize: 12,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#fff",
          type: "dashed",
        },
      },
      interval: 100,
    },
    dataZoom: [
      {
        show: false,
        xAxisIndex: 0,
        startValue: 0,
        endValue: dataZoomEndValue,
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 18,
        itemStyle: {
          normal: {
            color: "#0C6E46",
          },
        },
        data: seriesList.value,
      },
    ],
  };
});

const { run, data, err } = useRequest(getSixthchart, {
  manual: true,
  onSuccess: (res) => {
    xAxisList.value = res.data.data.xdata || [];
    seriesList.value = res.data.data.data || [];
  },
});
onMounted(() => {
  run({});
});

watch([xAxisList, seriesList], ([newXAxisList, newSeriesList]) => {
  if (chartDom.value && newXAxisList.length > 0 && newSeriesList.length > 0) {
    const myChart = echarts.init(chartDom.value);
    console.log(option.value.dataZoom, "newSeriesList.length");
    setInterval(() => {
      if (option.value.dataZoom[0].endValue === newXAxisList.length) {
        option.value.dataZoom[0].startValue = 0;
        option.value.dataZoom[0].endValue = dataZoomEndValue;
      } else {
        option.value.dataZoom[0].startValue =
          option.value.dataZoom[0].startValue + 1;
        option.value.dataZoom[0].endValue =
          option.value.dataZoom[0].endValue + 1;
      }
      myChart.setOption(option.value);
    }, 2000);
    option.value && myChart.setOption(option.value);
  }
});
</script>
<style lang="less" scoped>
.sixthchart {
  width: 100%;
  height: 100%;
}
</style>
