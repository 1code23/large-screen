
<script setup lang="ts">
import { ref ,onMounted} from "vue";
import { CountTo } from "vue3-count-to";
import { useRequest } from "@/hooks/useRequest/index";
import { getZtMidData } from "@/server/api/data";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

// const { data, loading } = useRequest(getZtMidData, {
//   defaultParams: [{}],
// });
const data = ref([]);
const pCheckDataList = ref([]);
onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});

const selectChartData = () =>{
  data.value=[];
        selectSaleData({type:'5'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              const dataItem = {
                id: element.dataOne,
                num: Number(element.dataTwo),
                title: element.name,
                unit: element.dataThree,
                };
                data.value.push(dataItem);
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
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo,dataThree:scope.dataThree}
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
  <div
  @dblclick="updateData()"
    class="center-data-item"
    v-for="(i, index) in data || []"
    :key="index"
  >
    <div class="total">
      <count-to :startVal="0" :endVal="i.num" :duration="1"></count-to> <span> ({{ i.unit }})</span>
    </div>
    <div class="title">
      {{ i.title }} 
    </div>

    <el-dialog title="数据分析" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
              label="数量"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="number"
                  v-model="scope.row.dataTwo"
                  placeholder="请输入数量。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="单位"
              prop="dataThree"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataThree"
                  placeholder="请输入单位。"
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
.center-data-item {
  display: inline-block;
  text-align: center;
  margin: 0 0 0 26px;
  width: 120px;
  height: 58px;
  overflow: hidden;
  &::after {
    content: "";
    width: 80px;
    height: 4px;
    border-radius: 80%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 1);
    position: absolute;
    left: 10px;
    top: -4px;
    animation: topLightFadeIn 4s ease-in-out infinite;
  }
  & > .total {
    padding: 6px 0 2px 0;
    span {
      font-size: 18px;
      color: rgba(48, 86, 5, 1);
      line-height: 26px;
    }
  }
  & > .title {
    font-size: 14px;
    color: rgba(48, 86, 5, 1);
    line-height: 20px;
  }
  &:nth-child(1) {
    background: url(../../../../assets/imgs/centerNumBg1.png) no-repeat center
      top;
  }
  &:nth-child(2) {
    background: url(../../../../assets/imgs/centerNumBg2.png) no-repeat center
      top;
  }
  &:nth-child(3) {
    background: url(../../../../assets/imgs/centerNumBg3.png) no-repeat center
      top;
  }
  &:nth-child(4) {
    background: url(../../../../assets/imgs/centerNumBg4.png) no-repeat center
      top;
  }
  &:nth-child(5) {
    background: url(../../../../assets/imgs/centerNumBg5.png) no-repeat center
      top;
  }
}
@keyframes topLightFadeIn {
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
</style>