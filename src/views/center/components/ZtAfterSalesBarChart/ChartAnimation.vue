<script setup>
import { ref, computed, watch,onMounted } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztaftersalesbarchart } from "@/server/api/data";

import * as echarts from "echarts";
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
import {selectSaleData,updateSaleData} from '@/api/chartData';
import { update } from "lodash";
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

const chartBg = ref([]);
const chartName = ref([]);
const chartData = ref([]);

let option = computed(() => {
  return {
    grid: {
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "40",
      containLabel: false, // 图表两侧是否留白
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (params) {
        // return "及格率<br>" + params[0].name + ": " + params[0].value + "%";
      },
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLabel: {
          textStyle: {
            color: "#fff",
            fontSize: "16",
            lineHeight: 16,
          },
          // 调整左侧文字的3个属性，缺一不可
          verticalAlign: "bottom",
          align: "right",
          //调整文字上右下左
          padding: [0, -90, 16, 0],
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: chartName.value,
      },
      {
        type: "category",
        inverse: true,
        axisLabel: {
          textStyle: {
            color: "rgba(33, 150, 83, 1)",
            fontSize: "16",
            lineHeight: 16,
            fontWeight: 700,
          },
          // 调整左侧文字的3个属性，缺一不可
          verticalAlign: "bottom",
          align: "right",
          //调整文字上右下左
          padding: [0, 10, 16, 0],
          formatter: "{value} {b|(吨)}",
          rich: {
            b: {
              color: "rgba(153, 150, 144, 1)",
              fontSize: 12,
              lineHeight: 16,
            },
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: chartData.value,
      },
    ],
    series: [
      {
        showBackground: true,
        backgroundStyle: {
          color: "rgba(61, 61, 61, 0.32)",
        },
        name: "值",
        type: "bar",
        zlevel: 1,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              { offset: 0, color: "rgba(33, 150, 83, 1)" },
              { offset: 1, color: "rgba(0, 0, 0, 1)" },
            ]),
          },
        },
        barWidth: 12,
        data: chartData.value,
      },
      {
        //顶部的横杠
        type: "pictorialBar",
        symbol: "rect",
        symbolSize: [4, 16],
        symbolOffset: [4, 0, 4, 0],
        symbolPosition: "end",
        data: chartData.value,
        itemStyle: {
          color: "rgba(33, 150, 83, 1)",
        },
      },
    ]
  };
});
const nameList1 = ref([]);
const contentList1 = ref([]);
const nameList2 = ref([]);
const contentList2 = ref([]);

const pCheckDataList = ref([]);

const chartFlag = ref(true);
const updateFlag = ref(false);

function generateRandomData(flag) {
  if (flag) {
    chartFlag.value = false
  } else {
    chartFlag.value = true
  }
  // const randomValue = () => Math.floor(Math.random() * 100);
  if (flag) {
    return {
    name: nameList1.value,
    value: contentList1.value,
  };
  } else {

    return {
    name: nameList2.value,
    value: contentList2.value,
  };
  }

 
}
const { run, data, err } = useRequest(ztaftersalesbarchart, {
  manual: true,
  onSuccess: (res) => {
    // 模拟数据变化
    setInterval(() => {
      // 修改chartData的值，模拟数据变化
      let newChartData = generateRandomData(chartFlag.value);
      chartData.value = newChartData.value ; // 生成随机数据的函数
      chartName.value = newChartData.name ; // 生成随机数据的函数
    }, 6000); // 每60秒变化一次

    chartBg.value = res.data.data.bg || [];
  },
});

run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});

const selectChartData = () =>{
  nameList2.value=[];
  contentList2.value=[];
  nameList1.value=[];
  contentList1.value=[];
        selectSaleData({type:'1'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              if(index>4){
                nameList2.value.push(element.name)
                contentList2.value.push(element.dataOne)
              }else{
                nameList1.value.push(element.name)
                contentList1.value.push(element.dataOne)
              }
            });
          }
          //第一次渲染数据
      let newChartData = generateRandomData(chartFlag.value);
      chartData.value = newChartData.value ; // 生成随机数据的函数
      chartName.value = newChartData.name ; // 生成随机数据的函数
        }).catch(error => {
          console.log(error);
        });
}

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
  <div class="zt-bar-chart" @dblclick="updateData()">
    <v-chart class="bar-chart" :autoresize="true" :option="option" />
    
    <el-dialog title="销售/售后/市场分析" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
.zt-bar-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>