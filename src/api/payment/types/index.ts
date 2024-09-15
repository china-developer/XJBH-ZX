export interface OrderPageVO {
  id: number;
  type: number;
  trade_no: string;
  out_trade_no: string;
  channel_id: number;
  amount: string;
  currency_id: number;
  subject: null;
  notify_url: string;
  redirect_url: null;
  custom: null;
  extra: null;
  fee_rate: string;
  fee: string;
  total_fees: string;
  settlement_amount: string;
  commission_rate: string;
  commission_amount: string;
  provider_id: number;
  provider_trade_no: null | string;
  provider_status: null | string;
  payment_url: string;
  user_id: number;
  partner_id: number;
  status: number;
  notify_status: number;
  notify_count: number;
  paid_at: Date | null;
  notified_at: null;
  settled_at: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface ChannelsPageVO {
  id: number;
  key: string;
  name: string;
  note: null | string;
  fee_rate: string;
  fee: string;
  min_amount: string;
  max_amount: string;
  currency_id: number;
  extra: Extra | null;
  status: number;
  created_at: Date;
  updated_at: Date;
}

interface Extra {
  key: string;
  label: string;
  note: string;
}

export interface CommissionPageVO {
  id: number;
  trade_id: number;
  child_id: number;
  rate: string;
  amount: string;
  currency_id: number;
  user_id: number;
  status: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface SettlementPageVO {
  id: number;
  trade_id: number;
  total_fees: string;
  amount: string;
  currency_id: number;
  user_id: number;
  status: number;
  settled_at: Date;
  created_at: Date;
  updated_at: Date;
  payment_amount: string;
  trade_no: string;
}
