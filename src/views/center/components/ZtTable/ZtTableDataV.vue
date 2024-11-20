<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-03-04 17:47:48
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-05 18:07:09
 * @FilePath: /business-center/src/views/center/components/ZtTable/ZtTable.vue
 * @Description: 中台页面--表格
-->

<script setup>
import { ref, computed,onMounted } from "vue";
import { CountTo } from "vue3-count-to";
import { useRequest } from "@/hooks/useRequest/index";
import { getZtTableData } from "@/server/api/data";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

const configData = ref([]);
let option = computed(() => {
  return {
    header: configData.value.header, // 表头数据
    rowNum: 7, // 表行数
    data: configData.value.data, // 表数据
    waitTime: 2000, // 轮播时间间隔(ms)
    hoverPause: true, // 悬停暂停
    columnWidth:[50,200,200,200,80],
  };
});
// const { run, data, err } = useRequest(getZtTableData, {
//   manual: true,
//   onSuccess: (res) => {
//     configData.value = res.data.data;
//   },
// });


/** 表格行点击事件 */
function onclick() {
  console.log("表格被点击啦");
}
// run({});
// 实现每隔1秒，一条数据上移


onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const pCheckDataList = ref([]);
const selectChartData = () =>{
  const header =  [
            "序号",
            "信息",
            "系统",
            "时间",
            "状态"]
  configData.value=[];
        selectSaleData({type:'6'}).then(response => {
          pCheckDataList.value=response.data;
          let tempData={};
          let dataList=[];
          tempData.header=header;
          tempData.data=dataList;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              dataList.push([element.dataTwo,element.dataOne,element.name,element.dataFour,element.dataThree])
            });
          }
          tempData.data=dataList;
          configData.value=tempData;
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
  const param ={id:scope.id,name:scope.name,dataOne:scope.dataOne,dataTwo:scope.dataTwo,dataThree:scope.dataThree,dataFour:scope.dataFour}
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
  <div class="center-table" @dblclick="updateData()">
    <dv-scroll-board
      :config="option"
      :onclick="onclick"
      style="width: 100%; height: 90%;"
      
    />

    <el-dialog title="服务状态列表" v-model="updateFlag" width="1200px" @close="cancel" append-to-body>
      <el-table :data="pCheckDataList" ref="pCheckData" >
            <el-table-column label="序号" align="center" prop="id" v-if="false"  />
            <el-table-column label="序号" align="center" prop="dataTwo" />
            <el-table-column
              label="信息"
              prop="dataOne"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataOne"
                  placeholder="请输入信息。"
                  maxlength="30"
                  :show-word-limit="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="系统"
              prop="name"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.name"
                  placeholder="请输入系统。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="时间"
              prop="dataFour"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataFour "
                  placeholder="请输入时间。"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              prop="dataThree"
              align="center"
            >
              <template #default="scope">
                <el-input
                  type="text"
                  v-model="scope.row.dataThree"
                  placeholder="请输入状态。"
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
.center-table {
  width: 100%;
  height: 100%;
  .dv-scroll-board {
    .header {
      background: none !important;
      color: rgba(48, 86, 5, 1);
      font-size: 14px;
      padding: 17px 0 12px 0;
      &-item {
        height: 20px !important;
        line-height: 20px !important;
      } 
    }
    .row {
      &-item {
        background: none !important;
        font-size: 14px;
        color: rgba(39, 174, 96, 1);
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: -1px;
          width: 0;
          height: 0;
          border-width: 4px; /* 设置边长 */
          border-style: solid;
          border-color: transparent #27ae60 transparent transparent; /* 上、右、下、左颜色为红色（#ff0000） */
          transform: rotate(45deg);
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 32px;
          background: rgba(48, 86, 5, 0.12);
          border: 1px solid rgba(39, 174, 96, 1);
          border-radius: 2px;
        }
        .ceil {
          line-height: 32px;
        }
        &:hover {
          cursor: pointer;
          color: #000;
          &::after {
            background: rgba(0, 0, 0, 0.16);
            border: 1px solid rgba(0, 0, 0, 1);
          }
        }
      }
    }
  }
}
</style>