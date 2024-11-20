<template>
    <div class="data">
        <main class="data-view" style="user-select:none;">
            <!-- 头部 -->
            <BigTitle />
            <!-- 左侧 -->
            <CardBox class="left-40 one" style="top: 90px">
                <FirstChart />
            </CardBox>
            <CardBox class="left-40 two" style="top: 90px; left: 320px;">
                <SecontChart />
            </CardBox>
            <CardBox class="left-40 three" style="top: 280px;">
                <ThirdChart />
            </CardBox>
            <CardBox class="left-40 four" style="top: 280px; left: 320px;">
                <FourthChart />
            </CardBox>
            <CardBox class="left-40 five" style="top: 530px;">
                <FifthChart />
            </CardBox>
            <CardBox class="left-40 six" style="top: 800px;">
                <SixthChart />
            </CardBox>

            <!-- 中间 -->
            <div class="center map" style="top: 92px">
                <Map />
            </div>

            <CardBox class="center eleven" style="top: 800px">
                <EleventhChart />
            </CardBox>

            <!-- 右侧 -->
            <CardBox class="right-40 seven" style="top: 90px">
                <SeventhChart />
            </CardBox>
            <CardBox class="right-40 eight" style="top: 320px">
                <EightPieChart />
            </CardBox>
            <CardBox class="right-40 nine" style="top: 560px">
                <NinthChart />
            </CardBox>
            <CardBox class="right-40 ten" style="top: 800px;">
                <TenthChart />
            </CardBox>
        </main>
    </div>
</template>

<script setup lang='ts'>
import BigTitle from "@/componentsSupply/BigTitle.vue";
import CardBox from "@/componentsSupply/CardBox.vue";

// 左侧
import FirstChart from "./components/Chart/FirstChart/FirstChart.vue"; //左侧第一个模块
import SecontChart from "./components/Chart/SecontChart/SecontChart.vue"; //左侧第二个模块
import ThirdChart from "./components/Chart/ThirdChart/ThirdChart.vue"; //左侧第三个模块
import FourthChart from "./components/Chart/FourthChart/FourthChart.vue"; //左侧第四个模块
import FifthChart from "./components/Chart/FifthChart/FifthChart.vue"; //左侧第五个模块
import SixthChart from "./components/Chart/SixthChart/SixthChart.vue"; //左侧第六个模块

// 中间
import Map from './components/Chart/Map/Map.vue'; //地图
import EleventhChart from "./components/Chart/EleventhChart/EleventhChart.vue"; //左侧第十一个模块

// 右侧
import SeventhChart from "./components/Chart/SeventhChart/SeventhChart.vue"; //右侧第七个模块
import EightPieChart from "./components/Chart/EightPieChart/EightPieChart.vue"; //右侧第八个模块
import NinthChart from "./components/Chart/NinthChart/NinthChart.vue"; //右侧第九个模块
import TenthChart from "./components/Chart/TenthChart/TenthChart.vue"; //右侧第十个模块
</script>

<style lang='less' scoped>
@font-face {
    font-family: electronicFont;
    src: url(../../assets/fonts/DS-DIGIT.TTF);
}

// 大屏
.data {
    width: 100%;
    height: 100%;

    .data-view {
        position: relative;
        width: 100%;
        height: 100%;

        .left-40 {
            left: 40px;
        }

        .right-40 {
            right: 40px;
        }

        .center {
            margin: 0 auto;
            left: 0;
            right: 0;
            width: 646px;
            height: 650px;
        }
    }
}
</style>