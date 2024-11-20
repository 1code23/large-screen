<script setup>
import { ref, computed, watch } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getFifthLdchart } from "@/server/api/businessTwo";
import * as echarts from "echarts";
import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
// import { LineChart } from "echarts/charts";
// import {
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
//     GridComponent,
//     DataZoomComponent,
// } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

// use([
//     CanvasRenderer,
//     LineChart,
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
//     GridComponent,
//     DataZoomComponent,
// ]);

const xdata = ref([]);
const chartData = ref([]);

let option = computed(() => {
    return {
    grid: {
        left: 0,
        right: 10,
        top: 45,
        bottom: 7,
        containLabel: true,
    },
    xAxis: {
        data: xdata.value,
        axisTick:{
        show:false
        },
        axisLine: {
        lineStyle: {
            color: "#000",
        },
        },
        axisLabel: {
        color: "#000",
        fontSize: 14,
        },
    },
    yAxis: {
        name: "单位: 个",
        nameTextStyle: {
        color: "#4D4B48",
        fontSize: 16,
        },
        axisLine: {
            show:true,
        lineStyle: {
            color: "#000",
        },
        },
        axisLabel: {
        color: "#999690",
        fontSize: 16,
        },
        splitLine: {
        show: true,
        lineStyle: {
            color: "#A2A3A3",
            type: 'dashed',
        },
        },
        interval: 100,
        // max: 700,
    },
    series: [
        {
        type: "bar",
        barWidth: 18,
        itemStyle: {
            normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                {
                    offset: 0,
                    color: "#305605",
                },
                {
                    offset: 0.8,
                    color: "#CACCC8",
                },
                ],
                false
            ),
            },
        },
        data: chartData.value,
        },
    ],
    };
});

const { run, data, err } = useRequest(getFifthLdchart, {
    manual: true,
    onSuccess: (res) => {
        xdata.value = res.data.data.xdata || [];
        chartData.value = res.data.data.data || [];
    },
});
run({});
</script>

<template>
    <div class="FifthChart">
        <v-chart class="chart" :autoresize="true" :option="option" />
    </div>
</template>


<style lang="less" scoped>
.FifthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>