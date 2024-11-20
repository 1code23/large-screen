import axios from "axios";
import code from "@/server/code/index";

import { ref } from "vue";
import type { AppAxiosResponse, RequestResponse } from "./types";
import type { AxiosRequestConfig, Canceler } from "axios";

const instance = axios.create({
  timeout: 30 * 1000,
  // baseURL: "/api",
});

instance.interceptors.request.use(undefined, (err) => {
  console.log("request-error", err);
});

instance.interceptors.response.use(
  (res: AppAxiosResponse) => {
    if (res.status !== 200) {
      return Promise.reject(res.data);
    }
    return res;
  },
  (err) => {
    if (axios.isCancel(err)) {
      return Promise.reject({
        code: 10000,
        msg: "Cancel",
        data: null,
      });
    }
    if (err.code === "ECONNABORTED") {
      return Promise.reject({
        code: 10001,
        msg: "超时",
        data: null,
      });
    }
    console.log("response-error", err.toJSON());
    return Promise.reject(err);
  }
);

export function request<T>(config: AxiosRequestConfig): RequestResponse<T> {
  const cancel = ref<Canceler>();
  return {
    instance: instance({
      ...config,
      cancelToken: new axios.CancelToken((c) => {
        cancel.value = c;
      }),
    }),
    cancel,
  };
}
export default instance;
