<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2023-04-24 15:15:08
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-02-27 16:51:06
 * @FilePath: /business-center/src/components/CardBox.vue
 * @Description: 公共组件框
-->
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    titlePosition?: string;
  }>(),
  {
    titlePosition: "left",
  }
);
</script>

<template>
  <div class="card">
    <div class="card-header" :class="titlePosition">
      <div class="card-header-title" :class="titlePosition"></div>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.card {
  position: absolute;
  width: 390px;
  height: 208px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  &-header {
    position: absolute;
    left: 0;
    right: 0;
    height: 34px;
    line-height: 34px;

    &-title {
      box-sizing: border-box;
      &.left {
        width: 100%;
        height: 34px;
        background: url(../assets/imgsFigure/tit-one.png) no-repeat;
      }
    }
  }
  &.one {
    width: 510px;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-one.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.two {
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-two.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.three {
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-three.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.four {
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-four.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.five {
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-five.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.six {
    width: 870px!important;
    height: 330px;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-six.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  &.seven {
    width: 544px!important;
    height: 216px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-seven.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.eight {
    width: 544px!important;
    height: 164px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-eight.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.nine {
    width: 262px!important;
    height: 189px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-nine.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.ten {
    width: 262px!important;
    height: 189px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-ten.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.eleven {
    width: 262px!important;
    height: 184px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-eleven.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.twelve {
    width: 262px!important;
    height: 184px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-twive.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.thirteen {
    width: 262px!important;
    height: 184px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-thireen.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.fourteen {
    width: 870px!important;
    height: 220px!important;
    // background: pink;
    .card-header {
      &-title {
        background: url(../assets/imgsFigure/tit-fottin.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &-body {
    position: absolute;
    height: calc(100% - 34px);
    top: 34px;
    bottom: 0;
    width: 100%;
  }
}
</style>
