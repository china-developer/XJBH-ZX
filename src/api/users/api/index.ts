import request from "@/utils/request";
import { AxiosPromise } from "axios";

/**
 * 银行枚举接口
 */
enum UsersEnum {
  ListPage = "/api/acct/list",
  SavePage = "/api/acct/save",
  DelPage = "/api/acct/delete"
}

class UsersAPI {
  /**
   * 账号管理分页数据
   */
  static getUsersPage(data: object): AxiosPromise<PageResult<any[]>> {
    return request({
      url: UsersEnum.ListPage,
      data: data,
      method: "post",
    });
  }

  /**
   * 账号管理修改
   */
  static updateUsers(data: object): AxiosPromise<PageResult<any[]>> {
    return request({
      url: UsersEnum.SavePage,
      data: data,
      method: "post",
    });
  }

  /**
   * 账号删除
   */
  static deleteUserPage(id: string): AxiosPromise<PageResult<any[]>> {
    return request({
      url: UsersEnum.DelPage + '/' + id,
      method: "get",
    });
  }
}
export default UsersAPI;
