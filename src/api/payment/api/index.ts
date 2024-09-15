import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import {
  OrderPageVO,
  ChannelsPageVO,
  SettlementPageVO,
  CommissionPageVO,
} from "../types";


/**
 * 代收枚举接口
 */
enum PaymentEnum {
  Order = "/api/admin/payments",
  Channels = "/api/admin/channels",
  Settlement = "/api/admin/settlements",
  Commission = "/api/admin/commissions",
}

class PaymentAPI {
  /**
   * 代收订单分页数据
   */
  static getOrderPage(data: object): AxiosPromise<ResponseData<OrderPageVO[]>> {
    return ZXRequest.get<any>(PaymentEnum.Order, data);
  }

  /**
   * 代收通道
   */

  // 分页数据
  static getChannelsPage(
    data: object
  ): AxiosPromise<ResponseData<ChannelsPageVO[]>> {
    return ZXRequest.get<any>(PaymentEnum.Channels, data);
  }

  /**
   * 创建数据
   */
  static postChannels(data: object): AxiosPromise {
    return ZXRequest.post<any>(PaymentEnum.Channels, data);
  }

  /**
   * 更新数据
   */
  static updateChannels(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(PaymentEnum.Channels + "/" + id, data);
  }

  /**
   * 删除数据
   */
  static deleteChannels(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(PaymentEnum.Channels + "/" + id);
  }

  /**
   * 结算分页数据
   */
  // 分页数据
  static getSettlementPage(
    data: object
  ): AxiosPromise<ResponseData<SettlementPageVO[]>> {
    return ZXRequest.get<any>(PaymentEnum.Settlement, data);
  }

  //  结算 - 通过申请
   static ApproveSettlement(id:number): AxiosPromise {
    return ZXRequest.post<any>(PaymentEnum.Settlement+'/'+id+'/approve');
  }
  

  /**
   * 佣金
   */
  // 分页数据
  static getCommissionPage(
    data: object
  ): AxiosPromise<ResponseData<CommissionPageVO[]>> {
    return ZXRequest.get<any>(PaymentEnum.Commission, data);
  }

  //  佣金 - 结算申请
  static ApproveCommission(id:number): AxiosPromise {
    return ZXRequest.post<any>(PaymentEnum.Commission+'/'+id+'/settlement');
  }
}
export default PaymentAPI;
