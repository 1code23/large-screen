<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2023-04-24 15:15:08
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-06 18:20:02
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
  width: 510px;
  min-height: 220px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;

  &-header {
    position: absolute;
    left: 0;
    right: 0;
    height: 36px;
    line-height: 36px;

    &-title {
      box-sizing: border-box;
      &.left {
        width: 100%;
        height: 36px;
        background: url(../assets/imgs/modalTitle1.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  &.one {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle1.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  &.two {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle2.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  &.three {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle3.png) no-repeat left center;
        background-size: 100%;
      }
    }
    .card-body {
      background: url(../../public/img/3dPieBg.png) no-repeat center 60%;
      background-size: 80%;
      padding: 10% 0 0;
    }
  }
  &.four {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle4.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  &.five {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle5.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  &.six {
    .card-header {
      &-title {
        background: url(../assets/imgs/modalTitle6.png) no-repeat left center;
        background-size: 100%;
      }
    }
  }
  // 中间
  &.centerTop {
    .card-header {
      display: none;
    }
    .card-body {
      height: 100%;
      top: 0;
    }
  }

  &-body {
    position: absolute;
    height: calc(100% - 36px);
    top: 36px;
    bottom: 0;
    width: 100%;
  }
}
</style>
