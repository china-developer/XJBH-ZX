import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { TOKEN_KEY, REF_TOKEN_KEY } from "@/enums/CacheEnum";
import router from "@/router";
import { jwtDecode } from "jwt-decode"

// 创建 axios 实例
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 50000,
    headers: { "Content-Type": "application/json;charset=utf-8" },
});

// 刷新token后的任务队列
let refreshTokenArray: ((t: string) => any)[] = [];

let isRefreshing = false;

// 刷新token
const refreshToken = async (refreshToken: string) => {
    if (!refreshToken) {
        return Promise.reject("refresh_token is empty");
    }
    try {
        // 这里会等到并发的请求都执行完之后再执行
        const res = await request.get(`/api/cert/token/refresh`, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        return res.data;
    } catch (error) {
        localStorage.setItem(TOKEN_KEY, "");
        localStorage.setItem(REF_TOKEN_KEY, "");
        router.push('/login');
        return Promise.reject(error);
    }

};

// 请求拦截器
request.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            if (config.url?.includes('refresh') || config.url?.includes('login')) {
                return config;
            }

            // 解析 token
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // 如果 token 已过期
            if (decodedToken.exp < currentTime) {
                console.log('失效了===>', decodedToken.exp);
                // Token 已过期，使用 refreshToken 获取新的 token
                const refresh_token = localStorage.getItem(REF_TOKEN_KEY) as string;

                if (!isRefreshing) {
                    //刷新token锁为true
                    isRefreshing = true;
                    try {
                        const data = await refreshToken(refresh_token);
                        localStorage.setItem(TOKEN_KEY, data.access_token);
                        localStorage.setItem(REF_TOKEN_KEY, data.refresh_token);
                        // 执行获取token后的任务队列
                        refreshTokenArray.forEach((cb) => cb(data.access_token as string));
                        // // 清空任务队列
                        refreshTokenArray = [];
                    } catch (err) {
                        return Promise.reject(err);
                    } finally {
                        //刷新token锁为false
                        isRefreshing = false;
                    }
                }
                // 如果当前正在请求
                return new Promise((resolve) => {
                    // 将当前请求添加到队列中
                    refreshTokenArray.push((newToken: string) => {
                        // 将新的 token 添加到请求头
                        config.headers.Authorization = `Bearer ${newToken}`;
                        resolve(config);
                    });
                });
            } else {
                // token 未过期，直接使用
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



interface PendingTask {
    config: AxiosRequestConfig;
    resolve: Function;
}
// 是否还需要刷新token的标识
let refreshing = false;
// 存储未完成的请求
const task: PendingTask[] = [];

// 响应拦截器
request.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;

        if (response.status >= 400 && response.status < 600) {
            const { message } = response.data;
            ElMessage.error(message);
        }

        // 响应数据为二进制流处理(Excel导出)
        if (response instanceof ArrayBuffer) {
            return response;
        }

        // console.log('响应头')
        // console.log(response.headers)

        // // 判断响应头中是否存在 X-Xsrf-Token 字段
        // if (response.headers.hasOwnProperty("X-Xsrf-Token")) {
        //   const xsrfToken = response.headers["X-Xsrf-Token"];
        //   // 在这里进行处理，比如存储到某个变量中
        //   console.log("X-Xsrf-Token:", xsrfToken);
        // }

        return data;

        // return Promise.reject(new Error(message || "Error"));
    },
    (error: any) => {
        if (error.response) {
            // token 过期,重新登录
            if (error.response.status === 401) {
                ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
                    confirmButtonText: "确定",
                    type: "warning",
                }).then(() => {
                    router.push("/login");
                });
            } else {
                console.log(error.message);
                ElMessage.error(error.response.data.message || "系统出错");
            }
        }
        return Promise.reject(error.message);
    }
);

export default request;
