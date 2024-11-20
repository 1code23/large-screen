<script setup>
import { ref, computed, watch } from 'vue'
import { CountTo } from "vue3-count-to";

import IconEarth from '../../icons/IconEarth.vue'
import China from './components/China.vue'
import World from './components/World1.vue'
import ShanXi from './components/Anhui.vue'
import { fullScreenClick } from '../../common.js'
import indicateImg from '../../../../../assets/imgsFigure/indicate.png'

const tabs = ref([
// {
//     name: 'world',
//     title: '世界地图',
// }, 
{
    name: 'china',
    title: '中国',
},
{
    name: 'shanxi',
    title: '陕西',
}])
const activeTab = ref('china')
const tabClick = (name) => {
    switch (name) {
        case 'shanxi':
            tabs.value = [
            // {
            //     name: 'world',
            //     title: '世界地图',
            // }, 
            {
                name: 'china',
                title: '中国',
            },{
                name: 'shanxi',
                title: '陕西',
            }, 
            ]
            break;
        case 'world':
            tabs.value = [
            {
                name: 'china',
                title: '中国',
            }, 
            // {
            //     name: 'world',
            //     title: '世界地图',
            // }, 
            {
                name: 'shanxi',
                title: '陕西',
            }]
            break;
        case 'china':
            tabs.value = [{
                name: 'china',
                title: '中国',
            },{
                name: 'shanxi',
                title: '陕西',
            }, 
            // {
            //     name: 'world',
            //     title: '世界地图',
            // }
            ]
            break;

        default:
            break;
    }
    activeTab.value = name
}

</script>

<template>
    <div class="map"  @dblclick="fullScreenClick($event)" id="Map">
        <div class="map-top">
            <!-- <China /> -->
            <World v-if="activeTab == 'world'" />
            <China v-else-if="activeTab == 'china'" />
            <ShanXi v-else-if="activeTab == 'shanxi'" />
        </div>

        <div class="map-bottom">
            <div class="tab-item" v-for="i in tabs" :key="i.name" :class="{active:i.name==activeTab}"
                @click="tabClick(i.name)">
                {{i.title}}
                <div v-if="i.name==activeTab" class="active-icon">
                    <IconEarth />
                    <img :src="indicateImg" alt="">
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="less" scoped>
.map {
    // position: absolute;
    // bottom: 130px;
    // left: 0;
    // right: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    &-top {
        position: absolute;
        left: 0;
        right: 0;
        top:20px;
        height: calc(100%);
        width: 100%;
    }

    &-bottom {
        padding-top: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        .tab-item {
            width: 90px;
            // height: 44px;
            color: #6FCF97;
            font-size: 20px;
            font-weight: 400;
            font-family: "PangMenZhengDao";
            text-align: center;
            cursor: pointer;

            // &:nth-child(n+2) {
            //     margin-left: 208px;
            // }

            &.active {
                // position: relative;
                // height: 64px;
                // padding-bottom: 10px;
                // margin-bottom: -10px;
                // opacity: 1;
                color: #305605;
                font-size: 32px;
                font-weight: 400;
                font-family: "PangMenZhengDao";
                // text-align: center;
                // line-height: 64px;
                // background: url(../../../../../assets/imgsFigure/map_title_active.png) no-repeat;

                .active-icon {
                    // position: absolute;
                    // left: 0;
                    // right: 0;
                    display: block;
                    width: 32px;
                    height: 32px;
                    margin: 0 auto;
                    color: #305605;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    img{
                        width: 16px;
                        height: 16px;
                    }
                }
            }

        }
    }
}
</style>
