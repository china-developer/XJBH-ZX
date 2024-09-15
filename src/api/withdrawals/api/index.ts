import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { WithdrawalsPageVO } from "../types";

/**
 * 枚举接口
 */
enum WithdrawalsEnum {
  WithdrawalsPage = "/api/admin/withdrawals",
}

class WithdrawalsAPI {
  /**
   * 分页数据
   */
  static getPage(data:object): AxiosPromise<ResponseData<WithdrawalsPageVO[]>> {
    return ZXRequest.get<any>(WithdrawalsEnum.WithdrawalsPage,data);
  }

  /**
   * 创建数据
   */
  static postPage(data:object): AxiosPromise {
    return ZXRequest.post<any>(WithdrawalsEnum.WithdrawalsPage,data);
  }

  /**
   * 更新数据
   */
  static updatePage(data:object,id:number): AxiosPromise {
    return ZXRequest.put<any>(WithdrawalsEnum.WithdrawalsPage+'/'+id,data);
  }

  /**
   * 删除数据
   */
  static deletePage(id:string & number): AxiosPromise {
    return ZXRequest.delete<any>(WithdrawalsEnum.WithdrawalsPage+'/'+id);
  }

  /**
   * 通过申请
   */
  static approvePage(id:number): AxiosPromise {
    return ZXRequest.post<any>(WithdrawalsEnum.WithdrawalsPage+'/'+id+'/approve');
  }

  /**
   * 驳回申请
   */
  static denyPage(id:number): AxiosPromise {
    return ZXRequest.post<any>(WithdrawalsEnum.WithdrawalsPage+'/'+id+'/deny');
  }
}
export default WithdrawalsAPI;
