import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { LoginResult, LoginData } from "../types";

enum AuthEnum {
  Login = "/api/cert/login",
  // Login = "/user/login",

  Csrf = "/sanctum/csrf-cookie",
  Logout = "/logout",
  DelTokens = "/api/admin/auth/tokens",

  RefTokens = "/api/cert/token/refresh",
  // RefTokens = "/user/refresh",

  // 测试
  UserInfo = "/user/info?id=1",

  // 双重验证
  twoFactorOn = "/user/two-factor-authentication",
  twoFactorQr = "/user/two-factor-qr-code",
  twoFactorVerify = "/user/confirm-password",
  twoFactorStatus = "/user/confirmed-password-status",
  twoFactorKey = "/user/two-factor-secret-key",
  twoFactorOk = "/user/confirmed-two-factor-authentication",
  twoFactorGetCode = "/user/two-factor-recovery-codes",
  twoFactorRecoverCode = "/user/two-factor-recovery-codes",
  twoFactorGoogleCode = "/two-factor-challenge",
}

class AuthAPI {
  // 登录
  static login(data: LoginData): AxiosPromise<LoginResult> {
    return request({
      url: AuthEnum.Login,
      method: "post",
      data: data,
    });
  }


  // 刷新token
  // static refTokens(refreshToken: string): AxiosPromise {
  //   return request({
  //     url: AuthEnum.RefTokens,
  //     method: "get",
  //     headers: {
  //       "Authorization": `Bearer ${refreshToken}`
  //     },
  //   });
  // }


}
export default AuthAPI;
