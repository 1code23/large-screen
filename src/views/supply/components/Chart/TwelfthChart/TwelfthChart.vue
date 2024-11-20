<template>
    <div ref="chartDom" style="width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { getTwelfthZztchart } from "@/server/api/businessTwo";

const chartDom = ref<null | HTMLDivElement>(null);
// const seriesList = [380, 125, 240, 354, 447, 580, 425, 240, 354, 247, 345,431];
// const xAxisList = ["01",
//             "02",
//             "03",
//             "04",
//             "05",
//             "06",
//             "07",
//             "08",
//             "09",
//             "10",
//             "11",
//             "12"
//             ];
const seriesList = ref([]);
const xAxisList = ref([]);
const dataZoomEndValue = 9;

const xdata = ref([]);
const chartData = ref([]);

const option = computed(() => {
    return {
    grid: {
        left: 0,
        right: 10,
        top: 15,
        bottom: 10,
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: xAxisList.value,
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
        fontSize: 10,
        },
    },
    yAxis: {
        axisLine: {
            show:true,
        lineStyle: {
            color: "#000",
        },
        },
        axisLabel: {
        color: "#999690",
        fontSize: 10,
        },
        splitLine: {
        show: true,
        lineStyle: {
            color: "#A2A3A3",
            type: 'dashed',
        },
        },
        interval: 100,
    },
    dataZoom: [
        {
        show: false,
        xAxisIndex: 0,
        startValue: 0,
        endValue: dataZoomEndValue
        }
    ],
    series: [
        {
        type: "bar",
        barWidth: 8,
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
        data: seriesList.value
        }
    ]
};
});

const { run, data, err } = useRequest(getTwelfthZztchart, {
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