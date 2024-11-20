<script setup lang="ts">
import { RouterView } from "vue-router";
//数据大屏自适应函数
const handleScreenAuto = () => {
  // 设计稿：1920 * 1080
  // 设计稿：1920 * 1080
  // 设配目标：1920 * 1080 ( 1 : 1) | 3840* 2160 ( 2 : 2 ) | 7680 * 2160 ( 4 : 2)

  const designDraftWidth = 1920; //设计稿的宽度
  const designDraftHeight = 1080; //设计稿的高度

  //根据屏幕的变化适配的比例
  const scale =
    document.documentElement.clientWidth /
      document.documentElement.clientHeight <
    designDraftWidth / designDraftHeight
      ? document.documentElement.clientWidth / designDraftWidth
      : document.documentElement.clientHeight / designDraftHeight;
  //缩放比例
  (
    document.querySelector("#app") as any
  ).style.transform = `scale(${scale}) translate(-50%)`;
};

//初始化自适应  ----在刚显示的时候就开始适配一次
handleScreenAuto();
//绑定自适应函数   ---防止浏览器栏变化后不再适配
window.onresize = () => handleScreenAuto();
</script>

<template>
  <div class="screen-wrapper">
    <div class="screen" id="screen">
      <RouterView />
    </div>
  </div>
</template>
