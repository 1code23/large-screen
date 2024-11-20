<script setup lang="ts">
import { ref } from "vue";
import { CountTo } from "vue3-count-to";
</script>

<template>
  <!-- 荧光粒子动画 -->
  <div class="line-particle">
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
    <div class="circle-container"><div class="circle"></div></div>
  </div>
</template>

<style lang="less">
// 线上荧光粒子动画
.line-particle {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .circle-container {
    width: 8px;
    height: 8px;
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
        #219653,
        #219653 10%,
        rgba(153, 255, 255, 0) 56%
      );
      // animation: fadein-frames 200ms infinite, scale-frames 2s infinite;
      animation: spot-scale-frames 2s infinite;
    }
    &:nth-child(1) {
      box-shadow: -1px 0px 2px 0px #99ffff;
      animation-name: spot-move-frames-1;
      animation-duration: 2000ms; // 动画持续时间
      // animation-delay: 4544ms; // 动画延迟
    }
    &:nth-child(2) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-2;
      animation-duration: 1000ms;
      // animation-delay: 3000ms;
    }
    &:nth-child(3) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-3;
      animation-duration: 3000ms;
      // animation-delay: 5000ms;
    }
    &:nth-child(4) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-4;
      animation-duration: 3000ms;
      // animation-delay: 9000ms;
    }
    &:nth-child(5) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-5;
      animation-duration: 3000ms;
      // animation-delay: 13000ms;
    }
    &:nth-child(6) {
      box-shadow: 1px 1px 2px 0px #99ffff;
      animation-name: spot-move-frames-6;
      animation-duration: 3000ms;
      // animation-delay: 14000ms;
    }
    &:nth-child(7) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-7;
      animation-duration: 1000ms;
      // animation-delay: 15000ms;
    }
    &:nth-child(8) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-8;
      animation-duration: 3000ms;
      // animation-delay: 19000ms;
    }
    &:nth-child(9) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-9;
      animation-duration: 3000ms;
      // animation-delay: 24000ms;
    }
    &:nth-child(10) {
      box-shadow: 0px -1px 2px 0px #99ffff;
      animation-name: spot-move-frames-10;
      animation-duration: 3000ms;
      // animation-delay: 28000ms;
    }
  }
}
@keyframes spot-move-frames-1 {
  0% {
    transform: translate3d(130px, -260px, 0);
  }

  35% {
    transform: translate3d(186px, -224px, 0);
  }
  70% {
    transform: translate3d(120px, -190px, 0);
  }
  100% {
    transform: translate3d(184px, -154px, 0);
  }
}
@keyframes spot-move-frames-2 {
  0% {
    transform: translate3d(246px, -244px, 0);
  }

  100% {
    transform: translate3d(246px, -216px, 0);
  }
}
@keyframes spot-move-frames-3 {
  0% {
    transform: translate3d(358px, -254px, 0);
  }
  35% {
    transform: translate3d(310px, -224px, 0);
  }
  70% {
    transform: translate3d(370px, -188px, 0);
  }
  100% {
    transform: translate3d(310px, -152px, 0);
  }
}
@keyframes spot-move-frames-4 {
  0% {
    transform: translate3d(430px, -162px, 0);
  }
  35% {
    transform: translate3d(404px, -144px, 0);
  }
  70% {
    transform: translate3d(378px, -158px, 0);
  }
  100% {
    transform: translate3d(336px, -132px, 0);
  }
}
@keyframes spot-move-frames-5 {
  0% {
    transform: translate3d(420px, -70px, 0);
  }
  35% {
    transform: translate3d(394px, -84px, 0);
  }
  70% {
    transform: translate3d(368px, -70px, 0);
  }
  100% {
    transform: translate3d(316px, -100px, 0);
  }
}
@keyframes spot-move-frames-6 {
  0% {
    transform: translate3d(360px, 22px, 0);
  }
  35% {
    transform: translate3d(292px, -14px, 0);
  }
  70% {
    transform: translate3d(336px, -40px, 0);
  }
  100% {
    transform: translate3d(264px, -76px, 0);
  }
}
@keyframes spot-move-frames-7 {
  0% {
    transform: translate3d(246px, -26px, 0);
  }
  100% {
    transform: translate3d(246px, -58px, 0);
  }
}
@keyframes spot-move-frames-8 {
  0% {
    transform: translate3d(120px, 30px, 0);
  }
  35% {
    transform: translate3d(200px, -14px, 0);
  }
  70% {
    transform: translate3d(160px, -34px, 0);
  }
  100% {
    transform: translate3d(210px, -68px, 0);
  }
}
@keyframes spot-move-frames-9 {
  0% {
    transform: translate3d(58px, -76px, 0);
  }
  35% {
    transform: translate3d(86px, -90px, 0);
  }
  70% {
    transform: translate3d(126px, -68px, 0);
  }
  100% {
    transform: translate3d(174px, -98px, 0);
  }
}
@keyframes spot-move-frames-10 {
  0% {
    transform: translate3d(30px, -150px, 0);
  }
  35% {
    transform: translate3d(60px, -132px, 0);
  }
  70% {
    transform: translate3d(110px, -156px, 0);
  }
  100% {
    transform: translate3d(150px, -134px, 0);
  }
}
</style>