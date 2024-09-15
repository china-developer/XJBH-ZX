import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { BanksPageVO, WithdrawPageVO } from "../types";

/**
 * 银行枚举接口
 */
enum BanksEnum {
  ListPage = "/api/bank/list",
  SavePage = "/api/bank/save",
  DelPage = "/api/bank/delete"
}

class BanksAPI {
  /**
   * 银行分页数据
   */
  static getBanksPage(data?: object): AxiosPromise<PageResult<BanksPageVO[]>> {
    return ZXRequest.get<any>(BanksEnum.ListPage);
  }

  /**
   * 创建银行数据
   */
  // static postBanksPage(data:object): AxiosPromise<PageResult<BanksPageVO[]>> {
  //   return ZXRequest.post<any>(BanksEnum.BanksPage,data);
  // }

  /**
   * 更新银行数据
   */
  static updateBanksPage(data: object): AxiosPromise<PageResult<BanksPageVO[]>> {
    return ZXRequest.post<any>(BanksEnum.SavePage, data);
  }

  /**
   * 删除银行数据
   */
  static deleteBanksPage(id: string & number): AxiosPromise<PageResult<BanksPageVO[]>> {
    return ZXRequest.get<any>(BanksEnum.DelPage + '/' + id);
  }


}
export default BanksAPI;
