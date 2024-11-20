<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-03-05 18:16:59
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-07 14:18:54
 * @FilePath: /business-center/src/views/center/components/ZtMidAnimation/ZtMidAnimation.vue
 * @Description: 中台 中间动画模块
-->

<script setup lang="ts">
import { ref } from "vue";
import { CountTo } from "vue3-count-to";
import midPicLeftOne from "@/assets/imgs/midPic1.png";
import midPicLeftTwo from "@/assets/imgs/midPic2.png";
import midPicRight from "@/assets/imgs/midPic3.png";
import midPicRightTwo from "@/assets/imgs/midPic4.png";
import midPicCenter from "@/assets/imgs/midPic5.png";
import midPicCenterMin from "@/assets/imgs/midPic6.png";
import midPicLight from "@/assets/imgs/midPicLight.png";
import ZtMidCubeAnimation from "./ZtMidCubeAnimation.vue";
</script>

<template>
  <div class="mid-animation">
    <div class="mid-animation-item">
      <img class="light one-light" :src="midPicLight" alt="" />
      <img class="left-one" :src="midPicLeftOne" alt="" />
    </div>
    <div class="mid-animation-item">
      <img class="light two-light" :src="midPicLight" alt="" />
      <img class="left-two" :src="midPicLeftTwo" alt="" />
    </div>
    <div class="mid-animation-item">
      <img class="light three-light" :src="midPicLight" alt="" />
      <img class="right-one" :src="midPicRight" alt="" />
    </div>
    <div class="mid-animation-item">
      <img class="light four-light" :src="midPicLight" alt="" />
      <img class="right-two" :src="midPicRightTwo" alt="" />
    </div>
    <div class="mid-animation-item">
      <img class="light five-light" :src="midPicLight" alt="" />
      <img class="center" :src="midPicCenter" alt="" />
    </div>
    <div class="mid-animation-item">
      <!-- <img class="center-min" :src="midPicCenterMin" alt="" /> -->
      <ZtMidCubeAnimation />
    </div>
  </div>
</template>

<style lang="less">
.mid-animation {
  position: relative;
  width: 612px;
  height: 362px;
  margin: 0 auto;
  // background: url(../../../../src/assets/imgs/centerPic.png) no-repeat center
  //   top;
  // background-size: 100%;
  &-item {
    img {
      position: absolute;
    }
    .light {
      animation: lightFadeIn 4s ease-in-out infinite;
    }
    .one-light {
      width: 150px;
      top: 40px;
      left: 0px;
    }
    .left-one {
      top: 23px;
      left: 0;
      width: 150px;
    }
    .two-light {
      width: 148px;
      top: 252px;
      left: 0;
    }
    .left-two {
      top: 224px;
      left: 0;
      width: 150px;
    }
    .three-light {
      width: 148px;
      top: 54px;
      right: 0;
    }
    .right-one {
      top: 23px;
      right: 24px;
      width: 104px;
    }
    .four-light {
      width: 148px;
      top: 264px;
      right: 0;
    }
    .right-two {
      top: 224px;
      right: 24px;
      width: 104px;
    }
    .five-light {
      width: 296px;
      top: 114px;
      left: 164px;
    }
    .center {
      top: 3px;
      left: 10px !important;
      width: 220px !important;
    }
  }
}
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
</style>