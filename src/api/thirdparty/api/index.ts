import { ZXRequest } from "@/utils/request/index";
import { AxiosPromise } from "axios";
import { PaysetPageVO, ProductPageVO } from "../types";

/**
 * 枚举接口
 */
enum ThirdpartyEnum {
  Providers = "/api/admin/payment-providers",
  PayConfig = "/v1/thirdparty/Paydom",
  Product = "/api/admin/payment-products",
}

// 第三方API接口类
class ThirdpartyAPI {
  /**
   * 支付供应商
   */
  // 获取分页数据
  static getProvidersPage(
    data: object
  ): AxiosPromise<ResponseData<PaysetPageVO[]>> {
    return ZXRequest.get<any>(ThirdpartyEnum.Providers, data);
  }

  // 创建数据
  static postProviders(data: object): AxiosPromise {
    return ZXRequest.post<any>(ThirdpartyEnum.Providers, data);
  }

  // 更新数据
  static updateProviders(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(ThirdpartyEnum.Providers + "/" + id, data);
  }

  // 删除数据
  static deleteProviders(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(ThirdpartyEnum.Providers + "/" + id);
  }



  /**
   * 支付配置
   */
  // 分页数据
  static getPayConfigPage(data: object): AxiosPromise {
    return ZXRequest.get<any>(ThirdpartyEnum.PayConfig,data);
  }



  /**
   * 支付产品
   */

  // 获取分页数据
  static getProductPage(
    data: object
  ): AxiosPromise<ResponseData<ProductPageVO[]>> {
    return ZXRequest.get<any>(ThirdpartyEnum.Product, data);
  }

  // 创建数据
  static postProductPage(data: object): AxiosPromise {
    return ZXRequest.post<any>(ThirdpartyEnum.Product, data);
  }

  // 更新数据
  static updateProductPage(data: object, id: number): AxiosPromise {
    return ZXRequest.put<any>(ThirdpartyEnum.Product + "/" + id, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // 删除数据
  static deleteProductPage(id: string & number): AxiosPromise {
    return ZXRequest.delete<any>(ThirdpartyEnum.Product + "/" + id);
  }
}
export default ThirdpartyAPI;
