<template>
    <div ref="chartDom" style="width: 100%; height: 100%;" @dblclick="updateData()">

        <el-dialog title="工单数量" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
            <el-table-column
              label="月份"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入月份。"
                  maxlength="30"
                  :show-word-limit="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="数量"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入数量。"
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
import * as echarts from 'echarts';
import { ref, onMounted, watch, reactive, computed } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { getTwelfthZztchart } from "@/server/api/businessTwo";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

const chartDom = ref<null | HTMLDivElement>(null);
// const seriesList = [380, 125, 240, 354, 447, 580, 425, 240, 354, 247, 345,431];
// const xAxisList = ["01",
//             "02",
//             "03",
//             "04",
//             "05",
//             "06",
//             "07",
//             "08",
//             "09",
//             "10",
//             "11",
//             "12"
//             ];
const seriesList = ref([]);
const xAxisList = ref([]);
const dataZoomEndValue = 9;

const xdata = ref([]);
const chartData = ref([]);

const option = computed(() => {
    return {
    grid: {
        left: 0,
        right: 10,
        top: 15,
        bottom: 10,
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: xAxisList.value,
        axisTick:{
        show:false
        },
        axisLine: {
        lineStyle: {
            color: "#000",
        },
        },
        axisLabel: {
        color: "#000",
        fontSize: 10,
        },
    },
    yAxis: {
        axisLine: {
            show:true,
        lineStyle: {
            color: "#000",
        },
        },
        axisLabel: {
        color: "#999690",
        fontSize: 10,
        },
        splitLine: {
        show: true,
        lineStyle: {
            color: "#A2A3A3",
            type: 'dashed',
        },
        },
        interval: 100,
    },
    dataZoom: [
        {
        show: false,
        xAxisIndex: 0,
        startValue: 0,
        endValue: dataZoomEndValue
        }
    ],
    series: [
        {
        type: "bar",
        barWidth: 8,
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
        data: seriesList.value
        }
    ]
};
});

// const { run, data, err } = useRequest(getTwelfthZztchart, {
//     manual: true,
//     onSuccess: (res) => {
//         xAxisList.value = res.data.data.xdata || [];
//         seriesList.value = res.data.data.data || [];
//     },
// });
// onMounted(() => {
//     run({});
// });


onMounted(() => {
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    let list1 =[]
    let list2 =[]
        selectSaleData({type:'18'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                list1.push(element.name)
                list2.push(element.dataOne)
            });
          }
          xAxisList.value =list1
          seriesList.value=list2
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