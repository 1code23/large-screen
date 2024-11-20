<!--左侧 第一个chart模块-->
<script setup>
    import appleImg from "@/assets/imgsSupply/appleImg.png";
    import appleLight from "@/assets/imgsSupply/appleLight.png";

    import { ref } from 'vue';
    import { useRequest } from "@/hooks/useRequest/index";
    import { getThirdchart } from "@/server/api/businessThree";
    const items = ref();

    const { run, data, err } = useRequest(getThirdchart, {
    manual: true,
    onSuccess: (res) => {
            items.value = res.data.data.data || {};
        },
    });
    run({});
</script>

<template>
    <div class="third-chart-module">
            <div v-for="item in items" :key="item.title" class="module-item">
                <div class="left">
                    <img class="appleLight" :src="appleLight" alt="">
                    <img class="appleImg" :src="appleImg" alt="">
                </div>

                <div class="right">
                    <span class="title">{{item.title}}</span>
                    <div class="content">
                        <span class="count">{{item?.count}}</span>
                        <span class="unit">{{item.unit}}</span>
                    </div>
                </div>
            </div>
    </div>
</template>


<style lang="less" scoped>
    @keyframes lightFadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    
    .third-chart-module {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        position: relative;

        .module-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .left{
                width: 70px;
                height: 50.82px;
                display: flex;
                justify-content: center;
            }

            .appleImg{
                width: 35px;
                height: 35px;
                position: absolute;
                top: 2px;
            }
            .appleLight{
                width: 70px;
                height: 50.82px;
                position: absolute;
                top: 0px;  
                animation: lightFadeIn 1s ease-in-out infinite;
            }
            .right{
                display: flex;
                flex-direction: column;
                width: 145px;
            }
            .title{
                color: #219653;
                font-size: 12.25px;
                font-style: normal;
                font-weight: 600;
            }
            .content{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: url(../../../../../assets/imgsSupply/appleBase.png) no-repeat;
                width: 145px;
                height: 35.98px;
                padding: 6px 10px;
                box-sizing: border-box;
            }
            .count{
                color: #219653;
                font-size: 20.34px;
                font-style: normal;
                font-weight: 400;
            }
            .unit{
                color: #219653cc;
                font-size: 10.72px;
                font-style: normal;
                font-weight: 600;
                margin-top: 8px;
            }
        }
    }
</style>
