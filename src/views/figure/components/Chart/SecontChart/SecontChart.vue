<script setup>
import { ref, computed, watch ,onMounted} from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getSecontZxchart } from "@/server/api/businessTwo";
import * as echarts from "echarts";
import { use } from "echarts/core";
// import { CanvasRenderer } from "echarts/renderers";
// import { LineChart } from "echarts/charts";
// import {
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
//     GridComponent,
//     DataZoomComponent,
// } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

// use([
//     CanvasRenderer,
//     LineChart,
//     TitleComponent,
//     TooltipComponent,
//     LegendComponent,
//     GridComponent,
//     DataZoomComponent,
// ]);

const xdata = ref([]);
const chartData = ref([]);

let option = computed(() => {
    return {
    grid: {
        left: 0,
        right: 10,
        top: 45,
        bottom: 7,
        containLabel: true,
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: xdata.value,
        triggerEvent: true,
        splitLine: {
        show: false,
        },
        axisLine: {
        show: true,
        lineStyle: {
            width: 2,
            color: "#000000",
        },
        },
        axisTick: {
        show: false,
        },
        axisLabel: {
        color: "#000000",
        fontSize: 14,
        fontWeight: "bold",
        textShadowColor: "#000",
        textShadowOffsetY: 2,
        },
    },
    yAxis: {
        name: "%",
        nameTextStyle: {
        color: "#4D4B48",
        fontSize: 16,
        textShadowColor: "red",
        textShadowOffsetY: 2,
        },
        type: "value",
        splitLine: {
        show: false,
        },
        axisLine: {
        show: true,
        lineStyle: {
            width: 2,
            color: "#000000",
        },
        },
        axisTick: {
        show: false,
        },
        axisLabel: {
        color: "#999690",
        fontSize: 16,
        textShadowColor: "#000",
        textShadowOffsetY: 2,
        },
    },
    series: [
        {
        data: chartData.value,
        type: "line",
        symbol: "circle",
        symbolSize: 12,
        show: false,
        lineStyle: {
            color: "#4EA474",
        },
        label: {
            show: false,
            position: "top",
            textStyle: {
            color: "green",
            fontSize: 18,
            fontWeight: "bold",
            },
        },
        showSymbol: false, // 不显示折线的小圆点
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [  // 渐变颜色
                    {
                        offset: 0,
                        color: '#305605',
                    },
                    {
                        offset: 1,
                        color: '#CCCDCA',
                    },
                ],
                global: false,
            },
        },
        },
    ],
    };
});

// const { run, data, err } = useRequest(getSecontZxchart, {
//     manual: true,
//     onSuccess: (res) => {
//         xdata.value = res.data.data.xdata || [];
//         chartData.value = res.data.data.data || [];
//     },
// });
// run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    xdata.value=[];
    chartData.value=[];
        selectSaleData({type:'8'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                xdata.value.push(element.name)
                chartData.value.push(element.dataOne)
            });
          }
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
    <div class="SecontChart"  @dblclick="updateData()">
        <v-chart class="chart" :autoresize="true" :option="option" />

      <el-dialog title="各地市同比增加趋势" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
.SecontChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>