import { request } from "../request/index";
import service from "../request/index";

// 获取配置信息
const { data } = await service({
  url: `./config.json`,
  method: "get",
});

// api接口基础地址
const api = data.serverUrl || "";

// 中台页面柱状图数据--数据接入量
export function ztbarchart(data: any) {
  return request({
    // url: `${api}/api/v1/ztbarchart.json`,
    url: `/api/v1/ztbarchart.json`,
    method: "get",
    data,
  });
}

// 中台页面3d饼图数据--数据种类占比
export function ztpiechart(data: any) {
  return request({
    // url: `${api}/api/v1/ztpiechart.json`,
    url: `/api/v1/ztpiechart.json`,
    method: "get",
    data,
  });
}

// 中台页面3d饼图数据--数据接入量
export function ztthreedpiechart(data: any) {
  return request({
    // url: `${api}/api/v1/ztthreedpiechart.json`,
    url: `/api/v1/ztthreedpiechart.json`,
    method: "get",
    data,
  });
}

// 中台页面柱状图数据--销售/售后/市场分析
export function ztaftersalesbarchart(data: any) {
  return request({
    // url: `${api}/api/v1/ztaftersalesbarchart.json`,
    url: `/api/v1/ztaftersalesbarchart.json`,
    method: "get",
    data,
  });
}
// 中台页面--中间第一个模块数据
export function getZtMidData(data: any) {
  return request({
    url: "/api/v1/ztmiddata.json",
    method: "get",
    data,
  });
}

// 中台页面--中间表格模块数据ztmidanimation.json
export function getZtTableData(data: any) {
  return request({
    url: "/api/v1/zttabledata.json",
    method: "get",
    data,
  });
}

// 中台页面--中间动画模块数据ZtRightAnimation
export function getZtMidAnimation(data: any) {
  return request({
    url: "/api/v1/ztmidanimation.json",
    method: "get",
    data,
  });
}
// 中台页面--右边动画模块数据
export function getZtRightAnimation(data: any) {
  return request({
    url: "/api/v1/ztrightanimation.json",
    method: "get",
    data,
  });
}