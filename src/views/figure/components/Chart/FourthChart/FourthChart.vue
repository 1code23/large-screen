<script setup>
import { ref, computed, watch ,onMounted} from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getFourthLdchart } from "@/server/api/businessTwo";
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
// const chartData = ref([]);

let option = computed(() => {
    return {
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}个",
    },
    legend: {
        show: false,
    },
    calculable: true,
    series: [
        {
        name: "漏斗图",
        type: "funnel",
        left: "10%",
        top:25,
        //x2: 80,
        bottom:25,
        width: "60%",
        // height: {totalHeight} - y - y2,
        // min: 50,
        // max: 100,
        minSize: "40%",
        maxSize: "80%",
        sort: "descending",
        gap: 15,
        label: {
            normal: {
            show: false,
            position: "right",
            formatter:function (params, ticket, callback) {

                if (params.data.name == '线索量') {
                    return params.data.name +"转换率\n";
                } else if (params.data.name == '有效线索量') {
                    return params.data.name +"转换率\n ";
                }  else if (params.data.name == '转换量') {
                    return params.data.name +"转换率\n ";
                }  else if (params.data.name == '订单量') {
                    return params.data.name +"转换率\n ";
                }
},
            fontSize: 12,
            // color: "#000"
            },
            emphasis: {
            textStyle: {
                fontSize: 12,
            },
            },
        },
        labelLine: {
            normal: {
            //  length: 10,
            lineStyle: {
                width: 1,
                type: "dashed",
                color: "#000"
            },
            },
        },
        itemStyle: {
            normal: {
            borderColor: "#8BAA95",
            borderWidth: 1,
            },
        },
        data: xdata.value,
        },
        {
        name: "漏斗图",
        type: "funnel",
        left: "10%",
        top:25,
        //x2: 80,
        bottom:25,
        width: "60%",
        // height: {totalHeight} - y - y2,
        // min: 50,
        // max: 100,
        minSize: "40%",
        maxSize: "80%",
        sort: "descending",
        gap: 15,
        label: {
            normal: {
            show: true,
            position: "left",
            formatter: "{b}",
            fontSize: 12,
            color: "#000",
            },
            emphasis: {
            textStyle: {
                fontSize: 12,
            },
            },
        },
        labelLine: {
            normal: {
            // length: 10,
            show: false,
            lineStyle: {
                width: 1,
                type: "dashed",
                color: "#000"
            },
            },
        },
        itemStyle: {
            normal: {
            borderColor: "#8BAA95",
            borderWidth: 1,
            },
        },
        data: xdata.value,
        },
        {
        name: "漏斗图",
        type: "funnel",
        left: "10%",
        top:25,
        //x2: 80,
        bottom:25,
        width: "60%",
        // height: {totalHeight} - y - y2,
        // min: 50,
        // max: 100,
        minSize: "40%",
        maxSize: "80%",
        sort: "descending",
        gap: 15,
        label: {
            normal: {
            show: true,
            position: "inside",
            formatter: "{c}",
            fontSize: 12,
            color: "#000"
            },
            emphasis: {
            textStyle: {
                fontSize: 12,
            },
            },
        },
        labelLine: {
            normal: {
            //  length: 10,
            lineStyle: {
                width: 1,
                type: "dashed",
                color: "#000"
            },
            },
        },
        itemStyle: {
            normal: {
            borderColor: "#8BAA95",
            borderWidth: 1,
            },
        },
        data: xdata.value,
        },
    ],
    color: [
        "#27AE60",
        "#4AB778",
        "#6BBD8E",
        "#90C3A6",
    ],
    };
});

// const { run, data, err } = useRequest(getFourthLdchart, {
//     manual: true,
//     onSuccess: (res) => {
//         xdata.value = res.data.data.data || [];
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
        selectSaleData({type:'10'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                xdata.value.push({value:element.dataOne,name:element.name});
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
    <div class="FourthChart" @dblclick="updateData()">
        <v-chart class="chart" :autoresize="true" :option="option" />

        <el-dialog title="线索/商机" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
.FourthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>
