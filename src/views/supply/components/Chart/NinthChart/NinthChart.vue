<script setup>
import { ref, computed } from "vue";
import { useRequest } from "@/hooks/useRequest/index";
import { getNinthTableData } from "@/server/api/businessThree";

const configData = ref([]);
let option = computed(() => {
    return {
        header: configData.value.header, // 表头数据
        rowNum: 4, // 表行数
        data: configData.value.data, // 表数据
        waitTime: 3000, // 轮播时间间隔(ms)
        hoverPause: true, // 悬停暂停
        columnWidth: [60,100,100,60,100,100,60,60],
        carousel: 'page',
        align: ['left']
    };
});
const { run, data, err } = useRequest(getNinthTableData, {
    manual: true,
    onSuccess: (res) => {
        configData.value = res.data.data;
    },
});
/** 表格行点击事件 */
function onclick() {
    console.log("表格被点击啦");
}
run({});
// 实现每隔1秒，一条数据上移
</script>

<template>
    <div class="ninth-center-table">
        <dv-scroll-board
        :config="option"
        :onclick="onclick"
        style="width: 100%; height: 100%"
        />
    </div>
</template>

<style lang="less">
.ninth-center-table {
    width: 100%;
    height: 100%;
    .dv-scroll-board {
        .header {
        background: none !important;
        color: #305605;
        font-size: 14px;
        padding: 5px;
        &-item {
            height: 28px !important;
            line-height: 28px !important;
        }
        }
        .row {
        &-item {
            background: none !important;
            font-size: 14px;
            font-weight: 600;
            color: #219653;
            position: relative;
            &::before {
            content: "";
            position: absolute;
            top: -1px;
            width: 0;
            height: 0;
            border-width: 4px; /* 设置边长 */
            border-style: solid;
            border-color: transparent #27ae60 transparent transparent; /* 上、右、下、左颜色为红色（#ff0000） */
            transform: rotate(45deg);
            }
            &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 32px;
            background: rgba(48, 86, 5, 0.12);
            border: 1px solid rgba(39, 174, 96, 1);
            border-radius: 2px;
            }
            .ceil {
            line-height: 32px;
            }
        }
        }
    }
}
</style>
