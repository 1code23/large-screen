<!--
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2024-03-05 18:16:59
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-07 15:24:26
 * @FilePath: /business-center/src/views/center/components/ZtMidAnimation/ZtMidAnimation.vue
 * @Description: 中台 中间动画模块
-->

<script setup lang="ts">
import { ref } from "vue";
import { CountTo } from "vue3-count-to";
// import midPicLight from "@/assets/imgs/midPicLight.png";
</script>

<template>
  <div class="mid-cube-animation">
    <!--最大的空间div-->
    <div class="cube">
      <!--正方体的box-->
      <!--这个是大的正方体的六面-->
      <div class="out-front"></div>
      <div class="out-back"></div>
      <div class="out-left"></div>
      <div class="out-right"></div>
      <div class="out-top"></div>
      <div class="out-bottom"></div>

      <!--这个是小的正方体的六面-->
      <span class="in-front"> </span>
      <span class="in-back"> </span>
      <span class="in-left"> </span>
      <span class="in-right"> </span>
      <span class="in-top"></span>
      <span class="in-bottom"> </span>
    </div>
  </div>
</template>

<style lang="less">
.mid-cube-animation {
  perspective: 1000px; /*景深设置，视图距元素的距离  相当于摄像机*/
  width: 50px;
  left: 286px;
  top: 42px;
  position: absolute;

  & > div.cube {
    width: 50px;
    height: 50px;
    position: relative; /*开启相对定位，好让里面的元素开启定位时不会高度塌陷*/
    color: #ff92ff; /*字体的颜色*/
    font-size: 36px; /*字体大小*/
    font-weight: 100; /*字体细小*/
    text-align: center; /*文本字体左右居中*/
    transform-style: preserve-3d; /*开启这个，表示所有元素在3D平面呈现*/
    transform: rotateX(-50deg) rotateY(-50deg) rotateZ(0deg); /*一开始的角度，视觉上看一下*/
    animation: move 8s infinite linear; /*启动动画的名字、时长、无限循环、匀速播放*/
  }

  /*大的正方体的设置*/
  .cube {
    & > div {
      width: 100%; /*设置的宽度和父级一样*/
      height: 100%; /*设置的高度一样*/
      // border: 10px solid #66daff; /*边框设置*/
      // border-radius: 20px; /*设置一下圆角*/
      position: absolute; /*开启绝对定位，这样就全部叠在一起了*/
      background: linear-gradient(
        180deg,
        #219653 0%,
        #000 100%
      ); /*来个背景色，30%的透明度*/
      transition: transform 0.3s ease-in; /*过度变形的时间设置和快慢设置*/

      /*设置大的正方体的六个面的位置*/
      &.out-front {
        transform: translateZ(25px); /*设置前面的那一面的Z轴往前移*/
      }
      &.out-back {
        transform: translateZ(-25px) rotateY(180deg); /*设置后面的那一面的Z轴往后移，Y轴转一下。使得的背面的那一面是面向背面的*/
      }
      &.out-left {
        transform: translateX(-25px) rotateY(-90deg); /*设置左边的那一面在X轴上退一些，向左转*/
      }
      &.out-right {
        transform: translateX(25px) rotateY(90deg); /*设置右边的那一面在X轴上进一些，向右转*/
      }
      &.out-top {
        transform: translateY(-25px) rotateX(90deg); /*设置上边的那一面在Y轴上去一些，向后翻转*/
      }

      &.out-bottom {
        transform: translateY(25px) rotateX(-90deg); /*设置下边的那一面在X轴下去一些，向前翻*/
      }
    }
    /*小的正方体的设置*/
    & > span {
      display: block; /*先转变为块级元素*/
      width: 20px; /*设置宽度，因为是小的正方体*/
      height: 20px; /*设置高度*/
      background: linear-gradient(180deg, #6fcf97 0%, #219653 100%); /*背景色*/
      position: absolute; /*开启绝对定位*/
      top: 10px; /*因为高度是100，是原来的一半。要居中就上下都一样的50*/
      left: 10px; /*同理，因为宽度是100，是原来的一半。要居中就左右都一样的50*/
      // border: 5px solid #424242; /*边框设置*/
      opacity: 0.9; /*透明度设置成90%*/
      // backface-visibility: hidden; /*设置了透明度可以设置隐藏背面*/
      // border-radius: 30%; /*圆角*/

      /*设置小的正方体的六个面的位置*/
      &.in-front {
        transform: translateZ(10px); /*设置前面的那一面的Z轴往前移*/
      }
      &.in-back {
        transform: translateZ(-10px) rotateY(180deg); /*设置后面的那一面的Z轴往后移，Y轴转一下。使得的背面的那一面是面向背面的*/
      }
      &.in-left {
        transform: translateX(-10px) rotateY(-90deg); /*设置左边的那一面在X轴上退一些，向左转*/
      }
      &.in-right {
        transform: translateX(10px) rotateY(90deg); /*设置右边的那一面在X轴上进一些，向右转*/
      }
      &.in-top {
        transform: translateY(-10px) rotateX(90deg); /*设置上边的那一面在Y轴上去一些，向后翻转*/
      }
      &.in-bottom {
        transform: translateY(10px) rotateX(-90deg); /*设置下边的那一面在X轴下去一些，向前翻*/
      }
    }
  }
  /*当鼠标滑过这个div的时候。过渡变化下面的事件*/
  &:hover {
    .cube {
      div {
        &.out-front {
          transform: translateZ(50px); /*当鼠标滑过，前面就往前凸*/
        }
        &.out-back {
          transform: translateZ(-50px) rotateY(180deg); /*当鼠标滑过，前面就往后跑，加了旋转是因为一开始是平面的，不加会变会原样*/
        }
        &.out-left {
          transform: translateX(-50px) rotateY(-90deg); /*当鼠标滑过，左面就往左飞*/
        }
        &.out-right {
          transform: translateX(50px) rotateY(90deg); /*当鼠标滑过，右面就往右进*/
        }
        &.out-top {
          transform: translateY(-50px) rotateX(90deg); /*当鼠标滑过，上面就往上冒*/
        }
        &.out-bottom {
          transform: translateY(50px) rotateX(-90deg); /*当鼠标滑过，下面就往下弹*/
        }
      }
    }
  }
}

/*动画关键帧，翻滚吧！牛宝宝*/
@keyframes move {
  0% {
    transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
  }
  100% {
    transform: rotateX(720deg) rotateY(360deg) rotateZ(360deg);
  }
}
</style>