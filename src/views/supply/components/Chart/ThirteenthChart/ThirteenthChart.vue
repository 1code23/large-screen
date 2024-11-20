<script setup>
import { ref, computed, watch } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
// import { ztbarchart } from "@/server/api/data";
import { getThirteenthPieChart } from "@/server/api/businessTwo";
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

const items = ref([]) 
const xdata = ref([]) 

let option = computed(() => {
    return {
    color: ["#305605", "#219653", "#27AE60"],
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}$ ({d}%)",
        textStyle: {
        fontSize: 16,
        },
    },
    legend: {
        data: items.value,
        orient: "vertical",
        right: "5%",
        top: "center",
        itemWidth: 0,
        itemHeight: 0,
        // itemGap: 30,
        textStyle: {
        color: "#",
        fontSize: 12,
        },
    },
    series: [
        {
        name: "TITLE",
        type: "pie",
        clockwise: false,
        startAngle: 90,
        radius: ['50%', '80%'],
        center: ["38%", "51%"],
        hoverAnimation: false,
        roseType: "radius", //area
        data: xdata.value,
        // itemStyle: {
        //     normal: {
        //     borderColor: "#273454",
        //     borderWidth: "1",
        //     },
        // },
        label: {
            show: true,
            position: "inside",
            formatter: "{hr|}{d}%",
            rich: {
            hr: {
                backgroundColor: "#fff",
                borderRadius: 5,
                width: 30,
                height: 20,
                padding: [4, -10, -5, -50],
                shadowColor: "#fff",
                shadowBlur: 1,
                shadowOffsetX: "-10",
                shadowOffsetY: "0",
            },
            // a: {
            //     padding: [-35, 15, -20, 5],
            // },
            },
        },
        labelLine: {
            normal: {
            length: 0,
            length2: -5,
            lineStyle: {
                width: 1,
            },
            },
        },
        // label: {
        //     normal: {
        //         show: true,
        //         position: 'inside',
        //         formatter: '{d}%',
        //         formatter: function(data){
        //             return data.percent.toFixed(0)+"%";
        //         },
        //         textStyle : {
        //             align : 'center',
        //             baseline : 'middle',
        //             fontFamily : '微软雅黑',
        //             fontSize : 15,
        //             fontWeight : 'bolder'
        //         }
        //     },
        // },
        },
    ],
    };
});

const { run, data, err } = useRequest(getThirteenthPieChart, {
    manual: true,
    onSuccess: (res) => {
        xdata.value = res.data.data.xdata || [];
        items.value = res.data.data.data || [];
    },
});
run({});
</script>

<template>
    <div class="ThirteenthChart">
        <v-chart class="chart" :autoresize="true" :option="option" />
    </div>
</template>


<style lang="less" scoped>
.ThirteenthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>