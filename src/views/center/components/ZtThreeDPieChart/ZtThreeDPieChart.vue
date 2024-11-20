<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-02-27 13:41:47
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-04 14:54:05
 * @FilePath: /business-center/src/views/center/components/ZtThreeDPieChart/ZtThreeDPieChart.vue
 * @Description: 数据接入量--3D饼图
-->

<script setup>
import { ref, computed, watch ,onMounted} from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztthreedpiechart } from "@/server/api/data";

// import echartsGl from 'echarts-gl';
import * as echarts from "echarts";
import "echarts-gl";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

import { getPie3D, getParametricEquation } from "./ztthreedpiechart.js";
import {selectSaleData,updateSaleData} from '@/api/chartData';
import { ElMessage } from 'element-plus'
use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

const props = defineProps({
  date: Array,
  refreshKey: Number,
});

const color = ["#57DAEF", "#27AE60", "#4387F8", "#FF7723", "#9258FF"];

const chartData = ref([]);

let options = computed(() => {
  var option = {};
  chartData.value.forEach((item, index) => {
    item.itemStyle = {
      color: color[index],
    };
    item.label = {
      show: false,
      color: color[index],
      formatter: ["{b|{b}}", "{c|{c}}{b|人}", "{d|{d}%}"].join("\n"),
      // 用\n来换行
      rich: {
        b: {
          color: "#fff",
          lineHeight: 25,
          align: "left",
        },
        c: {
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.6)",
          textShadowColor: "#1c90a6",
          textShadowOffsetX: 0,
          textShadowOffsetY: 2,
          textShadowBlur: 5,
        },
        d: {
          color: color[index],
          align: "left",
        },
      },
    };
    item.labelLine = {
      lineStyle: {
        width: 10,
        color: "rgba(255,255,255,0.7)",
      },
    };
  });

  option = getPie3D(chartData.value, 0.8, 120, 23, 14, 0.5);
  // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
  option.series.push({
    name: "labelLine", //自己根据场景修改
    backgroundColor: "transparent",
    type: "pie",
    zlevel: -99,
    label: {
      opacity: 1,
      fontSize: 13,
      lineHeight: 20,
    },
    startAngle: -40,
    // 起始角度，支持范围[0, 360]。
    clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ["10%", "50%"],
    center: ["10%", "50%"],
    // top: "center",
    // left: "10%",
    data: chartData.value,
    itemStyle: {
      opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
    },
  });

  return option;
});

// const { run, data, err } = useRequest(ztthreedpiechart, {
//   manual: true,
//   onSuccess: (res) => {
//     chartData.value = res.data.data || [];
//   },
// });

// run({});



onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
  let list1 =[];
        selectSaleData({type:'21'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              list1.push({
                name:element.name,
                value:element.dataOne
              })
            });
          }
          chartData.value =list1;
        }).catch(error => {
          console.log(error);
        });
}
const updateFlag = ref(false);
const updateData = () =>{
  updateFlag.value=true;
}
const cancel = () =>{
  updateFlag.value=false;
}
const submitForm_data = (scope) =>{
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne}
  updateSaleData(param).then(response => {
        if(response.status=="200"){
        ElMessage({
        message: '保存成功!',
        type: 'success',
        })
        // 刷新页面数据
        selectChartData();
        }
        }).catch(error => {
          console.log(error);
        });
}
</script>

<template>
  <div class="zt-3dchart-box" id="3dPie"  @dblclick="updateData()">
    <v-chart
      class="chart"
      v-if="chartData.length"
      :autoresize="true"
      :option="options"
    />

    <el-dialog title="数据接入量" v-model="updateFlag" width="800px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id"  />
            <el-table-column
              label="名称"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入名称。"
                  maxlength="30"
                  :show-word-limit="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="比例"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入比例。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              class-name="small-padding fixed-width"
              fixed="right"
              width="160"
            >
              <template #default="scope">
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="submitForm_data(scope.row)"
                  >保存
                </el-button>
              </template>
            </el-table-column>
          </el-table>
       
     <div slot="footer" class="dialog-footer" style="margin-bottom: 10px; margin-top: 15px; margin-right: 5px"
     align="right">
       <el-button @click="cancel">退出</el-button>
     </div>
   </el-dialog>
  </div>
</template>


<style lang="less" scoped>
.zt-3dchart-box {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: -20px;
}
</style>
