<script setup>
import { ref, computed } from "vue";
import { CountTo } from "vue3-count-to";
import { useRequest } from "@/hooks/useRequest/index";
import { getFifthchart } from "@/server/api/businessThree";

const configData = ref([]);
const configDataTwo = ref([]);
let option = computed(() => {
  return {
    rowNum: 5, // 表行数
    data: configData.value, // 表数据
    waitTime: 3000, // 轮播时间间隔(ms)
    hoverPause: true, // 悬停暂停
    columnWidth: [120,70],
  };
});
let optionTwo = computed(() => {
  return {
    rowNum: 5, // 表行数
    data: configDataTwo.value, // 表数据
    waitTime: 3000, // 轮播时间间隔(ms)
    hoverPause: true, // 悬停暂停
    columnWidth: [120,70],
  };
});
const { run, data, err } = useRequest(getFifthchart, {
  manual: true,
  onSuccess: (res) => {
    // 初始化两个空数组来存储结果
    const oddIndexedArray = [];
    const evenIndexedArray = [];
    if(res?.data?.data?.length > 0){
       // 遍历原始数据数组
      res.data.data.forEach((item, index) => {
          if (index % 2 === 0) { // 如果索引是偶数
              evenIndexedArray.push(item);
          } else { // 如果索引是奇数
              oddIndexedArray.push(item);
          }
      });
      configData.value = evenIndexedArray;
      configDataTwo.value = oddIndexedArray;
    }
  },
});
/** 表格行点击事件 */
function onclick() {
  console.log("表格被点击啦");
}
run({});
// 实现每隔1秒，一条数据上移
</script>

<template>
  <div class="fifth-center-table">
      <dv-scroll-board
        :config="option"
        :onclick="onclick"
        style="width: 50%; height: 100%"
      />
      <dv-scroll-board
        :config="optionTwo"
        :onclick="onclick"
        style="width: 50%; height: 100%"
      />
  </div>
</template>

<style lang="less">
.fifth-center-table {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .dv-scroll-board {
    display: flex;
    align-items: center;
    justify-content: center;
    .row {
      &-item {
        background: #b6c5bf !important;
        position: relative;
        color: #219653;
        font-family: "PingFang SC";
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        border: 1px solid #8db0a2;
        height: 36px !important;
        line-height: 36px !important;
        margin: 8px 0;
        padding-left: 32px;
        box-sizing: border-box;
        width: 250px;

        &::before {
          content: "";
          position: absolute;
          top: 4px;
          width: 26px;
          height: 26px;
          left: 10px;
          background-image: url("../../../../../assets/imgsSupply/tableApple.png"); /* 添加背景图路径 */
          background-size: cover; /* 背景图覆盖整个伪元素 */
          background-position: center; /* 背景图居中显示 */
        }

        &::after {
          content: "吨";
          position: absolute;
          top: 0;
          right: 10px;
          color: #305605;
          font-size: 16px;
          font-style: normal;
          font-weight: 500;
        }
        .ceil:nth-child(2) {
          line-height: 36px !important;
          padding: 0px !important;
          color: white!important;
        }
      }
    }
  }
}
</style>
