<script setup>
import { ref, computed, watch } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getEleventhchart } from "@/server/api/businessThree";
import * as echarts from "echarts";
import { use } from "echarts/core";
import VChart, { THEME_KEY } from "vue-echarts";

const chartDataOne = ref([]);
const chartDataTwo = ref([]);
const chartDataThree = ref([]);

let option = computed(() => {
    return {
    grid: {
        left: 0,
        right: 15,
        top: 45,
        bottom: 7,
        containLabel: true,
    },
    legend: {
        icon: "rect",
        itemWidth: 14,
        itemHeight: 5,
        itemGap: 13,
        data: ["入库数", "出库数", "库存数"],
        right: "4%",
        textStyle: {
        fontSize: 12,
        color: "#332609",
        },
    },
    xAxis: [
        {
        type: "category",
        boundaryGap: false,
        axisLine: {
            lineStyle: {
            color: "#3C6579",
        },
        },
        axisLabel: {
            textStyle: {
            color: "#219653", // 设置 X 轴标签字体的颜色
            fontSize: 14,      // 可选：设置字体大小
            },
        },
        data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
        ],
        },
    ],
    yAxis: [
    {
        type: "value",
        axisTick: {
        show: false,
        },
        axisLine: {
        show: false, // 设置此属性为 false 即可隐藏轴线
        lineStyle: {
            color: "#219653",
        },
        },
        axisLabel: {
        margin: 10,
        textStyle: {
            fontSize: 14,
        },
        },
        splitLine: {
        lineStyle: {
            color: "#A7AAAB",
            type: "dashed" // 设置分割线为虚线
        },
        },
    },
    ],

    series: [
        {
        name: "入库数",
        type: "line",
        smooth: true,
        lineStyle: {
            normal: {
            width: 1,
            },
        },
        areaStyle: {
            normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                {
                    offset: 0,
                    color: "rgba(33, 150, 83, 0.7)",
                },
                {
                    offset: 0.8,
                    color: "rgba(33, 150, 83, 0.3)",
                },
                ],
                false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            },
        },
        itemStyle: {
            normal: {
            color: "#219653",
            },
        },
        data: chartDataOne.value,
        },
        {
        name: "出库数",
        type: "line",
        smooth: true,
        lineStyle: {
            normal: {
            width: 1,
            },
        },
        areaStyle: {
            normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                {
                    offset: 0,
                    color: "rgba(111, 151, 255, 0.9)",
                },
                {
                    offset: 0.8,
                    color: "rgba(111, 151, 255, 0.3)",
                },
                ],
                false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            },
        },
        itemStyle: {
            normal: {
            color: "#6F97FF",
            },
        },
        data: chartDataTwo.value,
        },
        {
        name: "库存数",
        type: "line",
        smooth: true,
        lineStyle: {
            normal: {
            width: 1,
            },
        },
        areaStyle: {
            normal: {
            color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                {
                    offset: 0,
                    color: "rgba(48, 86, 5, 0.3)",
                },
                {
                    offset: 0.8,
                    color: "rgba(48, 86, 5, 0.1)",
                },
                ],
                false
            ),
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10,
            },
        },
        itemStyle: {
            normal: {
            color: "#305605",
            },
        },
        data: chartDataThree.value,
        },
    ],
    };
});

const { run, data, err } = useRequest(getEleventhchart, {
    manual: true,
    onSuccess: (res) => {
        chartDataOne.value = res.data.data.dataOne || [];
        chartDataTwo.value = res.data.data.dataTwo || [];
        chartDataThree.value = res.data.data.dataThree || [];
    },
});
run({});
</script>

<template>
    <div class="eleventhChart">
        <v-chart class="chart" :autoresize="true" :option="option" />
    </div>
</template>


<style lang="less" scoped>
.eleventhChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>