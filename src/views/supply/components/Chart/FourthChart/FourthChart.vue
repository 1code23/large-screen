<script setup>
    import orchardist from "@/assets/imgsSupply/orchardist.png";
    import fruiterer from "@/assets/imgsSupply/fruiterer.png";

    import { ref } from 'vue';
    import { useRequest } from "@/hooks/useRequest/index";
    import { getFourthchart } from "@/server/api/businessThree";
    const items = ref();

    const { run, data, err } = useRequest(getFourthchart, {
    manual: true,
    onSuccess: (res) => {
            items.value = res.data.data || [];
        },
    });
    run({});
</script>

<template>
    <div class="four-chart-module">
        <div class="module-item">
            <img class="left" :src="orchardist" alt="">
            <div class="right">
                <div class="count">{{items?.[0]?.count }}<span class="unit">(吨)</span></div>
                <span class="title">{{items?.[0]?.title}}</span>
            </div>
        </div>

        <div class="module-item">
            <img class="left" :src="fruiterer" alt="">
            <div class="right">
                <div class="count">{{items?.[0]?.count }}<span class="unit">(吨)</span></div>
                <span class="title">{{items?.[0]?.title}}</span>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
    .four-chart-module {
        display: flex;
        align-items: center;
        flex-direction: column;
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

            .left{
                width: 75px;
                height: 75px;
            }
            .right{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .title{
                color: #219653;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
            }
            .count{
                color: #219653;
                font-size: 25px;
                font-style: normal;
                font-weight: 700;
            }
            .unit{
                color: #219653;
                font-size: 16px;
                font-style: normal;
                font-weight: 600;
            }
        }
    }
</style>
