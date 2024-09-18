import router, { resetRouter } from "@/router";
import { TOKEN_KEY, REF_TOKEN_KEY } from "@/enums/CacheEnum";
import { store } from "@/stores";
import AuthAPI, { LoginData } from "@/api/auth";
import UserAPI from "@/api/user";
import { setTimeStamp } from '@/utils/auth'
const route = useRoute();

export const useUserStore = defineStore("user", () => {
  const user = ref({
    name: "",
    two_factor: null,
    email: "",
    ip: "",
    roles: [],
    perms: [],
  });

  /**
   * 登录
   *
   * @param {LoginData}
   * @returns
   */
  const login = (loginData: LoginData) => {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((res) => {
          console.log(res);
          // 保存登录时间
          setTimeStamp()
          localStorage.setItem(TOKEN_KEY, res.data.access_token!);
          localStorage.setItem(REF_TOKEN_KEY, res.data.refresh_token!);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // 获取信息(用户昵称、头像、角色集合、权限集合)
  function getUserInfo() {
    return new Promise((resolve, reject) => {
      const data = {
        // userId: 2,
        // username: "admin",
        // nickname: "系统管理员",
        avatar:
          "https://cms-bucket.nosdn.127.net/catchpic/0/08/086eb06f64315aa6a984a7cc35adee33.gif",
        roles: ["ADMIN"],
        perms: [
          "sys:menu:delete",
          "sys:dept:edit",
          "sys:dict_type:add",
          "sys:dict:edit",
          "sys:dict:delete",
          "sys:dict_type:edit",
          "sys:menu:add",
          "sys:user:add",
          "sys:role:edit",
          "sys:dept:delete",
          "sys:user:password_reset",
          "sys:user:edit",
          "sys:user:delete",
          "sys:dept:add",
          "sys:role:delete",
          "sys:dict_type:delete",
          "sys:menu:edit",
          "sys:dict:add",
          "sys:role:add",
        ],
      };
      Object.assign(user.value, { ...data });

      resolve(user.value);
    });
  }

  // user logout
  function logout() {
    return new Promise<void>((resolve, reject) => {
      // 退出登录  注销Token 清除Token
      location.reload(); // 清空路由
      resetToken()
      resetRouter(); // 重置路由
      resolve();
      // AuthAPI.delTokens()
      //   .then(() => {
      //     location.reload(); // 清空路由
      //     resetToken()
      //     resetRouter(); // 重置路由
      //     resolve();
      //   })
      //   .catch((error) => {
      //     reject(error);
      //   })
      //   .finally(() => { });
    });
  }

  // remove token
  function resetToken() {
    return new Promise<void>((resolve) => {
      // 清除本地Token
      localStorage.setItem(TOKEN_KEY, "");
      resolve();
    });
  }

  return {
    user,
    login,
    getUserInfo,
    logout,
    resetToken,
  };
});

// 非setup
export function useUserStoreHook() {
  return useUserStore(store);
}
