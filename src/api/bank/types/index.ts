/**
 * 银行查询对象类型
 */
export interface UserQuery extends PageQuery {
  id?: string;
  currency?: string;
}

/**
 * 银行分页对象
 */
export interface BanksPageVO {
  // id
  id?: string|number;
  // 代码
  code?: string;
  // 名称
  name?: string;
  
  // 币种
  currency?: string;
  // 审核时间
  review_time?: string;
  // 创建时间
  creat_time?: string;
  // 更新时间
  update_time?: string;
  // 备注
  notes?: string;
}


/**
 * 提现分页对象
 */
export interface WithdrawPageVO extends BanksPageVO{
  // 提现金额
  withdrawal_amount: number;
  // 美元汇率
  dollar_rate: number;
  // 美元
  dollar:number;
  // 用户名称 管理员名称
  user_name?:string;
  // 收款地址
  address:string;
// 状态
  status?:string;
  // reviewed at
  reviewed_at?:string;
}

/**
 * 充值记录分页对象
 */
export interface RechargePageVO extends WithdrawPageVO{
  // usd
  usd:string;
  // 入账金额
  receipt_amount:number;
  // 截图
  screenshot:string;
  // 管理员id 
  user_id:string | number;
}

/**
 * 充值设置对象
 */
export interface RechargeSettingsVO {
  currency:string,
  type:string,
  adress:string,
}

/**
 * 银行表单类型
 */
export interface BankForm {
  /**
   * 代码
   */
  code?: string;
  /**
   * 名称
   */
  name?: string;
  /**
   * 货币
   */
  currency?: string;
}
