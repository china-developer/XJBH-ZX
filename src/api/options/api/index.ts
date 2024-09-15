import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";

/**
 * 枚举接口
 */
enum OptionsEnum {
    Currency = "/api/admin/currencies",
    Purveyor = "/api/admin/payment-products"
}

// 接口参数类型 - 【基类接口】
interface OptionsType {
  name:string,
  code:string,
}

// 币种固定类型
interface CurrencyType extends OptionsType {
  id:string,
  pagination:string
}


// 币种固定参数
const CurrencyData:CurrencyType = {
  id:"",
  name:"",
  code:"",
  pagination:"0"
}

// 供应商固定类型
interface PurveyorType extends OptionsType {
  type:string,
  payment_provider_id:string,
  currency_id:string,
  pagination:number
}

// 供应商固定参数
const PurveyorData: PurveyorType = {
  code:"",
  name:"",
  type:"",
  payment_provider_id:"",
  currency_id:"",
  pagination:0
}


class OptionsAPI {
  /**
   * 币种类型数据
   */
  static getCurrencyOptions(): AxiosPromise {
    return ZXRequest.get<any>(OptionsEnum.Currency,CurrencyData);
  }

  /**
   * 供应商类型数据
   */
  static getPurveyorOptions(): AxiosPromise {
    return ZXRequest.get<any>(OptionsEnum.Purveyor,PurveyorData);
  }
}
export default OptionsAPI;
