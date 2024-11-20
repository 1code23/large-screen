<script setup>
import { ref, computed, watch,onMounted } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getTenthPiechart } from "@/server/api/businessTwo";
import * as echarts from "echarts";
import { use } from "echarts/core";
import bgImg from "../../../../../assets/imgsFigure/afterSale.png";
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

    const leftArryOne = ref([]);
    const leftArryTwo = ref([]);
    const leftCountOne = ref(0);
    const leftCountTwo = ref(0);
    const leftTextOne = ref('');
    const leftTextTwo = ref('');
    const rightTextOne = ref('');
    const rightTextTwo = ref('');
    const rightArryOne = ref([]);
    const rightArryTwo = ref([])

    let option = computed(() => {
        return {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
            {
            name: "库存情况",
            type: "pie",
            radius: "68%",
            center: ["50%", "50%"],
            clockwise: false,
            data: leftArryOne.value,
            label: {
                normal: {
                textStyle: {
                    color: "red",
                    fontSize: 14,
                },
                },
            },
            labelLine: {
                normal: {
                show: false,
                },
            },
            itemStyle: {
                normal: {
                borderWidth: 2,
                borderColor: "#D4D4D4",
                },
                emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
            },
        ],
        color: ["#6FCF97", "#6FCF97"],
        }
    });

    let optionTwoTwo = computed(() => {
        return {
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
            {
            name: "库存情况",
            type: "pie",
            radius: "68%",
            center: ["50%", "50%"],
            clockwise: false,
            data: leftArryOne.value,
            label: {
                normal: {
                textStyle: {
                    color: "red",
                    fontSize: 14,
                },
                },
            },
            labelLine: {
                normal: {
                show: false,
                },
            },
            itemStyle: {
                normal: {
                borderWidth: 2,
                borderColor: "#D4D4D4",
                },
                emphasis: {
                borderWidth: 0,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
                },
            },
            },
        ],
        color: ["#6FCF97", "#6FCF97"],
        }
    });

    let optionTwo = computed(() => {
        return {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%",
        },
        title: [
        {
        text: "满意度",
        left: "45%",
        top: "50%",
        textAlign: "center",
        textStyle: {
            fontWeight: "normal",
            fontSize: "12",
            color: "#000",
            textAlign: "center",
        },
        }],
        series: [
        {
        type: "gauge",
        name: "",
        radius: "80%",
        center: ['50%','55%'],
        startAngle: "240",
        endAngle: "-60",
        splitNumber: "500",
        pointer: {
            show: false,
        },
        detail: {
            offsetCenter: [0, -5],
            formatter: "{value}%",
            fontSize:12,
            color:'#305605'
        },
        data: rightArryTwo.value,
        axisLine: {
            show: true,
            lineStyle: {
            color: [
                [0.84, "#305605"],
                [1, "#132F4F"],
            ],
            width: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
            },
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: true,
            length: 25,
            lineStyle: {
            color: "blue",
            width: 0,
            type: "solid",
            shadowColor: "blue",
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            opacity: 1,
            },
        },
        axisLabel: {
            show: false,
        },
        },
    ],
        }
    });

    let optionThree = computed(() => {
        return {
        tooltip: {
            formatter: "{a} <br/>{b} : {c}%",
        },
        title: [
        {
        text: "接入率",
        left: "45%",
        top: "40%",
        textAlign: "center",
        textStyle: {
            fontWeight: "normal",
            fontSize: "12",
            color: "#000",
            textAlign: "center",
        },
        }],
        series: [
        {
        type: "gauge",
        name: "",
        radius: "80%",
        center: ['50%','40%'],
        startAngle: "240",
        endAngle: "-60",
        splitNumber: "500",
        pointer: {
            show: false,
        },
        detail: {
            offsetCenter: [0, -5],
            formatter: "{value}%",
            fontSize:12,
            color:'#305605'
        },
        data: rightArryTwo.value,
        axisLine: {
            show: true,
            lineStyle: {
            color: [
                [0.98, "#219653"],
                [1, "#6FCF97"],
            ],
            width: 5,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
            },
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: true,
            length: 25,
            lineStyle: {
            color: "blue",
            width: 0,
            type: "solid",
            shadowColor: "blue",
            shadowOffsetX: 10,
            shadowOffsetY: 10,
            opacity: 1,
            },
        },
        axisLabel: {
            show: false,
        },
        },
    ],
        }
    });

// const { run, data, err } = useRequest(getTenthPiechart, {
//     manual: true,
//     onSuccess: (res) => {
//         leftArryOne.value = res.data.data.leftArryOne|| [];
//         leftArryTwo.value = res.data.data.leftArryTwo|| [];
//         leftCountOne.value = res.data.data.leftCountOne|| 0;
//         leftCountTwo.value = res.data.data.leftCountTwo|| 0;
//         leftTextOne.value = res.data.data.leftTextOne|| '';
//         leftTextTwo.value = res.data.data.leftTextTwo|| '';
//         rightTextOne.value = res.data.data.rightTextOne|| '';
//         rightTextTwo.value = res.data.data.rightTextTwo|| '';
//         rightArryOne.value = res.data.data.rightArryOne|| [];
//         rightArryTwo.value = res.data.data.rightArryTwo|| [];
//     },
// });
// run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
        selectSaleData({type:'16'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
         let one = [ {
                "value": response.data[0].dataTwo,
                "name":  response.data[0].dataOne
            },
            {
                "value": response.data[0].dataFour,
                "name":  response.data[0].dataThree
            }] 
        leftArryOne.value =one;
        let two = [ {
                "value": response.data[1].dataTwo,
                "name":  response.data[1].dataOne
            },
            {
                "value": response.data[1].dataFour,
                "name":  response.data[1].dataThree
            }] 
        leftArryTwo.value = two;
        leftCountOne.value = response.data[0].dataFive;
        leftCountTwo.value = response.data[1].dataFive;
        leftTextOne.value = "服务量";
        leftTextTwo.value = "咨询量";
        rightTextOne.value = "满意度";
        rightTextTwo.value = "接入率";
        let three = [ {
                "value": response.data[0].dataSix
            },
            ] 
        let four = [ 
            {
                "value":  response.data[1].dataSix
            }] 
        rightArryOne.value = three;
        rightArryTwo.value = four;

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
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo,dataThree:scope.dataThree,dataFour:scope.dataFour
    ,dataFive:scope.dataFive,dataSix:scope.dataSix
  }
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
    <div class="tenthChart" @dblclick="updateData()">
        <!-- 左侧 -->
        <div class="left-con">
            <div class="first-pie-out">
                <div class="first-pie">
                    <div class="startCon">
                        <img src="../../../../../assets/imgsFigure/starBg.png" alt="">
                    </div>              
                    <v-chart class="left-chart" :autoresize="true" :option="option" />
                    <div class="left-chart-text">{{leftCountOne}}</div>
                    <img class="bgImg" :src="bgImg" alt="">
                </div>
                <div class="left-chart-name">{{leftTextOne}}</div>
            </div>

            <div class="first-pie-out">
                <div class="first-pie">
                    <div class="startCon">
                        <img src="../../../../../assets/imgsFigure/starBg.png" alt="">
                    </div>
                    <v-chart class="left-chart" :autoresize="true" :option="optionTwoTwo" />
                    <div class="left-chart-text">{{leftCountTwo}}</div>
                    <img class="bgImg" :src="bgImg" alt="">
                </div>
                <div class="left-chart-name">{{leftTextTwo}}</div>
            </div>
        </div>
        <!-- 右侧 -->
        <div class="right-con">
            <div class="second-pie">
                <v-chart class="right-chart" :autoresize="true" :option="optionTwo" />
            </div>
            <div class="second-pie">
                <v-chart class="right-chart" :autoresize="true" :option="optionThree" />
            </div>
        </div>


        <el-dialog title="售后" v-model="updateFlag" width="1200px" @close="cancel" append-to-body>
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
              label="类型1"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入类型1。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="类型1数量"
              prop="dataTwo"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataTwo"
                  placeholder="请输入类型1数量。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="类型2"
              prop="dataThree"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataThree"
                  placeholder="请输入类型2。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="类型2数量"
              prop="dataFour"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataFour"
                  placeholder="请输入类型2数量。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="总数"
              prop="dataFive"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataFive"
                  placeholder="请输入总数。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="满意度"
              prop="dataSix"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataSix"
                  placeholder="请输入满意度。"
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
@keyframes zoom-in-out {
    0% { transform: scale(1); }
    50% { transform: scale(1.5); }
    100% { transform: scale(1); }
}

@keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.tenthChart {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;

    .left-con{
        width: 65%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .first-pie-out{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            .first-pie{
                // background: url('../../../../../assets/imgsFigure/afterSale.png') no-repeat;
                // background-size: 100% 100%;
                position: relative;
                width: 80px;
                height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                // justify-content: center;
                // background: rgba(#000, #000, #000, 0.1);

                .startCon{
                    animation: zoom-in-out 1s infinite;
                    top: -10px;
                    position: absolute;
                    img{
                        width: 30px;
                        height: 25px;
                    }
                }

                .left-chart{
                    margin-top: 10px;
                    width: 40px;
                    height: 40px;
                }
                .left-chart-text{
                    font-size: 20px;
                    color: #6FCF97;
                    display: inline-block;
                    margin-top: -5px;  
                    // margin-bottom: 20px;
                    display: block;
                }
                .bgImg{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    animation: rotate 2s infinite linear;
                }
            }

            .left-chart-name{
                color: #000000;
                text-align: center;
                font-family: "Microsoft YaHei";
                font-size: 10px;
                font-style: normal;
                display: block;
                margin-top: 5px;  
            }
        }

    }

    .right-con{
        width: 35%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        
        .second-pie{
            width: 100%;
            height: 50%;
        }
    }
}
</style>