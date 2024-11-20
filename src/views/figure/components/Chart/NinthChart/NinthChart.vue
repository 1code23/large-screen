<script setup>
import { ref, computed, watch,onMounted } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { ztbarchart } from "@/server/api/data";
import { getNineChartPiechart } from "@/server/api/businessTwo";
import * as echarts from "echarts";
import { use } from "echarts/core";
import moneyImg from "@/assets/imgsFigure/frame.png";
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


const outerItems = ref([]) 

// const { run, data, err } = useRequest(getNineChartPiechart, {
//     manual: true,
//     onSuccess: (res) => {
//         outerItems.value = res.data.data.data || [];
//     },
// });
// run({});


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    let list=[];
        selectSaleData({type:'15'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
                if(element.dataTwo=="3"){
                    list.push({
                    count:element.dataOne,
                    name:element.name,
                    innerItems:[{
                        id: 1
                    },
                    {
                        id: 2
                    },
                    {
                        id: 3
                    }]
                })
                }else if(element.dataTwo=="2"){
                    list.push({
                    count:element.dataOne,
                    name:element.name,
                    innerItems:[{
                        id: 1
                    },
                    {
                        id: 2
                    },
                    ]
                })
                }else{
                    list.push({
                    count:element.dataOne,
                    name:element.name,
                    innerItems:[{
                        id: 1
                    },
                    ]
                })
                }       
            });
          }
          outerItems.value=list;
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
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo}
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
    <div class="NinthChart" @dblclick="updateData()">
            <div class="ninth-chart-item" v-for="outerItem in outerItems" :key="outerItem.id">

                <!-- 火苗 -->
                <div class="flame">
                    <div class="flame-con" v-for="innerItem in outerItem.innerItems" :key="innerItem.id">
                        <img :src="moneyImg" alt="">
                    </div>
                </div>
                
                <div class="content">
                    <div class="name">{{outerItem.name}}</div>
                    <!-- 进度条 -->
                    <div class="wrapper">
                        <div class="progress" :style="{ width: outerItem.count*1.5 + 'px'}"></div>
                    </div>
                    <div class="chance">{{outerItem.count}}%</div>
                </div>

            </div>

            <el-dialog title="Top5" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
            <el-table-column
              label="类型"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入类型。"
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
              label="热度"
              prop="dataTwo"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataTwo"
                  placeholder="请输入热度。"
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
.NinthChart {
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 10px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // .ninth-chart{
    //     width: 100%;
    //     height: 20px;
    // }

    .ninth-chart-item{
        width: 100%;
        // height: 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        // margin-bottom: 2px;

        .flame{
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 14px;
            padding-left: 56px;
            text-align: bottom;
            margin-bottom: 2px;

            .flame-con{
                margin-right: 5px;
                img{
                width: 10px;
                height: 12px;
                }
            }
        }

        .content{
        width: calc(100%);
        height: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        .name{
            width: 46px;
            text-align: right;
            color: #000000;
            font-size: 10px;
            font-style: normal;
            font-weight: 900;
        }

        .chance{
            width: 30px; 
            height: 100%;
            color: #000000;
            text-align: right;
            font-family: "PingFang SC";
            font-size: 10px;
            font-style: normal;
            font-weight: 900;
        }

        .wrapper {
            margin: 0 8px;
            width: calc(100% - 16px - 46px - 30px);
            height: 8px;
            border-radius: 38px;
            border: 1px solid #939494;
        }

        .progress {
            // width: 70%;
            height: 100%;
            border-radius: 38px;
            background: linear-gradient(90deg, #305605 0%, #30560500 100%);
            text-align: center;
        }

    }

    }

}
</style>