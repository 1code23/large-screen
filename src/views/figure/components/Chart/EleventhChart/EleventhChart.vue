<script setup>
import { ref, computed, watch ,onMounted} from 'vue'

import { useRequest } from '@/hooks/useRequest/index'
import { getEleventhchart } from "@/server/api/businessTwo";

import * as echarts from 'echarts';
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

const chartData = ref([])
const xdata = ref([])

let option = computed(() => {
    var option = {
            angleAxis: {
                axisLine: {
                    show: true,
                    lineStyle: {
                    color: '#A9A9A9'
                    }
                },
                axisLabel: {
                    color: '#000000',
                    fontSize: 12,              
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                    color: '#A9A9A9'
                    }
                },
                axisTick: {//坐标轴刻度
				show: false
			},
                borderRadius: 270,
                min: 0,
                max: 50,
                interval: 10
            },
            radiusAxis: {
                type: 'category',
                data: xdata.value,
                axisPointer:{
                    label:{
                        show:true,
                        // margin:300,
                    }
                },
                z: 1000,
                axisLabel: {
                    color: '#000',
                    fontSize: 8,
                    interval: 0, //设置成 0 强制显示所有横轴信息
		
                },
                axisTick: {//坐标轴刻度
				show: false
			},
            },
            polar: {
                radius: ["0%", "65%"], 
            },
            tooltip: {
                // show:true,
                // trigger: 'item',
                // formatter: function (params, ticket, callback) {
                //     return params.name + ' : ' + _that.toolTipData[params.dataIndex] + ' (' + params.data + '%)'
                // }
            },
            series: [{
                type: 'bar',
                data: chartData.value,
                coordinateSystem: 'polar',
                // name: 'A',
                // stack: 'a',
                barWidth: 5,
                itemStyle: {
                    normal: {
                    // 定制显示（按顺序）
                    color: function (params) {
                        var colorList = [
                            { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
                            { offset: 0, color: '#7E916C' }, // 0% 处的颜色
                            { offset: 1, color: '#3C9E83' } // 100% 处的颜色
                            ]},
                            { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
                            { offset: 0, color: '#93978D' }, // 0% 处的颜色
                            { offset: 1, color: '#395E11' } // 100% 处的颜色
                            ]},
                            { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
                            { offset: 0, color: '#496A25' }, // 0% 处的颜色
                            { offset: 1, color: '#85FB01' } // 100% 处的颜色
                            ]},
                            { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [
                            { offset: 0, color: '#CAEFAD' }, // 0% 处的颜色
                            { offset: 1, color: '#2D9169' } // 100% 处的颜色
                            ]}
                        ];
                        return colorList[params.dataIndex]
                    }
                    }
                }
            }],
        }  
    return option
})

// const { run, data, err } = useRequest(getEleventhchart, {
//     manual: true,
//     onSuccess: (res) => {
//         chartData.value = res.data.data.data || [];
//         xdata.value = res.data.data.xdata || [];
//     }
// })

// run({});



onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    let list1=[]
    let list2=[]
        selectSaleData({type:'17'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                list1.push(element.dataOne);
                list2.push(element.name);
            });
          }
          chartData.value=list1;
          xdata.value=list2;
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
    <div class="category-chart" @dblclick="updateData()">
        <v-chart class="chart" :autoresize="true" :option="option" />

        <el-dialog title="问题占比" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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


<style lang="less">
.category-chart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>