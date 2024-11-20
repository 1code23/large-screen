<!--左侧 第一个chart模块-->
<script setup>
    import { fullScreenClick } from '../../../../../../src/components/common.js'
    import moneyImg from "@/assets/imgsFigure/money-box.png";
    import moneyBoxlight from "@/assets/imgsFigure/money-box-light.png";

    import { ref,onMounted } from 'vue';
    import { useRequest } from "@/hooks/useRequest/index";
    import { getFirstchart } from "@/server/api/businessTwo";
    import { ElMessage } from 'element-plus'
    import {selectSaleData,updateSaleData} from '@/api/chartData';

    const items = ref();

    // const { run, data, err } = useRequest(getFirstchart, {
    // manual: true,
    // onSuccess: (res) => {
    //         items.value = res.data.data.data || {};
    //     },
    // });
    // run({});
    
onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
    items.value={};
        selectSaleData({type:'7'}).then(response => {
          pCheckDataList.value=response.data;
          let dataTemp={};
          if(response.data.length>0){
            const key1 =response.data[0].name
            const value1 = response.data[0].dataOne
            const key2 = response.data[1].name
            const value2 = response.data[1].dataOne
            const key3 = response.data[2].name
            const value3 = response.data[2].dataOne
            dataTemp={[key1]:value1,[key2]:value2,[key3]:value3}
          }
          items.value=dataTemp;
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
    <div class="first-chart-module" @dblclick="fullScreenClick($event)">
            <div class="module-item" v-for="(value, index) in items" :key="index">
                <div class="moneyImg-out" @dblclick="updateData()">
                    <img class="moneyBoxlight" :src="moneyBoxlight" alt="">
                    <img class="moneyImg" :src="moneyImg" alt="">
                </div>
                <span class="text">{{index}}</span>
                <div class="bottom">
                    <span>{{value}}</span>
                    <span v-if="index != '增长幅度'">万元</span>
                    <span v-if="index == '增长幅度'"> % </span>
                </div>
            </div>

    <el-dialog title="销售分析" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
              label="内容"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入内容。"
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
    @keyframes lightFadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    .first-chart-module {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        position: relative;

        .module-item{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            // background: red;

            .moneyImg-out{
                width: 96.53px;
                height: 76.03px;
                // background: green;

                .moneyBoxlight{
                    width: 96.53px;
                    height: 76.03px;
                    position: absolute;
                    top: -10px;  
                    animation: lightFadeIn 4s ease-in-out infinite;
                }

                .moneyImg{
                    width: 96.53px;
                    height: 76.03px;
                    position: absolute;
                    top: 0;  
                }
            }

            // img{
            //     width: 96.53px;
            //     height: 76.03px;
            //     position: absolute;
            //     top: 0;  
            //     // animation: rotate 2s infinite linear;
            // }

            .text{
                color: #219653;
                font-family: "PingFang SC";
                font-size: 14px;
                font-style: normal;
                font-weight: 500;
                margin: 7px 0 3px;
            }

            .bottom{
                width: 140px;
                height: 44px;
                background: url(../../../../../assets/imgsFigure/money-bottom.png) no-repeat;
                background-size: 100% 100%;
                box-sizing: border-box;
                text-align: center;
                line-height: 44px;
                span:nth-child(1) {
                    font-family: 'electronicFont';
                    color: #000000;
                    font-size: 20px;
                    font-style: normal;
                    font-weight: 400;
                }
                span:nth-child(2) {
                    color: #219653;
                    font-family: "PingFang SC";
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 500;
                    margin-left: 3px;
                }
            }
        }
    }
</style>
