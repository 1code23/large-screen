import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8082',
    timeout: 10000,
});

export function get(url, params) {
    return instance.get(url, { params });
}
export function post(url, data) {
    return instance.post(url, data);
}

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等信息
        // if (store.getters.token) {
        //   config.headers['X-Token'] = getToken();
        // }
        return config;
    },
    error => {
        // 请求错误处理
        console.log(error); // for debug
        Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        const { status, statusText } = response;
        if (status === 200) {
            return response;
        } else {
            // 处理错误情况，例如弹出提示信息
            console.error(statusText);
            return Promise.reject(new Error(statusText));
        }
    },
    (error) => {
        console.error("请求失败:", error);
        return Promise.reject(error);
    }
);

export default instance;