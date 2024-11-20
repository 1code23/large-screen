<script setup>
import { ref, computed, watch,onMounted } from "vue";

import { useRequest } from "@/hooks/useRequest/index";
import { ztpiechart } from "@/server/api/data";

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

let option = computed(() => {
  return {
    tooltip: {
      trigger: "item",
      formatter: "{b} : <br/>{c} ({d}%)",
    },
    legend: {
      bottom: "0",
      itemHeight: 12,
      itemWidth: 12,
      orient: "horizontal",
      left: "center",
      textStyle: {
        color: "rgba(51, 51, 51, 1)",
        fontSize: 14,
      },
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "",
        type: "pie",
        radius: "70%",
        center: ["50%", "45%"],
        // data: chartData.value.sort(function (a, b) {
        //   return a.value - b.value;
        // }),
        roseType: "radius",
        label: {
          alignTo: "edge",
          formatter: "{name|{b}}\n{time|{c}条 {d}%}",
          edgeDistance: 10,
          lineHeight: 30,
          fontSize: 14,
          rich: {
            time: {
              fontSize: 14,
              color: "rgba(33, 150, 83, 1)",
            },
          },
          textStyle: {
            color: "#000",
          },
        },
        labelLine: {
          lineStyle: {
            color: "#8591A5",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        data: [
          {
            name: chartData.value[0]?.name,
            value: chartData.value[0]?.value,
            itemStyle: {
              normal: {
                color: "rgba(111, 207, 151, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
          {
            name: chartData.value[1]?.name,
            value: chartData.value[1]?.value,
            itemStyle: {
              normal: {
                color: "rgba(39, 174, 96, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
          {
            name: chartData.value[2]?.name,
            value: chartData.value[2]?.value,
            itemStyle: {
              normal: {
                color: "rgba(33, 150, 83, 1)",
                shadowColor: "rgba(0, 0, 0, .3)",
                shadowBlur: 10,
              },
            },
          },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
      },
    ],
  };
});
const chartFlag = ref(true);
const nameList1 = ref([]);
const nameList2 = ref([]);
const pCheckDataList = ref([]);
function generateRandomData(flag) {
  if (flag) {
    chartFlag.value = false
  } else {
    chartFlag.value = true
  }
  if (flag) {
    return nameList1.value;
  } else {
    return nameList2.value;
  }
 
}



const { run, data, err } = useRequest(ztpiechart, {
  manual: true,
  onSuccess: (res) => {
    chartData.value = res.data.data || [];

    // 模拟数据变化
    setInterval(() => {
      // 修改chartData的值，模拟数据变化
      let newChartData = generateRandomData(chartFlag.value);
      chartData.value = newChartData; // 生成随机数据的函数
    }, 5000); // 每1秒变化一次
  },
});

run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});

const selectChartData = () =>{
  nameList2.value=[];
  nameList1.value=[];
        selectSaleData({type:'3'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              if(index>2){
                const dataItem = {
                  value: element.dataOne,
                  name: element.name,
                };
                nameList1.value.push(dataItem)
              }else{
                const dataItem1 = {
                  value: element.dataOne,
                  name: element.name,
                };
                nameList2.value.push(dataItem1)
              }
            });
          }
          //第一次渲染数据
          let newChartData = generateRandomData(chartFlag.value);
          chartData.value = newChartData; // 生成随机数据的函数
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
  <div class="zt-pie-chart" @dblclick="updateData()">
    <v-chart class="pie-chart" :autoresize="true" :option="option" />

    <el-dialog title="数据种类占比" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
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
.zt-pie-chart {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // padding-top: 20px;
}
</style>