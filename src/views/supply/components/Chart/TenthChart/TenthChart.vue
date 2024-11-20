<template>
    <div ref="chartDom" style="width: 100%; height: 100%"></div>
  </template>
  
  <script setup lang="ts">
  import * as echarts from "echarts";
  import { ref, onMounted, watch, reactive, computed } from "vue";
  import { useRequest } from "@/hooks/useRequest/index";
  import { getTenthchart } from "@/server/api/businessThree";
  
  const chartDom = ref<null | HTMLDivElement>(null);
  const seriesList = ref([]);
  const xAxisList = ref([]);
  const maxData = ref([]);
  const dataZoomEndValue = 8;

const option = computed(() => {
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
            type: "shadow",
            },
        },
        grid: {
            left: 0,
            right: 10,
            top: 45,
            bottom: 7,
            containLabel: true,
        },
        xAxis: [
            {
            data: xAxisList.value,
            axisLine: {
                lineStyle: {
                color: "#3C6579",
                },
            },
            axisLabel: {
                color: "#219653",
                fontSize: 14,
                interval: 0,
            },
            },
        ],
        yAxis: [
            {
            name: "单位(吨)",
            nameTextStyle: {
                color: "#000",
                fontSize: 12,
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                color: "#219653",
                },
            },
            axisLabel: {
                textStyle: {
                color: "#219653",
                },
            },
            },
        ],
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
            name: "数量",
            type: "pictorialBar",
            symbol: "rect",
            itemStyle: {
                color: "#219653",
            },
            symbolRepeat: true,
            symbolSize: [20, 10],
            // symbolBoundingData: 100,
            symbolMargin: 0.5,
            symbolPosition: "start",
            z: -20,
            data: seriesList.value,
            },
            {
            name: "",
            type: "bar",
            barWidth: 28,
            itemStyle: {
                color: "rgba(0,0,0,0)",
                borderWidth: 2,
                borderColor: "#B3C9BD",
                padding: 0,
            },
            label: {
                show: false,
            },
            z: -10,
            data: maxData.value,
            },
        ],
    }
});





  
  const { run, data, err } = useRequest(getTenthchart, {
    manual: true,
    onSuccess: (res) => {
        xAxisList.value = res.data.data.xdata || [];
        seriesList.value = res.data.data.data || [];
        maxData.value = res.data.data.maxData || [];
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
  