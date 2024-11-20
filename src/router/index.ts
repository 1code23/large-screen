/*
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2023-04-26 10:11:26
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-02-26 17:25:10
 * @FilePath: /business-center/src/router/index.ts
 * @Description: 路由
 */
import { createRouter, createWebHashHistory } from "vue-router";
import CenterView from "../views/center/CenterView.vue";
import FigureView from "../views/figure/index.vue";
import getPageTitle from "@/utils/get-page-title";
import SupplyView from "../views/supply/index.vue";

console.log(import.meta.env.VITE_BASE_URL)
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/business",
    },
    {
      path: "/center",
      name: "center",
      component: CenterView,
      meta: {
        title: "陕果产业数据中台分析",
      },
    },
    {
      path: "/figure",
      name: "figure",
      component: FigureView,
      meta: {
        title: "陕果产业数字运营分析",
      },
    },
    {
      path: "/supply",
      name: "supply",
      component: SupplyView,
      meta: {
        title: "陕果产业溯源和供应链",
      },
    },
  ],
});

// 全局路由守卫
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to: any, from: any, next: (arg0: string | undefined) => void) => {
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  next(undefined);
});

export default router;
