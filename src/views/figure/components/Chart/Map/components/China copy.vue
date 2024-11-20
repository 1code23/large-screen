
<script setup>
import { ref, computed, watch } from 'vue'

import { useRequest } from '@/hooks/useRequest/index'
import { mapChina } from '@/server/api/data'

import china from '../../../../assets/map/china.json'
import world from '../../../../assets/map/world.json'
import anhui from '../../../../assets/map/anhui.json'

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
echarts.registerMap("china", china)
// echarts.registerMap("world", world)

const props = defineProps({
    date: Array,
    refreshKey: Number
})

const anhuiMaps = anhui.features.map(item => item.properties)
const worldMaps = world.features.map(item => item.properties)
const chinaMaps = china.features.map(item => item.properties)

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

var chartData = ref([]);

let option = computed(() => {
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = chinaGeoCoordMap[dataItem[0].name];
            var toCoord = [
                [121.4648, 31.2891],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701],
                [117.1582, 36.8701]
            ];//被攻击点
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
    [['山东省', chartData.value]].forEach(function (item, i) {
        console.log(item)
        series.push(
            {
                type: 'map',
                mapType: 'china',
                aspectScale: 0.85,
                layoutCenter: ["50%", "50%"], //地图位置
                layoutSize: '100%',
                zoom: 1, //当前视角的缩放比例
                roam: true, //是否开启平游或缩放
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
                            fontSize: '20',
                            color: "#fff"
                        }
                    }
                }
            },
            {
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 3, //箭头指向速度，值越小速度越快
                    trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
                    symbol: 'arrow', //箭头图标
                    symbolSize: 8, //图标大小
                },
                lineStyle: {
                    color: '#00eaff',
                    width: 3, //尾迹线条宽度
                    opacity: .7, //尾迹线条透明度
                    curveness: .3, //尾迹线条曲直度
                },
                data: convertData(item[1])
            },
            {
                type: 'effectScatter',
                coordinateSystem: 'geo3d',
                zlevel: 2,
                rippleEffect: { //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: 'stroke', //波纹绘制方式 stroke, fill
                    scale: 20 //波纹圆环最大限制，值越大波纹越大
                },
                label: {
                    show: false,
                    position: 'right', //显示位置
                    offset: [5, 0], //偏移设置
                    formatter: function (params) {//圆环显示文字
                        return params.data.name;
                    },
                    fontSize: '20',
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


    return {
        // backgroundColor: '#061d4d',
        geo: {
            map: 'china',
            aspectScale: 0.85,
            layoutCenter: ["50%", "50%"], //地图位置
            layoutSize: '100%',
            itemStyle: {
                shadowColor: '#0d29a1',
                shadowOffsetX: 0,
                shadowOffsetY: 30,
                opacity: 0.5,
                emphasis: {
                    areaColor: '#0d29a1',
                }
            },
            regions: [{
                name: '南海诸岛',
                itemStyle: {
                    areaColor: 'rgba(0, 10, 52, 1)',
                    borderColor: 'rgba(0, 10, 52, 1)',
                    opacity: 0,
                    label: {
                        show: false,
                        color: "#009cc9",
                    },
                },
                label: {
                    show: false,
                    color: '#FFFFFF',
                },
            }],
        },
        series: series
    }
})
const { run, data, err } = useRequest(mapChina, {
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