
<script setup>
import { ref, computed, watch } from 'vue'

import china from '../../../../../../assets/map/china.json'
import world from '../../../../../../assets/map/world.json'
import anhui from '../../../../../../assets/map/anhui.json'

import * as echarts from 'echarts';
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
// echarts.registerMap("china", china)
echarts.registerMap("world", world)

const props = defineProps({
    date: Array,
    refreshKey: Number
})

const anhuiMaps = anhui.features.map(item => item.properties)
const worldMaps = world.features.map(item => item.properties)
const chinaMaps = china.features.map(item => item.properties)
console.log(worldMaps)
const chinaGeoCoordMap = {};

worldMaps.forEach(item => {
    chinaGeoCoordMap[item.name] = item.cp
})
chinaMaps.forEach(item => {
    chinaGeoCoordMap[item.name] = item.cp
})
anhuiMaps.forEach(item => {
    chinaGeoCoordMap[item.name] = item.cp
})

var chinaDatas = [
    [{
        name: "北京市",
        value: 0
    }, {
        name: '黑龙江省',
        value: 0
    }, { name: '上海市' }],
    [{
        name: '内蒙古自治区',
        value: 0
    }], [{
        name: '吉林省',
        value: 0
    }], [{
        name: '辽宁省',
        value: 0
    }], [{
        name: '河北省',
        value: 0
    }], [{
        name: '天津市',
        value: 0
    }], [{
        name: '山西省',
        value: 0
    }], [{
        name: '陕西省',
        value: 0
    }], [{
        name: '甘肃省',
        value: 0
    }], [{
        name: '新疆维吾尔自治区',
        value: 0
    }], [{
        name: '西藏自治区',
        value: 0
    }], [{
        name: '台湾省',
        value: 0
    }], [{
        name: '黑龙江省',
        value: 0
    }], [{
        name: '云南省',
        value: 0
    }], [{
        name: '青海省',
        value: 0
    }], [{
        name: '四川省',
        value: 0
    }], [{
        name: '江西省',
        value: 0
    }], [{
        name: '湖南省',
        value: 0
    }], [{
        name: '贵州省',
        value: 0
    }], [{
        name: '广西壮族自治区',
        value: 0
    }], [{
        name: '海南省',
        value: 0
    }], [{
        name: '上海市',
        value: 0
    }]
];

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = chinaGeoCoordMap[dataItem[0].name];
        var toCoord = [[121.4648, 31.2891], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701], [117.1582, 36.8701]];//被攻击点
        if (fromCoord && toCoord[i]) {
            res.push([{
                coord: toCoord[i],
            }, {
                coord: fromCoord,
                value: dataItem[0].value,
                // visualMap: false
            }]);
        }
    }
    return res;
};

var series = [];
[['合肥市', chinaDatas]].forEach(function (item, i) {
    series.push({
        type: 'map',
        mapType: 'world',
        aspectScale: 0.85,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: '100%',
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: { //滚轮缩放的极限控制
            min: 1,
            max: 2
        },
        itemStyle: {
            areaColor: '#12235c',
            borderColor: '#2ab8ff',
            borderWidth: 2,
            shadowColor: 'rgba(0,54,255, 0.4)',
            shadowBlur: 100,
            emphasis: {
                areaColor: '#02102b',
                label: {
                    fontSize: '30',
                    color: "#fff"
                }

            }
        }
    }, {
        type: 'lines',
        zlevel: 2,
        effect: {
            show: true,
            period: 3, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 15, //图标大小
        },
        lineStyle: {
            color: '#00eaff',
            width: 5, //尾迹线条宽度
            opacity: .7, //尾迹线条透明度
            curveness: .3, //尾迹线条曲直度
        },
        data: convertData(item[1])
    },
        {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: { //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 40 //波纹圆环最大限制，值越大波纹越大
            },
            label: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {//圆环显示文字
                    return params.data.name;
                },
                fontSize: '30',
                emphasis: {
                    show: true
                }
            },
            symbol: 'circle',
            symbolSize: function (val) {
                return 5 + val[2] * 5; //圆环大小
            },
            itemStyle: {
                show: true,
                color: '#00eaff'
            },
            data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[0].name,
                    value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
                    // visualMap: false
                };
            }),
        },
        //被攻击点
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                period: 4,
                brushType: 'stroke',
                scale: 4
            },
            label: {
                show: false,    //定位点名字
                position: 'right',
                // offset:[5, 0],
                color: '#0f0',
                formatter: '{b}',
                textStyle: {
                    color: "#0f0"
                },
                emphasis: {
                    // show: false,   //定位标记
                    color: "#f60"
                }
            },
            symbol: 'pin',  //定位图标样式
            symbolSize: 50,
            data: [{
                name: item[0],
                value: chinaGeoCoordMap[item[0]].concat([10]),
            }],
        }
    );
});

let option = computed(() => {
    return {
        // backgroundColor: '#061d4d',
        geo: {
            map: 'world',
            aspectScale: 0.85,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: '100%',
            itemStyle: {
                shadowColor: '#276fce',
                shadowOffsetX: 0,
                shadowOffsetY: 15,
                opacity: 0.5,
                emphasis: {
                    areaColor: '#276fce',
                }
            },
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    fontSize: '100',
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)',
                    opacity: 0,
                    label: {
                        show: false,
                        color: "#009cc9",
                    }
                },
                label: {
                    show: false,
                    color: '#FFFFFF',
                    fontSize: '100',
                },
            }],
        },
        series: series
    }

})
// const { run, data, err } = useRequest(appLoginCount, {
//     manual: true,
//     onSuccess: (res) => {
//         chartData.value = (res.data || []).map(item => item.Count)
//         chartTag.value = (res.data || []).map(item => item.AppName)
//     }
// })

// run({
//     startDate: props.date[0],
//     endDate: props.date[1],
// });

// 可以直接侦听一个 ref
// watch(props, async (newValue, oldValue) => {
//     run({
//         startDate: props.date[0],
//         endDate: props.date[1],
//     })
// })
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