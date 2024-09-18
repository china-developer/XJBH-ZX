import Request from "./request";
import router from "@/router";
import { API_BASE_URL, TIME_OUT } from "./config";
import { TOKEN_KEY } from "@/enums/CacheEnum";
import { useUserStore } from "@/stores";
import { isCheckTimeout } from "@/utils/auth";

const ZXRequest = new Request({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  // withCredentials: true,
  withXSRFToken: true,
  showLoading: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "X-Requested-With": "XMLHttpRequest",
  },
  interceptorHooks: {
    // 请求拦截器
    requestInterceptor: (config) => {
      const userStore = useUserStore();
      // 验证token
      const accessToken = localStorage.getItem(TOKEN_KEY);
      if (accessToken && accessToken != "undefined") {
        if (isCheckTimeout()) {
          // Token过期
          try {
            console.log("Token过期");
            userStore.resetToken();
            return Promise.reject(new Error("token失效,请重新登录"));
          } catch (e) {
            console.log(e);
          }
        }
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    requestInterceptorCatch: (err) => {
      return Promise.reject(err);
    },
    // 响应拦截器 - 【暂时废弃】
    // responseInterceptor: (res) => {
    // },
    // 响应拦截器 - 【暂时废弃】
    // responseInterceptorCatch: (err) => {
    // },
  },
});

export { ZXRequest };
