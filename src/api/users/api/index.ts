import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { BanksPageVO, WithdrawPageVO } from "../types";

/**
 * 银行枚举接口
 */
enum UsersEnum {
  ListPage = "/api/acct/list",
}

class UsersAPI {
  /**
   * 银行管理分页数据
   */
  static getUsersPage(data: object): AxiosPromise<PageResult<any[]>> {
    return ZXRequest.post<any>(UsersEnum.ListPage, data);
  }

}
export default UsersAPI;
