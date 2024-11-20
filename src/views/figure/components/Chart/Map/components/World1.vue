
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

var geoCoordMap = {
  南宁: [108.479, 23.1152],
  广州: [113.5107, 23.2196],
  重庆: [107.7539, 30.1904],
  芬兰: [24.909912, 60.169095],
  美国: [-100.696295, 33.679979],
  日本: [139.710164, 35.706962],
  韩国: [126.979208, 37.53875],
  瑞士: [7.445147, 46.956241],
  东南亚: [117.53244, 5.300343],
  澳大利亚: [135.193845, -25.304039],
  德国: [13.402393, 52.518569],
  英国: [-0.126608, 51.208425],
  加拿大: [-102.646409, 59.994255],
};

var CQData = [[{ name: "重庆" }, { name: "英国", value: 70 }]];

var GZData = [[{ name: "广州" }, { name: "日本", value: 30 }]];

var NNData = [
  [{ name: "南宁" }, { name: "加拿大", value: 80 }],
  [{ name: "南宁" }, { name: "美国", value: 100 }],
  [{ name: "南宁" }, { name: "澳大利亚", value: 95 }],
  [{ name: "南宁" }, { name: "瑞士", value: 50 }],
  [{ name: "南宁" }, { name: "广州", value: 50 }],
  [{ name: "南宁" }, { name: "韩国", value: 50 }],
];

var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = geoCoordMap[dataItem[1].name];
    var toCoord = geoCoordMap[dataItem[0].name];
    if (fromCoord && toCoord) {
      res.push([fromCoord, toCoord]);
    }
  }
  return res;
};


var series = []; // 3D飞线
var dser = []; // 2D散点坐标
[
  ["重庆", CQData],
  ["广州", GZData],
  ["南宁", NNData],
].forEach(function (item) {
  dser.push(
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 3,
      rippleEffect: {
        brushType: "stroke",
      },
      label: {
        fontSize: 24,
        show: true,
        position: "right",
        formatter: "{b}",
      },
      itemStyle: {
        normal: {
          color: "#f5f802",
        },
      },
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[1].name,
          value: geoCoordMap[dataItem[1].name],
          symbolSize: dataItem[1].value / 4,
        };
      }),
    },
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 3,
      rippleEffect: {
        brushType: "stroke",
      },
      label: {
        normal: {
          show: true,
          position: "left",
          fontSize: 18,
          formatter: "{b}",
        },
      },
      itemStyle: {
        normal: {
          color: "#ff0000",
        },
      },
      data: [
        {
          name: item[0],
          value: geoCoordMap[item[0]],
          symbolSize: parseInt(Math.random() * 20 + 10),
          label: {
            normal: {
              position: "right",
            },
          },
        },
      ],
    }
  );
  series.push({
    type: "lines3D",
    effect: {
      show: true,
      period: 3, //速度
      trailLength: 0.5, //尾部阴影
    },
    lineStyle: {
      //航线的视图效果
      color: "#9ae5fc",
      width: 3,
      opacity: 0.6,
    },
    data: convertData(item[1]), // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
  });

});

let option = computed(() => {
  return {
    // backgroundColor: '#061d4d',
    title: {
      show: true,
    },
    globe: {
      baseTexture: "./img/baseTexture.jpg",
      heightTexture: "./img/heightTexture.jpg",
      top: "middle",
      left: "center",
      globeRadius: 60,
      displacementScale: 0,
      environment: "none",
      shading: "color",
      globelight: { // 光照阴影
        main: {
          color: '#fff', // 光照颜色
          intensity: 1.2, // 光照强度
          shadow: false, // 是否显示阴影
          alpha: 40,
          beta: -30
        },
        ambient: {
          intensity: 0.5
        }
      },
      viewControl: {
        projection: 'perspective',
        alpha: 90,
        beta: 0,
        center: [0, 0, 0], // 视角
        targetCoord: [110.46, 10.92],
        autoRotate: true,
        autoRotateAfterStill: 10,
        distance: 110 // 视距
      },
      postEffect: {
        enable: true,
        depthOfField: {         //景深效果是模拟摄像机的光学成像效果，在对焦的区域相对清晰，原理对焦的区域则会逐渐模糊
          enable: false,
          focalDistance: 50
        }
      },
    },
    series: series
  }

})

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
