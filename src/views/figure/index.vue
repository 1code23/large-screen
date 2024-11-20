<template>
    <div class="data">
        <main class="data-view" style="user-select:none;">
            <!-- 头部 -->
            <BigTitle />
            <!-- 左侧 -->
            <CardBox class="left-40 one" style="top: 90px">
                <FirstChart />
            </CardBox>
            <CardBox class="left-40 two" style="top: 300px;">
                <SecontChart />
            </CardBox>
            <CardBox class="left-40 three" style="top: 300px; left: 446px;">
                <ThirdChart />
            </CardBox>
            <CardBox class="left-40 four" style="top: 508px;">
                <FourthChart />
            </CardBox>
            <CardBox class="left-40 five" style="top: 508px; left: 446px;">
                <FifthChart />
            </CardBox>
            <CardBox class="left-40 six" style="top: 718px;">
                <SixthChart />
            </CardBox>

            <!-- 中间 -->
            <!-- <CardBox class="center map" style="top: 92px">
                <Map />
            </CardBox> -->

            <div class="center map" style="top: 92px">
                <Map />
            </div>

            <!-- 右侧 -->
            <CardBox class="right-40 seven" style="top: 80px">
                <SeventhChart />
            </CardBox>
            <CardBox class="right-40 eight" style="top: 296px">
                <EighthChart />
            </CardBox>
            <CardBox class="right-40 nine" style="top: 460px">
                <NinthChart />
            </CardBox>
            <CardBox class="right-40 ten" style="top: 460px; right:318px;">
                <TenthChart />
            </CardBox>
            <CardBox class="right-40 eleven" style="top: 646px">
                <EleventhChart />
            </CardBox>
            <CardBox class="right-40 twelve" style="top: 646px; right: 318px;">
                <TwelfthChart />
            </CardBox>
            <CardBox class="right-40 thirteen" style="top: 646px; right: 622px;">
                <ThirteenthChart />
            </CardBox>
            <CardBox class="right-40 fourteen" style="top: 830px">
                <ForthteenChart />
            </CardBox>
        </main>
        <ChatBot />
    </div>
</template>

<script setup lang='ts'>
import BigTitle from "@/componentsFigure/BigTitle.vue";
import CardBox from "@/componentsFigure/CardBox.vue";

// 左侧
import FirstChart from "./components/Chart/FirstChart/FirstChart.vue"; //左侧第一个模块
import SecontChart from "./components/Chart/SecontChart/SecontChart.vue"; //左侧第二个模块
import ThirdChart from "./components/Chart/ThirdChart/ThirdChart.vue"; //左侧第三个模块
import FourthChart from "./components/Chart/FourthChart/FourthChart.vue"; //左侧第四个模块
import FifthChart from "./components/Chart/FifthChart/FifthChart.vue"; //左侧第五个模块
import SixthChart from "./components/Chart/SixthChart/SixthChart.vue"; //左侧第六个模块

// 中间
import Map from './components/Chart/Map/Map.vue'; //地图

// 右侧
import SeventhChart from "./components/Chart/SeventhChart/SeventhChart.vue"; //左侧第七个模块
import EighthChart from "./components/Chart/EighthChart/EighthChart.vue"; //左侧第八个模块
import NinthChart from "./components/Chart/NinthChart/NinthChart.vue"; //左侧第九个模块
import TenthChart from "./components/Chart/TenthChart/TenthChart.vue"; //左侧第十个模块
import EleventhChart from "./components/Chart/EleventhChart/EleventhChart.vue"; //左侧第十一个模块
import TwelfthChart from "./components/Chart/TwelfthChart/TwelfthChart.vue"; //左侧第十二个模块
import ThirteenthChart from "./components/Chart/ThirteenthChart/ThirteenthChart.vue"; //左侧第十三个模块
import ForthteenChart from "./components/Chart/ForthteenChart/ForthteenChart.vue"; //左侧第十四个模块
import ChatBot from "@/components/ChatBot/ChatBot.vue";
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

    // &::after {
    //     content: "";
    //     position: fixed;
    //     left: 0;
    //     top: 0;
    //     background: #D4D4D4;
    //     width: 100%;
    //     bottom: 0;
    //     z-index: -1;
    //     transform: scale(1.5);
    // }

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