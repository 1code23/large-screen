<template>
    <div ref="chartDom" style="width: 100%; height: 100%" @dblclick="updateData()">

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

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { getFifthLdchart } from "@/server/api/businessTwo";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

const chartDom = ref<null | HTMLDivElement>(null);
const seriesList = ref([]);
const xAxisList = ref([]);
const dataZoomEndValue = 3;

const xdata = ref([]);
const chartData = ref([]);

const option = computed(() => {
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
        data: xAxisList.value,
        },
        yAxis: {
        type: "value",
        name: "单位: 个",
        nameTextStyle: {
            color: "#4D4B48",
            fontSize: 16,
        },
        axisLine: {
            show: true,
            lineStyle: {
            color: "#000",
            },
        },
        axisLabel: {
            color: "#999690",
            fontSize: 16,
        },
        splitLine: {
            show: true,
            lineStyle: {
            color: "#A2A3A3",
            type: "dashed",
            },
        },
        interval: 1000,
        },
        dataZoom: [
        {
            show: false,
            xAxisIndex: 0,
            startValue: 0,
            endValue: dataZoomEndValue,
        },
        ],
        series: [
        {
            type: "bar",
            barWidth: 18,
            itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                    {
                    offset: 0,
                    color: "#305605",
                    },
                    {
                    offset: 0.8,
                    color: "#CACCC8",
                    },
                ],
                false
                ),
            },
            },
            data: seriesList.value,
        },
        ],
    };
});

// const { run, data, err } = useRequest(getFifthLdchart, {
//     manual: true,
//     onSuccess: (res) => {
//         xAxisList.value = res.data.data.xdata || [];
//         seriesList.value = res.data.data.data || [];
//     },
// });
// onMounted(() => {
//     run({});
// });

const pCheckDataList = ref([]);
onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});

const selectChartData = () =>{
    let xAxisList1=[];
    let seriesList1=[];
        selectSaleData({type:'11'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                xAxisList1.push(element.name)
                seriesList1.push(element.dataOne)
            });
          }
          xAxisList.value=xAxisList1;
          seriesList.value=seriesList1;
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


watch([xAxisList, seriesList], ([newXAxisList, newSeriesList]) => {
    if (chartDom.value && newXAxisList.length > 0 && newSeriesList.length > 0) {
        const myChart = echarts.init(chartDom.value);
        console.log(option.value.dataZoom, "newSeriesList.length");
        setInterval(() => {
        if (option.value.dataZoom[0].endValue === newXAxisList.length) {
            option.value.dataZoom[0].startValue = 0;
            option.value.dataZoom[0].endValue = dataZoomEndValue;
        } else {
            option.value.dataZoom[0].startValue =
            option.value.dataZoom[0].startValue + 1;
            option.value.dataZoom[0].endValue =
            option.value.dataZoom[0].endValue + 1;
        }
        myChart.setOption(option.value);
        }, 2000);
        option.value && myChart.setOption(option.value);
    }
});
</script>
