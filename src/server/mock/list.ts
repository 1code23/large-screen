// 仅做示例: 通过GET请求返回一个名字数组
// const Mock = require("mockjs");
import Mock from "mockjs";

export default [
  {
    url: "/api/v1/ztthreedpiechart",
    method: "post",
    response: () => {
      return {
        code: 0,
        msg: "ok",
        data: [
          {
            name: "农林木和渔业产品",
            value: 258,
          }
        ],
      };
    },
  },
];
