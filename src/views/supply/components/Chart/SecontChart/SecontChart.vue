<!--左侧 第二个chart模块-->
<script setup>
    import moneyImg from "@/assets/imgsSupply/moneyImg.png";

    import { ref } from 'vue';
    import { useRequest } from "@/hooks/useRequest/index";
    import { getSecontchart } from "@/server/api/businessThree";
    const items = ref();

    const { run, data, err } = useRequest(getSecontchart, {
    manual: true,
    onSuccess: (res) => {
            items.value = res.data.data.data || {};
        },
    });
    run({});
</script>

<template>
    <div class="secont-chart-module">
            <div class="module-item">
                <img class="left" :src="moneyImg" alt="">
                <div class="right">
                    <span class="title">区域累计库存量(吨)</span>
                    <span class="count">{{items?.count}}</span>
                    <span class="unit">个</span>
                </div>
            </div>
    </div>
</template>


<style lang="less" scoped>
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .secont-chart-module {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100%;
        padding: 15px 18px;
        box-sizing: border-box;
        position: relative;

        .module-item{
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            background: linear-gradient(90deg, #30560500 0%, #30560580 50%, #30560500 100%);

            .left{
                width: 65px;
                height: 65px;
                /* 动画 */
                animation: spin 2s linear infinite;
            }
            .right{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .title{
                color: #ffffff;
                font-size: 14px;
                font-style: normal;
                font-weight: 900;
            }
            .count{
                color: #219653;
                font-size: 36px;
                font-weight: 400;
            }
            .unit{
                color: #ffffff;
                font-size: 14px;
            }
            
        }
    }
</style>
