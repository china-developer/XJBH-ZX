import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { SettingVO  } from "../types";

/**
 * 充值枚举接口
 */
enum DepositsEnum {
  DepositsPage = "/api/admin/deposits",
  Settings = "/api/admin/settings"
}

class DepositsAPI {

  /**
   * 获取分页数据
   */
  static getDpositsPage(data:object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.get<any>(DepositsEnum.DepositsPage,data);
  }

  /**
   * 新建数据
   */
  static postDpositsPage(data:object): AxiosPromise<PageResult<[]>> {
    return ZXRequest.post<any>(DepositsEnum.DepositsPage,data);
  }

  /**
   * 更新数据
   */
  static updateDpositsPage(data:object,id:number): AxiosPromise<PageResult<[]>> {
    return ZXRequest.put<any>(DepositsEnum.DepositsPage+'/'+id,data);
  }

  /**
   * 删除数据
   */
  static deleteDpositsPage(id:string & number): AxiosPromise<PageResult<[]>> {
    return ZXRequest.delete<any>(DepositsEnum.DepositsPage+'/'+id);
  }

  /**
   * 通过申请
   */
  static approvePage(id:number): AxiosPromise {
    return ZXRequest.post<any>(DepositsEnum.DepositsPage+'/'+id+'/approve');
  }

  /**
   * 驳回申请
   */
  static denyPage(id:number): AxiosPromise {
    return ZXRequest.post<any>(DepositsEnum.DepositsPage+'/'+id+'/deny');
  }


    /**
   * 获取充值设置数据
   */
    static getSettings(): AxiosPromise<SettingVO> {
      return ZXRequest.get<any>(DepositsEnum.Settings);
    }
  
    /**
     * 设置充值设置
     */
    static putSettings(data: object): AxiosPromise{
      return ZXRequest.put<any>(DepositsEnum.Settings,data);
    }
  

}
export default DepositsAPI;
