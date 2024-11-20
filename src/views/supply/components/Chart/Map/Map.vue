<script setup>
import { ref, computed, watch } from 'vue'
import { CountTo } from "vue3-count-to";
import directionIcon from "../../../../../assets/imgsSupply/directionIcon.png"

import IconEarth from '../../icons/IconEarth.vue'
import China from './components/China.vue'
import ShanXi from './components/ShanXi.vue'
import { fullScreenClick } from '../../common.js'
import indicateImg from '../../../../../assets/imgsSupply/indicate.png'

const tabs = ref([ 
{
    name: 'china',
    title: '全国',
},
{
    name: 'shanxi',
    title: '陕西',
}])
const activeTab = ref('shanxi')
const tabClick = (name) => {
    switch (name) {
        case 'shanxi':
            tabs.value = [
            {
                name: 'china',
                title: '全国',
            },{
                name: 'shanxi',
                title: '陕西',
            }, 
            ]
            break;
        case 'china':
            tabs.value = [{
                name: 'china',
                title: '全国',
            },{
                name: 'shanxi',
                title: '陕西',
            }, 
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
            <China v-if="activeTab == 'china'" />
            <ShanXi v-else-if="activeTab == 'shanxi'" />
        </div>

        <div class="map-bottom">
            <img class="directionIcon" :src="directionIcon" alt="">
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
    width: 100%;
    height: 100%;
    margin: 0 auto;

    &-top {
        position: absolute;
        left: 0;
        right: 0;
        top:20px;
        height: 100%;
        width: 100%;
    }

    &-bottom {
        padding-top: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        .directionIcon{
            position: absolute;
            left: 0;
            width: 45.03px;
            height: 44.03px;
            display: inline-block;
        }

        .tab-item {
            width: 90px;
            color: #6FCF97;
            font-size: 20px;
            font-weight: 400;
            font-family: "PangMenZhengDao";
            text-align: center;
            cursor: pointer;

            &.active {
                color: #305605;
                font-size: 32px;
                font-weight: 400;
                font-family: "PangMenZhengDao";
                // background: url(../../../../../assets/imgsFigure/map_title_active.png) no-repeat;

                .active-icon {
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
