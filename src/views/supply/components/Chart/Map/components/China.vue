<script setup>
import { ref, computed, watch } from 'vue'

import { useRequest } from '@/hooks/useRequest/index'
import { mapQuanguo } from '@/server/api/businessThree'

import china from '../../../../../../assets/map/china.json'

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
echarts.registerMap("china", china)

const props = defineProps({
    date: Array,
    refreshKey: Number
})

var province = ref([]); // 改变颜色的省份
var banner = ref([]); // 有旗帜的省份

let option = computed(() => {  
    var data = banner?.value || [];

    var geoCoordMap = {
        "北京市": [116.46, 39.92],
        "上海市": [121.29, 31.14], // 原始数据中578对应的坐标接近上海的位置
        "天津市": [117.2, 39.13],
        "重庆市": [106.32, 29.32],
        "黑龙江省": [126.41, 45.45],
        "吉林省": [125.19, 43.52],
        "辽宁省": [123.24, 41.5],
        "内蒙古自治区": [111.48, 40.49],
        "河北省": [114.28, 38.02],
        "山西省": [112.34, 37.52],
        "山东省": [117, 36.38],
        "河南省": [113.42, 34.48],
        "陕西省": [108.54, 34.16],
        "甘肃省": [103.49, 36.03],
        "青海省": [106.16, 38.2],
        "西藏自治区": [101.45, 36.38],
        "新疆维吾尔自治区": [87.36, 43.48],
        "安徽省": [117.18, 31.51],
        "江苏省": [118.5, 32.02],
        "浙江省": [120.09, 30.14],
        "湖南省": [113, 28.11],
        "湖北省": [115.52, 28.41],
        "江西省": [114.21, 30.37],
        "四川省": [104.05, 30.39],
        "贵州省": [106.42, 26.35],
        "福建省": [119.18, 26.05],
        "广东省": [113.15, 23.08],
        "广西壮族自治区": [110.2, 20.02],
        "海南省": [108.2, 22.48],
        "云南省": [102.41, 25],
        "西藏自治区拉萨市": [91.1, 29.4], // 这个可能是特指拉萨市，因为其位置在西藏自治区内
        "香港特别行政区": [114.1, 22.18]
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
        // visualMap: {
        //     min: 0,
        //     max: 1500,
        //     left: "-100%",
        //     top: "bottom",
        //     text: ["High", "Low"],
        //     seriesIndex: [1],
        //     inRange: {
        //     //地图颜色
        //     color: ['#000000', '#000000']
        //     },
        //     calculable: true,
        // },
        geo: {
            map: "china",
            roam: true,
            zoom: 1.2,
            aspectScale: 0.9,
            left: 'center', // 可以使用像素值，也可以使用百分比
            top: 'center', //
            itemStyle: {  //这个地方设置的话，会影响其各个省份的背景色展示
                color: "green", // 区块颜色
                opacity: 1, // 透明度
                borderWidth: 1,
                borderColor: "#1E4431",
                shadowColor: 'rgba(152, 171, 131, 0.6)', //阴影颜色
                shadowOffsetX: 0, //阴影偏移量
                shadowOffsetY: 2, //阴影偏移量
                // areaColor: '#fff',
                // areaColor: {  // 地图颜色渐变
                //     type: 'linear-gradient',
                //     x: 60,
                //     y: 50,
                //     x2: 20,
                //     y2: 200,
                //     colorStops: [{
                //         offset: 0.1,
                //         color: 'red' // 0% 处的颜色
                //     }, {
                //         offset: 1,
                //         color: 'blue' // 100% 处的颜色
                //     }],
                //     global: true // 缺省为 false
                // }
            },
            // realisticMaterial: {
            //     roughness: 1,
            //     textureTiling: 1,
            //     detailTexture: './ims/loop_bg.png'
            // },
            viewControl: {
                zoom: 1, //当前视角的缩放比例
                autoRotate: false,
                autoRotateAfterStill: 3,
                distance: 120,
                minAlpha: 90, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
                maxAlpha: 90, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
                minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
                maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]
                animation: true, // 是否开启动画。[ default: true ]
                animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
                animationEasingUpdate: "cubicInOut", // 过渡动画的缓动效果。[ default: cubicInOut ]
            },
            emphasis: {
                disabled: true, //是否可以被选中
                label: {
                    //移入时的高亮文本
                    show: true,
                    color: "#fff", //显示字体颜色变淡
                    fontSize: 16, //显示字体变大
                },
                itemStyle: {
                    color: "#219653", //显示移入的区块变粉色
                },
            },
            label: {
                show: false,
                position: "top",
                color: "#fff", //地图初始化区域字体颜色
                fontSize: 16,
                lineHeight: 20,
                formatter: (params) => {
                    console.log(params)
                    return params.name ? params.name : ' '
                },
            },
            shading: "lambert",
            light: {
                //光照阴影
                main: {
                    color: "#fff", //光照颜色
                    intensity: 0.2, //光照强度
                    shadowQuality: 'high', //阴影亮度
                    shadow: true, //是否显示阴影
                    shadowQuality: "medium", //阴影质量 ultra //阴影亮度
                    alpha: 55,
                    beta: 10,
                },
                ambient: {
                    intensity: 0.7,
                },
            },
            regions: province.value,
        },
        series: [
            {
                type: "scatter",
                coordinateSystem: "geo",
                data: convertData(data),
                symbolSize: 20,
                symbol:
                    "path://M35.025,17.608c-5.209-4.786-11.483-2.301-15.303-4.281v-1.482c0-0.41-0.333-0.743-0.743-0.743c-0.411,0-0.743,0.333-0.743,0.743v24.682c-1.855,0.104-3.261,0.59-3.261,1.175c0,0.661,1.793,1.197,4.005,1.197c2.21,0,4.003-0.536,4.003-1.197c0-0.585-1.405-1.071-3.261-1.175V26.151C24.575,24.573,28.408,17.166,35.025,17.608z",
                symbolRotate: 0,
                symbolOffset: ["50%", "-100%"],
                label: {
                    normal: {
                        formatter: "{b}",
                        position: "top",
                        show: false,
                        textStyle: {
                            color: "#000000",
                            fontSize: 16,
                        },
                    },
                    emphasis: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        color: "rgba(216, 30, 6, 1)",
                    },
                },
            },
            {
                name: "个人会员数量",
                type: "map",
                geoIndex: 0,
                tooltip: {
                    show: true,
                },
                data: [
                    {
                        name: "北京",
                        value: 2256,
                    }
                ],
            },
        ],
    }
})
const { run, data, err } = useRequest(mapQuanguo, {
    manual: true,
    onSuccess: (res) => {
        banner.value = (res.data.data.banner || []);
        const provinces = res?.data?.data?.banner || [];
        if(provinces.length > 0){
            const configArray = provinces.map(province => ({
                name: province, // 对应的地图区域的名称
                itemStyle: { // 单个区域的样式设置
                    color: '#1A794C',
                    opacity: 1,
                    borderWidth: 0,
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
    <div class="china-map">
        <v-chart class="chart" :autoresize="true" :option="option" />
    </div>
</template>


<style lang="less" scoped>
.china-map {
    width: 100%;
    height: 100%;
}
</style>
