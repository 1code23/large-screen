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
  height: 250px;
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
        background: url(../assets/imgsSupply/tit-one.png) no-repeat;
      }
    }
  }
  &.one {
    width: 265px;
    height: 192px;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-one.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.two {
    width: 265px;
    height: 192px;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-two.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.three {
    width: 265px;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-three.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.four {
    width: 265px;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-four.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.five {
    width: 544px;
    height: 255px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-five.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.six {
    width: 544px;
    height: 270px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-six.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  &.seven {
    width: 544px;
    height: 220px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-seven.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.eight {
    width: 544px;
    height: 240px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-eight.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .card-body {
      background: url(../assets/imgsSupply/3dPieBg.png) no-repeat center 60%;
      background-size: 40% 70%;
      // padding: -30% 0 0;
    }
  }
  &.nine {
    width: 544px;
    height: 240px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-nine.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  &.ten {
    width: 544px;
    height: 270px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-ten.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  &.eleven {
    width: 700px!important;
    height: 272px!important;
    .card-header {
      &-title {
        background: url(../assets/imgsSupply/tit-eleven.png) no-repeat;
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
