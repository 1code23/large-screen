<script setup>
import { ref, computed, watch } from 'vue'

import { useRequest } from '@/hooks/useRequest/index'
import { mapAnhui } from '@/server/api/businessTwo'

import china from '../../../../../../assets/map/china.json'
// import world from '../../../../assets/map/world.json'
// import anhui from '../../../../assets/map/anhui.json'

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

// const anhuiMaps = anhui.features.map(item => item.properties)
// const worldMaps = world.features.map(item => item.properties)
// const chinaMaps = china.features.map(item => item.properties)

// const chinaGeoCoordMap = {};

// worldMaps.forEach(item => {
//     chinaGeoCoordMap[item.name] = item.center
// })
// chinaMaps.forEach(item => {
//     chinaGeoCoordMap[item.name] = item.center
// })
// anhuiMaps.forEach(item => {
//     chinaGeoCoordMap[item.name] = item.center
// })

var chartData = ref([]);

let option = computed(() => {
    var data = [
        {
            name: "795",
            value: 795,
        },
        {
            name: "273",
            value: 273,
        },
        {
            name: "744",
            value: 744,
        },
        {
           name: "601",
           value: 601,
        },
        {
           name: "655",
           value: 655,
        },
      {
        name: "655",
        value: 655,
      },
      {
        name: "2256",
        value: 2256,
      },
      {
        name: "201",
        value: 201,
      }, {
        name: "1",
        value: 1,
      },{
        name: "2",
        value: 2,
      },
      //   {
      //   name: "3",
      //   value: 3,
      // },
        {
        name: "4",
        value: 4,
      },{
        name: "5",
        value: 5,
      },
        {
            name: "578",
            value: 578,
        },
        {
            name: "590",
            value: 590,
        },
      // {
      //   name: "319",
      //   value: 319,
      // },
    ];

    var geoCoordMap = {
        3: [113.27324, 23.15792],
        1: [114.272426,23.137945],
        5: [106.546867,29.408846],
        4: [114.536594,38.043197],
        2: [108.334522,22.821264],
        2256: [116.46, 39.92],
        578: [121.29, 31.14],
        744: [117.2, 39.13],
        806: [106.32, 29.32],
        336: [126.41, 45.45],
        325: [125.19, 43.52],
        487: [123.24, 41.5],
        343: [111.48, 40.49],
        432: [114.28, 38.02],
        273: [112.34, 37.52],
        1055: [117, 36.38],
        590: [113.42, 34.48],
        319: [108.54, 34.16],
        349: [103.49, 36.03],
        126: [106.16, 38.2],
        97: [101.45, 36.38],
        201: [87.36, 43.48],
        398: [117.18, 31.51],
        795: [118.5, 32.02],
        655: [120.09, 30.14],
        295: [113, 28.11],
        311: [115.52, 28.41],
        993: [114.21, 30.37],
        601: [104.05, 30.39],
        275: [106.42, 26.35],
        317: [119.18, 26.05],
        1000: [113.15, 23.08],
        186: [110.2, 20.02],
        261: [108.2, 22.48],
        132: [102.41, 25],
        18: [91.1, 29.4],
        11: [114.1, 22.18],
    };

    function convertData(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
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
            // top: 'center', //
            itemStyle: {  //这个地方设置的话，会影响其各个省份的背景色展示
                color: "#98AB83", // 区块颜色
                opacity: 1, // 透明度
                borderWidth: 1,
                borderColor: "#98B4FF",
                shadowColor: 'rgba(152, 171, 131, 0.6)', //阴影颜色
                shadowOffsetX: 0, //阴影偏移量
                shadowOffsetY: 5, //阴影偏移量
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
                zoom: 1.2, //当前视角的缩放比例
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
            regions: [{ // 可对单个地图区域进行设置
                name: '陕西省', // 所对应的地图区域的名称
                //regionHeight: '', // 区域的高度，可以设置不同的高度用来表达数据的大小。当 GeoJSON 为建筑的数据时，也可以通过这个值表示简直的高度。
                itemStyle: { // 单个区域的样式设置
                    color: '#27AE60',
                    opacity: 1,
                    borderWidth: 0.4,
                    borderColor: '#27AE60'
                },
            }, {
                name: '新疆维吾尔自治区',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 1,
                    borderWidth: 0.4,
                    borderColor: '#6FCF97'
                },
            },
            {
                name: '北京市',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 1,
                    borderWidth: 0.4,
                    borderColor: '#6FCF97'
                },
            },
            {
                name: '浙江省',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 0.7,
                    borderWidth: 0,
                    borderColor: '#6FCF97'
                },
            },
            {
                name: '四川省',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 1,
                    borderWidth: 0.4,
                    borderColor: '#6FCF97'
                },
            },
            {
                name: '天津市',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 1,
                    borderWidth: 0,
                    borderColor: '#6FCF97'
                },
            },{
                name: '山西省',
                itemStyle: {
                    color: '#6FCF97',
                    opacity: 1,
                    borderWidth: 0,
                    borderColor: '#6FCF97'
                },
            },{
                name: '江苏省',
                itemStyle: {
                  color: '#6FCF97',
                  opacity: 1,
                  borderWidth: 0,
                  borderColor: '#6FCF97'
                },
              },{
                name: '广西壮族自治区',
                itemStyle: {
                  color: '#6FCF97',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#6FCF97'
                },
              },{
                name: '广东省',
                itemStyle: {
                  color: '#6FCF97',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#6FCF97'
                },
              },{
                name: '河北省',
                itemStyle: {
                  color: '#6FCF97',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#6FCF97'
                },
              },{
                name: '重庆市',
                itemStyle: {
                  color: '#6FCF97',
                  opacity: 1,
                  borderWidth: 0.4,
                  borderColor: '#6FCF97'
                },
              },{
                    name: '上海市',
                    itemStyle: {
                        color: '#6FCF97',
                        opacity: 1,
                        borderWidth: 0.4,
                        borderColor: '#6FCF97'
                    },
                },{
                    name: '河南省',
                    itemStyle: {
                        color: '#6FCF97',
                        opacity: 1,
                        borderWidth: 0.4,
                        borderColor: '#6FCF97'
                    },
                },
            ],
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
            type: "scatter",
            coordinateSystem: "geo",
            data: [{
              name: "319",
              value: [108.54, 34.16],
            }],
            symbolSize: 26,
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
const { run, data, err } = useRequest(mapAnhui, {
    manual: true,
    onSuccess: (res) => {
        chartData.value = (res.data.data || [])
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
