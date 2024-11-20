<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-03-05 18:16:59
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-06 17:42:09
 * @FilePath: /business-center/src/views/center/components/ZtMidAnimation/ZtMidAnimation.vue
 * @Description: 中台 中间动画模块
-->

<script setup lang="ts">
import { ref ,onMounted} from "vue";
import { CountTo } from "vue3-count-to";
import { useRequest } from "@/hooks/useRequest/index";
import { getZtRightAnimation } from "@/server/api/data";
import ZtRightLineAnimation from "./ZtRightLineAnimation.vue";
import { ElMessage } from 'element-plus'
import {selectSaleData,updateSaleData} from '@/api/chartData';

// const { data, loading } = useRequest(getZtRightAnimation, {
//   defaultParams: [{}],
// });
const pCheckDataList = ref([]);
const data = ref([]);
onMounted(() => {
  // 查询销售/售后数据/市场分析
  selectChartData();
});
const updateFlag = ref(false);
const selectChartData = () =>{
  data.value=[];
        selectSaleData({type:'4'}).then(response => {
          pCheckDataList.value=response.data;
          if(response.data.length>0){
            response.data.forEach((element,index) => {
              data.value.push(element.name)
            });
          }
        }).catch(error => {
          console.log(error);
        });
}
const updateData = () =>{
  updateFlag.value=true;
}
const cancel = () =>{
  updateFlag.value=false;
}
const submitForm_data = (scope) =>{
  const param ={id:scope.id,name:scope.name}
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
  <div class="right-animation-wrapper" @dblclick="updateData()">
    <div
      class="right-animation-title"
      v-for="(i, index) in data || []"
      :key="index"
    >
      <div>{{ i }}</div>
    </div>
    <!-- 荧光粒子动画 -->
    <div class="particle">
      <div class="circle-container"><div class="circle"></div></div>
      <div class="circle-container"><div class="circle"></div></div>
      <div class="circle-container"><div class="circle"></div></div>
      <div class="circle-container"><div class="circle"></div></div>
      <div class="circle-container"><div class="circle"></div></div>
    </div>
    <ZtRightLineAnimation />

    <el-dialog title="接入系统" v-model="updateFlag" width="600px" @close="cancel" append-to-body>
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
.right-animation-wrapper {
  width: 498px;
  height: 388px;
  margin: 56px auto 0;
  background: url(@/assets/imgs/rightTop.png) no-repeat center top;
  background-size: 100%;
  position: relative;
  .right-animation-title {
    font-size: 12px;
    color: #fff;
    background: rgba(33, 150, 83, 0.6);
    border: 1px solid rgba(33, 150, 83, 0.7);
    box-shadow: 0 0 5px 0.5px rgba(3, 251, 255, 0.65) inset;
    line-height: 16px;
    position: absolute;
    width: 90px;
    text-align: center;
    letter-spacing: -0.5px;
    &:nth-child(1) {
      // 销售易
      top: -16px;
      left: 72px;
    }
    &:nth-child(2) {
      // 诺明PM
      top: -16px;
      left: 228px;
    }
    &:nth-child(3) {
      // 易快报
      top: -16px;
      left: 386px;
    }
    &:nth-child(4) {
      top: 82px;
      right: 16px;
    }
    &:nth-child(5) {
      top: 180px;
      right: 16px;
    }
    &:nth-child(6) {
      top: 278px;
      left: 386px;
    }
    &:nth-child(7) {
      top: 278px;
      left: 228px;
    }
    &:nth-child(8) {
      top: 278px;
      left: 72px;
    }
    &:nth-child(9) {
      // 北森
      top: 180px;
      left: 16px;
    }
    &:nth-child(10) {
      top: 82px;
      left: 16px;
    }
  }
}
@keyframes particle {
  0% {
    transform: translateY(0) scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
  50% {
    transform: translateY(-50px) scale(1.2);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
  }
  100% {
    transform: translateY(-100px) scale(1);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  }
}

// 荧光粒子动画
.particle {
  width: 300px;
  height: 300px;
  margin: 0 auto;
  .circle-container {
    width: 10px;
    height: 10px;
    position: absolute;
    transform: translateY(-10vh);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    .circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      mix-blend-mode: screen;
      background-image: radial-gradient(
        #99ffff,
        #99ffff 10%,
        rgba(153, 255, 255, 0) 56%
      );
      animation: fade-frames 200ms infinite, scale-frames 2s infinite;
    }
    &:nth-child(1) {
      animation-name: move-frames-1;
      animation-duration: 8441ms;
      animation-delay: 4544ms;
      .circle {
        animation-delay: 3734ms;
      }
    }
    &:nth-child(2) {
      animation-name: move-frames-2;
      animation-duration: 9921ms;
      animation-delay: 5982ms;
      .circle {
        animation-delay: 2516ms;
      }
    }
    &:nth-child(3) {
      width: 3px;
      height: 3px;
      animation-name: move-frames-3;
      animation-duration: 10427ms;
      animation-delay: 3649ms;
      .circle {
        animation-delay: 731ms;
      }
    }
    &:nth-child(4) {
      animation-name: move-frames-4;
      animation-duration: 10427ms;
      animation-delay: 3649ms;
      .circle {
        animation-delay: 731ms;
      }
    }
    &:nth-child(5) {
      width: 6px;
      height: 6px;
      animation-name: move-frames-5;
      animation-duration: 10427ms;
      animation-delay: 3649ms;
      .circle {
        animation-delay: 731ms;
      }
    }
  }
}
// @keyframes fade-frames {
//   0% {
//     opacity: 1;
//   }
//   50% {
//     opacity: 0.7;
//   }
//   100% {
//     opacity: 1;
//   }
// }
@keyframes scale-frames {
  0% {
    transform: scale3d(0.4, 0.4, 1);
  }

  50% {
    transform: scale3d(2.2, 2.2, 1);
  }
  100% {
    transform: scale3d(0.4, 0.4, 1);
  }
}
@keyframes move-frames-1 {
  0% {
    transform: translate3d(100px, 160px, 0);
  }

  100% {
    transform: translate3d(80px, 80px, 0);
  }
}
@keyframes move-frames-2 {
  0% {
    transform: translate3d(150px, 160px, 0);
  }

  100% {
    transform: translate3d(180px, 90px, 0);
  }
}
@keyframes move-frames-3 {
  0% {
    transform: translate3d(180px, 150px, 0);
  }
  100% {
    transform: translate3d(220px, 100px, 0);
  }
}
@keyframes move-frames-4 {
  0% {
    transform: translate3d(160px, 190px, 0);
  }
  100% {
    transform: translate3d(240px, 130px, 0);
  }
}
@keyframes move-frames-5 {
  0% {
    transform: translate3d(90px, 180px, 0);
  }
  100% {
    transform: translate3d(70px, 100px, 0);
  }
}
</style>