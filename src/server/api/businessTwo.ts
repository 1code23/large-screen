/*
 * @LastAuthor: lhj
 */
import { request } from "../request/index";
const NODE_ENV = `${import.meta.env.VITE_NODE_ENV}`;

// 左侧的第一个图（折线图）
export function getFirstchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/firstChart.json",
        method: "get",
        params,
    });
}

// 左侧的第二个图（折线图）
export function getSecontZxchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/secontZxchart.json",
        method: "get",
        params,
    });
}

// 左侧的第三个图（饼图）
export function getThirdPiechart(params: any) {
    return request({
        url: "/api/v1/businessTwo/thirdPiechart.json",
        method: "get",
        params,
    });
}

// 左侧的第四个图（漏斗图）
export function getFourthLdchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/fourthLdchart.json",
        method: "get",
        params,
    });
}

// 左侧的第五个图（柱状图）
export function getFifthLdchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/fifthChartZztchart.json",
        method: "get",
        params,
    });
}


// 左侧的第六个图（表格）
export function getSixTableData(params: any) {
    return request({
        url: "/api/v1/businessTwo/sixTableData.json",
        method: "get",
        params,
    });
}

// 右侧的  第8个图（饼图）
export function getEighthChartPiechart(params: any) {
    return request({
        url: "/api/v1/businessTwo/eighthChartPiechart.json",
        method: "get",
        params,
    });
}


// 右侧的  第9个图
export function getNineChartPiechart(params: any) {
    return request({
        url: "/api/v1/businessTwo/ninethchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第10个图（饼图）
export function getTenthPiechart(params: any) {
    return request({
        url: "/api/v1/businessTwo/tenthPiechart.json",
        method: "get",
        params,
    });
}

// 右侧的  第11个图（极坐标图）
export function getEleventhchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/eleventhchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第12个图（柱状图）
export function getTwelfthZztchart(params: any) {
    return request({
        url: "/api/v1/businessTwo/twelfthZztchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第13个图（柱状图）
export function getThirteenthPieChart(params: any) {
    return request({
        url: "/api/v1/businessTwo/thirteenthPieChart.json",
        method: "get",
        params,
    });
}

// 左侧的第十四个图（表格）
export function getForthteenData(params: any) {
    return request({
        url: "/api/v1/businessTwo/forthteenData.json",
        method: "get",
        params,
    });
}

// 地图-陕西地图
export function mapAnhui(params: any) {
        return request({
        url: `/api/v1/businessTwo/anhui.json`,
        method: "get",
        params,
        });
    }
    
// 地图-中国
export function mapChina(params: any) {
    return request({
    url: `/api/v1/businessTwo/china.json`,
    method: "get",
    params,
    });
}