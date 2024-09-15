export interface DetailsPageVO {
  id: number;
  amount: string;
  balance: string;
  currency_id: number;
  type: string;
  tradable_type: string;
  tradable_id: number;
  user_id: number;
  note: string | null;
  created_at: Date;
  updated_at: Date;
  type_text: string;
}

export interface AdjustmentPageVO {
  id: number;
  amount: string;
  balance: number;
  currency_id: number;
  currency_code: string;
  user_id: number;
  note: null;
  admin_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface DailyPageVO {
  id: number;
  day: Date;
  traded_amount: string;
  trades_count: number;
  traded_fees: string;
  trades_total_settlement_amount: number;
  trades_total_commission_amount: number;
  trades_total_profit_amount: number;
  transferred_amount: string;
  transfers_count: number;
  transferred_fees: string;
  currency_id: number;
  currency_code: string;
  user_id: number;
  partner_id: number;
}
