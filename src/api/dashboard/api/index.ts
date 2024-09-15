import { ZXRequest } from "@/utils/request/index";
import { DashboardInfo } from "../types";

/**
 * 仪表盘枚举接口
 */
enum DashboardEnum {
  StatistData = '/v1/partner/dashboard/overview',
}

class dashboardAPI {
  /**
   * 获取统计数据概览
   *
   * @param queryParams 查询参数
   */
  static getStatistData() {
    return ZXRequest.get<DashboardInfo>(DashboardEnum.StatistData);
  }
}

export default dashboardAPI;



