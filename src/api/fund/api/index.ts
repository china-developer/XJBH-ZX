import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { DetailsPageVO , AdjustmentPageVO, DailyPageVO } from "../types";

/**
 * 资金枚举接口
 */
enum FundEnum {
  // 资金明细
  Details = "/api/admin/transactions",
  // 资金调整
  Adjustment = "/api/admin/balance-adjustments",
  // 每日统计
  DailyStatistics = "/api/admin/dailies",
}

class FundAPI {
  /**
   * 资金明细分页数据
   */
  static getDetailsPage(data: object): AxiosPromise<ResponseData<DetailsPageVO[]>>{
    return ZXRequest.get<any>(FundEnum.Details, data);
  }


  /**
   * 资金调整分页数据
   */
  static getAdjustmentPage(data: object): AxiosPromise<ResponseData<AdjustmentPageVO[]>>{
    return ZXRequest.get<any>(FundEnum.Adjustment, data);
  }


  /**
   * 每日统计分页数据
   */
  static getDailyPage(data: object): AxiosPromise<ResponseData<DailyPageVO[]>> {
    return ZXRequest.get<any>(FundEnum.DailyStatistics, data);
  }

}
export default FundAPI;
