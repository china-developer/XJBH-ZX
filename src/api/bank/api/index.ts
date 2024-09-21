import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { BanksPageVO, WithdrawPageVO } from "../types";

/**
 * 银行枚举接口
 */
enum BanksEnum {
  ListPage = "/api/bank/list",

  // 测试
  // ListPage = "/user/info?id=1",

  OpationsPage = "/api/bank/dropDown",
  SavePage = "/api/bank/save",
  DelPage = "/api/bank/delete"
}

class BanksAPI {
  /**
   * 银行分页数据
   */
  static getBanksPage(): AxiosPromise<PageResult<BanksPageVO[]>> {
    return request({
      url: BanksEnum.ListPage,
      method: "get",
    });
  }

  /**
   * 银行下拉数据
   */
  static getBanksOptions(): AxiosPromise<any> {
    return request({
      url: BanksEnum.OpationsPage,
      method: "get",
    });
  }


  /**
   * 更新银行数据
   */
  static updateBanksPage(data: object): AxiosPromise<PageResult<BanksPageVO[]>> {
    return request({
      url: BanksEnum.SavePage,
      data: data,
      method: "post",
    });
  }

  /**
   * 删除银行数据
   */
  static deleteBanksPage(id: string & number): AxiosPromise<PageResult<BanksPageVO[]>> {
    return request({
      url: BanksEnum.DelPage + '/' + id,
      method: "get",
    });
  }


}
export default BanksAPI;
