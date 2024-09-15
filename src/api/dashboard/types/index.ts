/**
 * 仪表盘对象类型
 */
export interface DashboardInfo {
  data: Data;
  code: number;
}

interface Data {
  dashboard: DashboardData;
  two_factor: boolean;
}
/**
 * 仪表盘对象有用类型
 */
export interface DashboardData {
  // 收款成交订单总数
  payments_order_count: number;
  // 代付成交订单总数
  behalfpay_order_count: number;
  // 商户总数
  merchant_count: number;
  // 代理商总数
  agent_count: number;
  // 收款总成交金额
  payments_deal_count: number;
  // 收款总利润
  payments_profit_count: number;
  // 代付总利润
  behalfpay_profit_count: number;
  // 代付总成交金额
  behalfpay_deal_count: number;
}
