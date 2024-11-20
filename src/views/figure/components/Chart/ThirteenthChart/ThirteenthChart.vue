<script setup>
import { ref, computed, watch ,onMounted} from "vue";
import { useRequest } from "@/hooks/useRequest/index";
// import { ztbarchart } from "@/server/api/data";
import { getThirteenthPieChart } from "@/server/api/businessTwo";
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

const items = ref([]) 
const xdata = ref([]) 

let option = computed(() => {
    return {
    color: ["#305605", "#219653", "#27AE60"],
    tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c}$ ({d}%)",
        textStyle: {
        fontSize: 16,
        },
    },
    legend: {
        data: items.value,
        orient: "vertical",
        right: "5%",
        top: "center",
        itemWidth: 0,
        itemHeight: 0,
        // itemGap: 30,
        textStyle: {
        color: "#",
        fontSize: 12,
        },
    },
    series: [
        {
        name: "TITLE",
        type: "pie",
        clockwise: false,
        startAngle: 90,
        radius: ['50%', '80%'],
        center: ["38%", "51%"],
        hoverAnimation: false,
        roseType: "radius", //area
        data: xdata.value,
        // itemStyle: {
        //     normal: {
        //     borderColor: "#273454",
        //     borderWidth: "1",
        //     },
        // },
        label: {
            show: true,
            position: "inside",
            formatter: "{hr|}{d}%",
            rich: {
            hr: {
                backgroundColor: "#fff",
                borderRadius: 5,
                width: 30,
                height: 20,
                padding: [4, -10, -5, -50],
                shadowColor: "#fff",
                shadowBlur: 1,
                shadowOffsetX: "-10",
                shadowOffsetY: "0",
            },
            // a: {
            //     padding: [-35, 15, -20, 5],
            // },
            },
        },
        labelLine: {
            normal: {
            length: 0,
            length2: -5,
            lineStyle: {
                width: 1,
            },
            },
        },
        // label: {
        //     normal: {
        //         show: true,
        //         position: 'inside',
        //         formatter: '{d}%',
        //         formatter: function(data){
        //             return data.percent.toFixed(0)+"%";
        //         },
        //         textStyle : {
        //             align : 'center',
        //             baseline : 'middle',
        //             fontFamily : '微软雅黑',
        //             fontSize : 15,
        //             fontWeight : 'bolder'
        //         }
        //     },
        // },
        },
    ],
    };
});

// const { run, data, err } = useRequest(getThirteenthPieChart, {
//     manual: true,
//     onSuccess: (res) => {
//         xdata.value = res.data.data.xdata || [];
//         items.value = res.data.data.data || [];
//     },
// });
// run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    let list1 = []
    let list2 = []
        selectSaleData({type:'19'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                list1.push({
                    value:element.dataOne,
                    name:element.name
                })
                list2.push(element.name)
            });
          }
          xdata.value = list1;
          items.value = list2;
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
    <div class="ThirteenthChart" @dblclick="updateData()">
        <v-chart class="chart" :autoresize="true" :option="option" />

        <el-dialog title="工单状态" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
            <el-table-column
              label="状态"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入状态。"
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
.ThirteenthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>