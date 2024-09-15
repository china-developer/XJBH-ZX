import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { OrderPageVO,ChannelsPageVO } from "../types";

/**
 * 代付枚举接口
 */
enum PaybehalfEnum {
  Order = "/api/admin/transfers",
  Channels = "/api/admin/transfer-channels",
  // 佣金接口暂时废弃
  Commission = "/v1/payment/commission",
}

class PaybehalfAPI {
  /**
   * 代付订单分页数据
   */
  static getOrderPage(data:object): AxiosPromise<ResponseData<OrderPageVO[]>> {
    return ZXRequest.get<any>(PaybehalfEnum.Order,data);
  }

  /**
   * 代付通道
   */
  // 分页数据
  static getChannelsPage(data:object): AxiosPromise<ResponseData<ChannelsPageVO[]>> {
    return ZXRequest.get<any>(PaybehalfEnum.Channels,data);
  }

  /**
   * 创建数据
   */
  static postChannels(data: object): AxiosPromise {
    return ZXRequest.post<any>(PaybehalfEnum.Channels, data);
  }

  /**
   * 更新数据
   */
  static updateChannels(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(PaybehalfEnum.Channels + "/" + id, data);
  }

  /**
   * 删除数据
   */
  static deleteChannels(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(PaybehalfEnum.Channels + "/" + id);
  }

  


  
  /**
   * 暂未对接 - 有待修改
   * 代付佣金分页数据
   */
  static getSettlementPage(): AxiosPromise {
    return ZXRequest.get<any>(PaybehalfEnum.Commission);
  }
}
export default PaybehalfAPI;
