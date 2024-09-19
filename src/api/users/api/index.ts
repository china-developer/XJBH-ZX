import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { BanksPageVO, WithdrawPageVO } from "../types";

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
    return ZXRequest.post<any>(UsersEnum.ListPage, data);
  }

  /**
   * 账号管理修改
   */
  static updateUsers(data: object): AxiosPromise<PageResult<any[]>> {
    return ZXRequest.post<any>(UsersEnum.SavePage, data);
  }

  /**
   * 账号删除
   */
  static deleteUserPage(id: string): AxiosPromise<PageResult<any[]>> {
    return ZXRequest.get<any>(UsersEnum.DelPage + '/' + id);
  }
}
export default UsersAPI;
