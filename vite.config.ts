/*
 * @Author: 陈秀丽 chenxl@paraview.cn
 * @Date: 2023-04-26 10:04:16
 * @LastEditors: 陈秀丽 chenxl@paraview.cn
 * @LastEditTime: 2024-03-07 16:40:38
 * @FilePath: /business-center/vite.config.ts
 * @Description: 这是默认设置
 */
import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { viteMockServe } from "vite-plugin-mock";
import { createHtmlPlugin } from "vite-plugin-html";

//@ts-ignore
import settings from "./src/settings";

// https://vitejs.dev/config/
export default ({ mode }: any) =>
  defineConfig({
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "./src/server/mock/",
      }),
      createHtmlPlugin({
        minify: true,
        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: {
            title: settings.title,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    optimizeDeps: {
      // 开发时 解决这些commonjs包转成esm包
      include: [
        "@jiaminghi/c-render",
        "@jiaminghi/c-render/lib/plugin/util",
        "@jiaminghi/charts/lib/util/index",
        "@jiaminghi/charts/lib/util",
        "@jiaminghi/charts/lib/extend/index",
        "@jiaminghi/charts",
        "@jiaminghi/color",
      ],
    },
    build: {
      outDir: loadEnv(mode, process.cwd()).VITE_OUTDIR,
      target: ["chrome89", "edge89", "firefox89", "safari15"]
    },
  });
