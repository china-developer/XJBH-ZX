import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { LoginResult, LoginData } from "../types";

enum AuthEnum {
  Login = "/api/cert/login",
  Csrf = "/sanctum/csrf-cookie",
  Logout = "/logout",
  DelTokens = "/api/admin/auth/tokens",
  RefTokens = "/api/cert/token/refresh",

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
    return ZXRequest.post<any>(AuthEnum.Login, data);
  }

  // CORS
  static csrfCookie(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.Csrf);
  }

  // 退出登录
  static logout(): AxiosPromise {
    return ZXRequest.delete<any>(AuthEnum.Logout);
  }

  // 删除token
  static delTokens(): AxiosPromise {
    return ZXRequest.delete<any>(AuthEnum.DelTokens);
  }

  // 刷新token
  static refTokens(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.RefTokens);
  }

  // 双因素认证 获取二维码
  static twoFactorQrcode(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.twoFactorQr);
  }

  // 开启双因素认证
  static twoFactorAuthenticationOn(): AxiosPromise {
    return ZXRequest.post<any>(AuthEnum.twoFactorOn);
  }

  // 关闭双因素认证
  static twoFactorAuthenticationOff(): AxiosPromise {
    return ZXRequest.delete<any>(AuthEnum.twoFactorOn);
  }

  // 验证登录密码
  static confirmPassword(password: string): AxiosPromise {
    return ZXRequest.post<any>(AuthEnum.twoFactorVerify, { data: password });
  }

  // 获取登录密码状态
  static getConfirmedPasswordStatus(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.twoFactorStatus);
  }

  // 获取双因素认证密钥
  static twoFactorSecretKey(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.twoFactorKey);
  }

  // 确认双因素认证开启
  static confirmedTwoFactorAuthentication(code: string): AxiosPromise {
    return ZXRequest.post<any>(AuthEnum.twoFactorOk, { data: code });
  }

  // 获取恢复代码
  static twoFactorRecoveryCodes(): AxiosPromise {
    return ZXRequest.get<any>(AuthEnum.twoFactorGetCode);
  }

  // 重新生成恢复代码
  static twoFactorRecoveryCodesCreate(): AxiosPromise {
    return ZXRequest.post<any>(AuthEnum.twoFactorRecoverCode);
  }

  // 使用 Google Authenticator 验证
  static loginTwoFactorApi(code: string): AxiosPromise {
    return ZXRequest.post<any>(AuthEnum.twoFactorGoogleCode, { data: code });
  }
}
export default AuthAPI;
