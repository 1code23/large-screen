/*
 * @LastAuthor: lhj
 */
import { request } from "../request/index";
const NODE_ENV = `${import.meta.env.VITE_NODE_ENV}`;

// 左侧的第一个图
export function getFirstchart(params: any) {
    return request({
        url: "/api/v1/businessThree/firstChart.json",
        method: "get",
        params,
    });
}

// 左侧的第二个图
export function getSecontchart(params: any) {
    return request({
        url: "/api/v1/businessThree/secontchart.json",
        method: "get",
        params,
    });
}

// 左侧的第三个图
export function getThirdchart(params: any) {
    return request({
        url: "/api/v1/businessThree/thirdchart.json",
        method: "get",
        params,
    });
}

// 左侧的第四个图
export function getFourthchart(params: any) {
    return request({
        url: "/api/v1/businessThree/fourthchart.json",
        method: "get",
        params,
    });
}

// 左侧的第五个图
export function getFifthchart(params: any) {
    return request({
        url: "/api/v1/businessThree/fifthchart.json",
        method: "get",
        params,
    });
}


// 左侧的第六个图
export function getSixthchart(params: any) {
    return request({
        url: "/api/v1/businessThree/sixthData.json",
        method: "get",
        params,
    });
}

// 右侧的  第7个图（饼图）
export function getSeventhchart(params: any) {
    return request({
        url: "/api/v1/businessThree/seventhchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第8个图（饼图）
export function getEightpiechart(data: any) {
    return request({
        url: `/api/v1/businessThree/eightpiechart.json`,
        method: "get",
        data,
    });
}


// 右侧的  第9个图
export function getNinthTableData(params: any) {
    return request({
        url: "/api/v1/businessThree/ninethchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第10个图
export function getTenthchart(params: any) {
    return request({
        url: "/api/v1/businessThree/tenthchart.json",
        method: "get",
        params,
    });
}

// 右侧的  第11个图
export function getEleventhchart(params: any) {
    return request({
        url: "/api/v1/businessThree/eleventhchart.json",
        method: "get",
        params,
    });
}


// 地图-陕西地图
export function mapShanxi(params: any) {
        return request({
        url: `/api/v1/businessThree/shanxi.json`,
        method: "get",
        params,
        });
    }
    
// 地图-中国
export function mapQuanguo(params: any) {
    return request({
    url: `/api/v1/businessThree/china.json`,
    method: "get",
    params,
    });
}