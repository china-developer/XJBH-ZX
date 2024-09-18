import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { BanksPageVO, WithdrawPageVO } from "../types";

/**
 * 银行枚举接口
 */
enum BankUsersEnum {
  ListPage = "/api/acct/list",
}

class BankUsersAPI {
  /**
   * 银行管理分页数据
   */
  static getUsersPage(data: object): AxiosPromise<PageResult<any[]>> {
    return ZXRequest.post<any>(BankUsersEnum.ListPage, data);
  }

  /**
   * 创建银行数据
   */
  // static postBanksPage(data:object): AxiosPromise<PageResult<BanksPageVO[]>> {
  //   return ZXRequest.post<any>(BanksEnum.BanksPage,data);
  // }

  // /**
  //  * 更新银行数据
  //  */
  // static updateBanksPage(data: object): AxiosPromise<PageResult<BanksPageVO[]>> {
  //   return ZXRequest.post<any>(BanksEnum.SavePage, data);
  // }

  // /**
  //  * 删除银行数据
  //  */
  // static deleteBanksPage(id: string & number): AxiosPromise<PageResult<BanksPageVO[]>> {
  //   return ZXRequest.get<any>(BanksEnum.DelPage + '/' + id);
  // }


}
export default BankUsersAPI;
