<script setup>
import { ref, computed, watch ,onMounted} from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";

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
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
]);

const chartData = ref([]);
const chartFlag = ref(true);

let option = computed(() => {
  return {
    dataset: chartData.value,
    tooltip: {
      backgroundColor: "#033b77",
      borderColor: "#17a2ad",
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      trigger: "item",
    },
    legend: {
      show: true,
      orient: "horizontal",
      top: "0",
      right: "0",
      itemGap: 14,
      align: "right",
      icon: "circle",
      itemWidth: 10,
      padding: [0, 0, 10, 0],
      textStyle: {
        color: "rgba(51, 51, 51, 1)",
        fontSize: "12px",
        fontWeight: 300,
      },
    },
    grid: {
      top: "30",
      left: "0",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        axisPointer: {
          type: "shadow",
        },
        axisLine: {
          //是否显示以及样式设置
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.9)",
          margin: 10,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        nameGap: 15, // 坐标单位与坐标轴的距离
        fontSize: 12,
        splitLine: {
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: "1",
            color: "rgba(57, 69, 106, 0.6)",
            type: "dashed",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          fontSize: 12,
          color: "rgba(0, 0, 0, 0.7)",
        },
      },
    ],
    series: [
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(33, 150, 83, 1)",
            },
            {
              offset: 1,
              color: "rgba(33, 150, 83, 0)",
            },
          ]),
        },
      },
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(39, 174, 96, 1)",
            },
            {
              offset: 1,
              color: "rgba(39, 174, 96, 0)",
            },
          ]),
        },
      },
      {
        type: "bar",
        barWidth: 9,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgba(250, 0, 0, 1)",
            },
            {
              offset: 1,
              color: "rgba(250, 0, 0, 0)",
            },
          ]),
        },
      },
    ],
  };
});
const source1 = ref([]);
const source2 = ref([]);
function generateRandomData(flag) {
  if (flag) {
    chartFlag.value = false
  } else {
    chartFlag.value = true
  }
  const dimensions = ["product", "数据接入", "数据调用", "预警信息"];
  const source = [];
  if (flag == true) {
    return {
    code: 0,
    msg: "ok",
    data: {
      dimensions: dimensions,
      source: source1,
    },
  };
  } else {
    return {
    code: 0,
    msg: "ok",
    data: {
      dimensions: dimensions,
      source: source2,
    },
  };
  }
  


}
const { run, data, err } = useRequest(ztbarchart, {
  manual: true,
  onSuccess: (res) => {
    chartData.value = res.data.data || {};

    // 模拟数据变化
    setInterval(() => {
      // 修改chartData的值，模拟数据变化
      let newChartData = generateRandomData(chartFlag.value);
      chartData.value = newChartData.data; // 生成随机数据的函数
    }, 4000); // 每60秒变化一次
  },
});

run({});
const pCheckDataList = ref([]);
onMounted(() => {
  selectChartData();
});
const updateFlag = ref(false);
const updateData = () =>{
  updateFlag.value=true;
}
const cancel = () =>{
  updateFlag.value=false;
}

const selectChartData = () =>{
  source1.value=[];
  source2.value=[];
        selectSaleData({type:'2'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              if(index>7){
                const dataItem = {
                product: element.name,
                数据接入: element.dataOne,
                数据调用: element.dataTwo,
                预警信息: element.dataThree,
                };
                source1.value.push(dataItem)
              }else{
                const dataItem1 = {
                product: element.name,
                数据接入: element.dataOne,
                数据调用: element.dataTwo,
                预警信息: element.dataThree,
                };
                source2.value.push(dataItem1)
              }
            });
          }
          //第一次渲染数据
          let newChartData = generateRandomData(chartFlag.value);
          chartData.value = newChartData.data; // 生成随机数据的函数
        }).catch(error => {
          console.log(error);
        });
}

const submitForm_data = (scope) =>{
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo,dataThree:scope.dataThree}
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
  <div class="zt-bar-chart"  @dblclick="updateData()">
    <v-chart class="bar-chart" :autoresize="true" :option="option" />

    <el-dialog title="数据接入量" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false" />
            <el-table-column
              label="product"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入product。"
                  maxlength="30"
                  :show-word-limit="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="数据接入"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入数据接入。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="数据调用"
              prop="dataTwo"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataTwo"
                  placeholder="请输入数据调用。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="预警信息"
              prop="dataThree"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataThree"
                  placeholder="请输入预警信息。"
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
  padding-top: 10px;
}
</style>