<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRequest } from '@/hooks/useRequest/index'
import { mapShanxi } from '@/server/api/businessThree'
import yuLinShi from '../../../../../../assets/map/shanXiSheng/yuLinShi.json'
import * as echarts from 'echarts';
import 'echarts-gl'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
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
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
]);
echarts.registerMap("yuLinShi", yuLinShi)

const props = defineProps({
    date: Array,
    refreshKey: Number
})
var province = ref([]); // 改变颜色的省份
var banner = ref([]); // 有旗帜的省份

let option = computed(() => {
    var data = banner.value || [];
    var geoCoordMap = {
        "西安市": [108.95, 34.27],
        "铜川市": [109.08, 35.07],
        "宝鸡市": [107.15, 34.37],
        "咸阳市": [108.72, 34.33],
        "渭南市": [109.5, 34.5],
        "延安市": [109.49, 36.59],
        "榆林市": [109.74, 38.29],
        "汉中市": [107.03, 33.07],
        "安康市": [109.04, 32.69],
        "商洛市": [109.94, 33.87]
    };
    function convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i]];
            if (geoCoord) {
                res.push({
                    name: data[i],
                    value: geoCoord,
                });
            }
        }
        return res;
    }
    return {
        tooltip: {
            show: false,
        },
        geo: {
            map: "yuLinShi",
            roam: true,
            zoom: 1,
            aspectScale: 0.9,
            left: 'center',
            top: 'center',
            itemStyle: {
                color: "green",
                opacity: 1,
                borderWidth: 1,
                borderColor: "#333",
                shadowColor: 'rgba(152, 171, 131, 0.4)',
                shadowOffsetX: 0,
                shadowOffsetY: 2
            },
            viewControl: {
                zoom: 1,
                autoRotate: false,
                autoRotateAfterStill: 3,
                distance: 120,
                minAlpha: 90,
                maxAlpha: 90,
                minBeta: -360,
                maxBeta: 360,
                animation: true,
                animationDurationUpdate: 1000,
                animationEasingUpdate: "cubicInOut"
            },
            emphasis: {
                disabled: true,
                label: {
                    show: true,
                    color: "#fff",
                    fontSize: 16
                },
                itemStyle: {
                    color: "#219653"
                }
            },
            label: {
                show: true,
                position: "top",
                color: "#fff",
                fontSize: 16,
                lineHeight: 20,
                formatter: (params) => {
                    return params.name ? params.name : ' ';
                }
            },
            shading: "lambert",
            light: {
                main: {
                    color: "#fff",
                    intensity: 0.2,
                    shadowQuality: 'high',
                    shadow: true,
                    shadowQuality: "medium",
                    alpha: 55,
                    beta: 10
                },
                ambient: {
                    intensity: 0.7
                }
            },
            regions: province.value
        },
        series: [
            {
                type: "scatter",
                coordinateSystem: "geo",
                data: convertData(data),
                symbolSize: 20,
                symbol: "path://M35.025,17.608c-5.209-4.786-11.483-2.301-15.303-4.281v-1.482c0-0.41-0.333-0.743-0.743-0.743c-0.411,0-0.743,0.333-0.743,0.743v24.682c-1.855,0.104-3.261,0.59-3.261,1.175c0,0.661,1.793,1.197,4.005,1.197c2.21,0,4.003-0.536,4.003-1.197c0-0.585-1.405-1.071-3.261-1.175V26.151C24.575,24.573,28.408,17.166,35.025,17.608z",
                symbolRotate: 0,
                symbolOffset: ["50%", "-100%"],
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "top",
                        show: false,
                        textStyle: {
                            color: "#000000",
                            fontSize: 16
                        }
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: "red"
                    }
                }
            },
            {
                name: "个人会员数量",
                type: "map",
                geoIndex: 0,
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name;
                    }
                },
                data: [
                    {
                        name: "北京",
                        value: 2256
                    }
                ],
                // 添加 click 事件监听器
                events: {
                    click: function (params) {
                        console.log('点击的区域名称:', params.name);
                    }
                }
            }
        ]
    }
})

const { run, data, err } = useRequest(mapShanxi, {
    manual: true,
    onSuccess: (res) => {
        banner.value = (res.data.data.banner || []);
        const provinces = res.data.data.banner || [];
        if (provinces.length > 0) {
            const configArray = provinces.map(province => ({
                name: province || "",
                itemStyle: {
                    color: '#1A794C',
                    opacity: 1,
                    borderWidth: 1,
                    borderColor: '#333'
                }
            }));
            province.value = configArray;
        }
    }
})
run({});
</script>

<template>
<div class="shanxi-map">
    <v-chart class="chart" :autoresize="true" :option="option" />
</div>
</template>

<style lang="less" scoped>
.shanxi-map {
    width: 100%;
    height: 100%;
    background: pink;
}
</style>
