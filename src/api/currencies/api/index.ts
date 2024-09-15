import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { CurrencyPageVO } from "../types";

/**
 * 货币枚举接口
 */
enum CurrenciesEnum {
  CurrencyPage = "/api/admin/currencies",
}

class CurrenciesAPI {

  /**
   * 获取货币分页数据
   */
  static getCurrencyPage(data?: object): AxiosPromise<PageResult<CurrencyPageVO[]>> {
    return ZXRequest.get<any>(CurrenciesEnum.CurrencyPage, data);
  }

  /**
   * 新建货币数据
   */
  static postCurrencyPage(data: object): AxiosPromise<PageResult<CurrencyPageVO[]>> {
    return ZXRequest.post<any>(CurrenciesEnum.CurrencyPage, data);
  }

  /**
   * 更新货币数据
   */
  static updateCurrencyPage(data: object, id: number): AxiosPromise<PageResult<CurrencyPageVO[]>> {
    return ZXRequest.put<any>(CurrenciesEnum.CurrencyPage + '/' + id, data);
  }

  /**
   * 删除货币数据
   */
  static deleteCurrencyPage(id: string & number): AxiosPromise<PageResult<CurrencyPageVO[]>> {
    return ZXRequest.delete<any>(CurrenciesEnum.CurrencyPage + '/' + id);
  }

}
export default CurrenciesAPI;
