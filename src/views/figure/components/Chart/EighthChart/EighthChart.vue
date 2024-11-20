<script setup>
import { ref, computed, watch ,onMounted} from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getEighthChartPiechart } from "@/server/api/businessTwo";
import * as echarts from "echarts";
import { use } from "echarts/core";
import moneyImg from "@/assets/imgsFigure/tree.png";
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
const orchardCount = ref('');
const orchardCounttext = ref('');
const totalCount = ref('');

let option = computed(() => {
    return {
    legend: {
        orient: "vertical",
        show: true,
        right: "0%",
        top: "25",
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 0,
        textStyle: {
        color: "#",
        fontSize: 12,
        lineHeight: 20,
        rich: {
            percent: {
            color: "#305605",
            fontSize: 12,
            },
        },
        },
        formatter: (name) => {
        switch (name) {
            case xdata.value[0].name:
            return xdata.value[0].name+"\r\r\r\r{percent|"+xdata.value[0].value+"%} " + " ";
            case xdata.value[1].name:
            return xdata.value[1].name+"\r{percent|"+xdata.value[1].value+"%} " + " ";
            case xdata.value[2].name:
            return xdata.value[2].name+"\r\r\r\r{percent|"+xdata.value[2].value+"%} " + " ";
            default:
            break;
        }
        },
    },
    tooltip: {
        show: true,
    },
    series: [
        {
        type: "pie",
        radius: ["55%", "70%"],
        center: ["30%", "52%"],
        hoverAnimation: false,
        z: 10,
        label: {
            position: "center",
            formatter: () => {
            return "{total|"+totalCount.value+"} {danwei|(吨)}\r\n产量占比";
            },
            rich: {
            total: {
                fontSize: 16,
                color: "#305605",
            },
            danwei:{
                fontSize: 10,
                color: "#51702F",
            }
            },
            color: "#305605",
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 20,
        },
        data: xdata.value,
        labelLine: {
            show: false,
        },
        },
    ],
    };
});

// const { run, data, err } = useRequest(getEighthChartPiechart, {
//     manual: true,
//     onSuccess: (res) => {
//         xdata.value = res.data.data.data || {};
//         orchardCount.value = res.data.data.orchardCount || '';
//         orchardCounttext.value = res.data.data.orchardCounttext || '';
//         console.log(orchardCount.value,orchardCounttext.value,'res.data.data.orchardCounttext11111111111')
//     },
// });
// run({});


onMounted(() => {
selectChartData1();
  selectChartData();
});

const selectChartData = () =>{
    let list =[];
        selectSaleData({type:'13'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                list.push({
                    value:element.dataOne,
                    name:element.name,
                    itemStyle:{
                        color:element.dataTwo
                    }
                })
            });
          }
          xdata.value=list;
        }).catch(error => {
          console.log(error);
        });
}
const selectChartData1 = () =>{
        selectSaleData({type:'14'}).then(response => {
          pCheckDataList1.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                orchardCount.value=element.dataOne
                orchardCounttext.value=element.name
                totalCount.value=element.dataTwo
            });
          }

        }).catch(error => {
          console.log(error);
        });
}
const updateFlag = ref(false);
const updateFlag1 = ref(false);
const updateData = () =>{
  updateFlag.value=true;
}
const updateData1 = () =>{
  updateFlag1.value=true;
}
const cancel = () =>{
  updateFlag.value=false;
  updateFlag1.value=false;
}
const submitForm_data = (scope) =>{
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo}
  updateSaleData(param).then(response => {
        if(response.status=="200"){
        ElMessage({
        message: '保存成功!',
        type: 'success',
        })
        // 刷新页面数据
        selectChartData();
        selectChartData1();
        }
        }).catch(error => {
          console.log(error);
        });
}
const pCheckDataList = ref([]);
const pCheckDataList1 = ref([]);
</script>

<template>
    <div class="EighthChart">
        <!-- 左侧 -->
        <div class="first-div left-con" @dblclick="updateData1()">
            <img :src="moneyImg" alt="">
            <div>
                <span>{{orchardCount}}</span>
                <span>{{orchardCounttext}}</span>
            </div>
            <el-dialog title="果园信息" v-model="updateFlag1" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList1" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
            <el-table-column
              label="描述"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入描述。"
                  maxlength="30"
                  :show-word-limit="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="面积"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入面积。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="产量"
              prop="dataTwo"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataTwo"
                  placeholder="请输入产量。"
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
        <!-- 右侧 -->
        <div class="first-div" @dblclick="updateData()">
            <v-chart class="chart" :autoresize="true" :option="option" />
            <el-dialog title="果园占比" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
    </div>
</template>


<style lang="less" scoped>
.EighthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;

    .first-div{
        width: 50%;
        height: 100%;
    }

    .left-con{
        display: flex;
        align-items: center;
        img{
            width: 75px;
            height: 75px;
        }
        span{
            display: inline-block;
            color: #305605;
            font-family: "PingFang HK";
            font-size: 32px;
            font-style: normal;
            font-weight: 600;
            margin-left: 20px;
        }
        span:nth-child(2){
            font-size: 18px;
        }
    }
}
</style>