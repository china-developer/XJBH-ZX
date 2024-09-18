import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ErrMessage } from "./status";
import { TOKEN_KEY, REF_TOKEN_KEY } from "@/enums/CacheEnum";
import router from "@/router";
import AuthAPI from '@/api/auth';
import { jwtDecode } from "jwt-decode";

// 自定义请求返回数据的类型
interface Data<T> {
  data: T;
  code: string;
  success: boolean;
}

// 扩展 InternalAxiosRequestConfig，让每个请求都可以控制是否要loading
interface RequestInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean;
}

// 拦截器
interface InterceptorHooks {
  requestInterceptor?: (
    config: RequestInternalAxiosRequestConfig
  ) => RequestInternalAxiosRequestConfig | Promise<never>;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

// 扩展 AxiosRequestConfig，showLoading 给实例默认增加loading，interceptorHooks 拦截
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean;
  interceptorHooks?: InterceptorHooks;
}

class Request {
  config: RequestConfig;
  instance: AxiosInstance;
  loading?: boolean; // 用loading指代加载动画状态

  constructor(options: RequestConfig) {
    this.config = options;
    this.instance = axios.create(options);
    this.setupInterceptor();
  }

  // 类型参数的作用，T决定AxiosResponse实例中data的类型
  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, Data<T>>(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // 封装常用方法
  get<T = any>(url: string, params?: object, _object = {}): Promise<T> {
    return this.request({ url, params, ..._object, method: "GET" });
  }

  post<T = any>(url: string, data?: object, _object = {}): Promise<T> {
    return this.request({ url, data, ..._object, method: "POST" });
  }

  delete<T = any>(url: string, data?: object, _object = {}): Promise<T> {
    return this.request({ url, data, ..._object, method: "DELETE" });
  }

  patch<T = any>(url: string, data?: object, _object = {}): Promise<T> {
    return this.request({ url, data, ..._object, method: "PATCH" });
  }

  put<T = any>(url: string, data?: object, _object = {}): Promise<T> {
    return this.request({ url, data, ..._object, method: "PUT" });
  }

  // 自定义拦截器
  setupInterceptor(): void {
    let isRefreshing = false;
    let refreshSubscribers: ((token: string) => void)[] = [];

    const onRrefreshed = (token: string) => {
      refreshSubscribers.map((cb) => cb(token));
    };

    const addRefreshSubscriber = (cb: (token: string) => void) => {
      refreshSubscribers.push(cb);
    };

    /**
    * 通用拦截
    */
    this.instance.interceptors.request.use(
      async (config: RequestInternalAxiosRequestConfig) => {
        if (config.showLoading) {
          // 加载loading动画
          this.loading = true;
        }
        let token = localStorage.getItem(TOKEN_KEY);
        if (token) {
          const decodedToken: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            console.log('失效了===>', decodedToken.exp)
            // Token 已过期，使用 refreshToken 获取新的 token
            const refreshToken = localStorage.getItem(REF_TOKEN_KEY);
            if (!isRefreshing) {
              isRefreshing = true;
              config.headers.Authorization = `Bearer ${refreshToken}`;
              try {
                const { data } = await AuthAPI.refTokens();
                token = data.access_token;
                const newRefToken = data.refresh_token;
                localStorage.setItem(TOKEN_KEY, token!);
                localStorage.setItem(REF_TOKEN_KEY, newRefToken);
                isRefreshing = false;
                onRrefreshed(token!);
              } catch (err) {
                localStorage.setItem(TOKEN_KEY, "");
                router.push(`/login`);
                return Promise.reject(err);
              }
            }
          } else {
            config.headers.Authorization = `Bearer ${token}`;
          }

        }
        return config;
      }
    );

    // 响应后关闭loading
    this.instance.interceptors.response.use(
      (res) => {
        if (this.loading) this.loading = false;
        return res;
      },
      async (err) => {
        const { response, message } = err;
        const originalRequest = err.config;
        if (this.loading) this.loading = false;

        // 处理401 登录失败
        if (response?.status === 401) {
          // if (!isRefreshing) {
          //   isRefreshing = true;
          //   try {
          //     const { data } = await AuthAPI.refTokens();
          //     const newToken = data.access_token;
          //     const newRefToken = data.refresh_token;
          //     localStorage.setItem(TOKEN_KEY, newToken);
          //     localStorage.setItem(REF_TOKEN_KEY, newRefToken);
          //     isRefreshing = false;
          //     onRrefreshed(newToken);
          //   } catch (err) {
          //     localStorage.setItem(TOKEN_KEY, "");
          //     router.push(`/login`);
          //     return Promise.reject(err);
          //   }
          // }

          // const retryOriginalRequest = new Promise((resolve) => {
          //   addRefreshSubscriber((token: string) => {
          //     originalRequest.headers.Authorization = `Bearer ${token}`;
          //     resolve(this.instance(originalRequest));
          //   });
          // });
          // return retryOriginalRequest;
        }

        // 处理 422 验证错误
        if (response?.status === 422) {
          ElMessage.error(response.data.message);
        } else {
          // 根据不同状态码，返回不同信息
          const messageStr = response
            ? ErrMessage(response.status)
            : message || '请求失败，请重试';
          ElMessage.error(messageStr);
        }
        return Promise.reject(err);
      }
    );

    /**
    * 使用通用实例里的拦截，两个拦截都会生效，返回值以后一个执行的为准
    */
    // 请求拦截
    this.instance.interceptors.request.use(
      this.config?.interceptorHooks?.requestInterceptor,
      this.config?.interceptorHooks?.requestInterceptorCatch
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      this.config?.interceptorHooks?.responseInterceptor,
      this.config?.interceptorHooks?.responseInterceptorCatch
    );
  }
}

// 导出 axios 实例
export default Request;