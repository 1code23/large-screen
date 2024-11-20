<!--左侧 第一个chart模块-->
<script setup>
    import inventoryBase from "@/assets/imgsSupply/InventoryBase.png";
    import stockLight from "@/assets/imgsSupply/StockLight.png";

    import { ref } from 'vue';
    import { useRequest } from "@/hooks/useRequest/index";
    import { getSeventhchart } from "@/server/api/businessThree";
    const items = ref([]);

    const { run, data, err } = useRequest(getSeventhchart, {
    manual: true,
    onSuccess: (res) => {
            if(res?.data?.data?.length > 0){
                // 创建一个空数组来存储新的组合
                let originalArray = res?.data?.data || [];
                let resultArray = [];
                // 遍历原数组，每次取两个元素
                for (let i = 0; i < originalArray.length; i += 2) {
                    // 如果是最后一个元素，并且数组长度为奇数，则只添加这一个元素
                    if (i + 1 < originalArray.length) {
                        resultArray.push([originalArray[i], originalArray[i + 1]]);
                    } else {
                        resultArray.push([originalArray[i]]);
                    }
                }
                items.value = resultArray || [];
            }
        },
    });
    run({});
</script>

<template>
    <div class="seventh-chart-module">
        <div class="block">
            <el-carousel :autoplay="true" height="186px" :indicator-position="'none'" :arrow="'never'">
                <el-carousel-item v-for="(item,index) in items" :key="index">
                    <div class="module-item" v-for="(itemVal,indexVal) in item" :key="indexVal" >
                        <div class="count">{{itemVal?.count}}</div>
                        <img class="stockLight" :src="stockLight" alt="">
                        <img class="inventoryBase" :src="inventoryBase" alt="">
                        <div class="title">{{itemVal?.title}}</div>
                    </div>
                </el-carousel-item>
            </el-carousel>
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

    .seventh-chart-module {
        width: 100%;
        height: 100%;

        .el-carousel__item{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .module-item{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 50%;
                height: 100%;
                position: relative;
                top: 0;
            }

            .count{
                color: #219653;
                font-size: 36px;
                font-style: normal;
                font-weight: 400;
                position: absolute;
                top: 35px;
            }

            .stockLight{
                display: inline-block;
                width: 200px;
                height: 100px;
                position: absolute;
                top: 22px;
                animation: lightFadeIn 1s ease-in-out infinite;
            }

            .inventoryBase{
                display: inline-block;
                width: 190px;
                height: 160px;
                position: absolute;
                top: 4px;
            }
            .title{
                color: #0c6e46;
                font-size: 14px;
                font-style: normal;
                font-weight: 900;
                position: absolute;
                top: 165px;
            }
        }
    }
</style>
