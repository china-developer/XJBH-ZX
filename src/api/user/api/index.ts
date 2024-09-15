import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import {
  UsersPageVO,
  AccessPageVO,
} from "../types";

/**
 * 用户枚举接口
 */
enum UserEnum {
  Info = "/api/user",
  UsersPage = "/api/admin/users",
  UserAccessPage = "/api/admin/access-keys",
}

class UserAPI {
  //  获取用户信息
  static getInfo() {
    return ZXRequest.get<any>(UserEnum.Info);
  }

  /**
   * 用户列表
   * @param data
   * @returns
   */
  // 获取用户列表
  static getUserPage(data: object): AxiosPromise<ResponseData<UsersPageVO[]>> {
    return ZXRequest.get<any>(UserEnum.UsersPage, data);
  }

  // 创建用户
  static postUser(data: object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.post<any>(UserEnum.UsersPage, data);
  }

  // 更新用户
  static updateUser(data: object, id: number): AxiosPromise<PageResult<[]>> {
    return ZXRequest.put<any>(UserEnum.UsersPage + "/" + id, data);
  }

  // 删除用户
  static deleteUser(id: string & number): AxiosPromise<ResponseData<[]>> {
    return ZXRequest.delete<any>(UserEnum.UsersPage + "/" + id);
  }

  

  /**
   * Access-key
   * @param data
   * @returns
   */
  // 获取用户-Access-key
  static getUserAccess(
    data: object
  ): AxiosPromise<ResponseData<AccessPageVO[]>> {
    return ZXRequest.get<any>(UserEnum.UserAccessPage, data);
  }

  /**
   * 创建Access-key
   */
  static postAccess(data: object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.post<any>(UserEnum.UserAccessPage, data);
  }

  /**
   * 更新Access-key
   */
  static updateAccess(data: object, id: number): AxiosPromise<PageResult<[]>> {
    return ZXRequest.put<any>(UserEnum.UserAccessPage + "/" + id, data);
  }

  // 删除Access-key
  static deleteAccess(access_key: string): AxiosPromise<ResponseData<[]>> {
    return ZXRequest.delete<any>(UserEnum.UserAccessPage + "/" + access_key);
  }
}
export default UserAPI;
