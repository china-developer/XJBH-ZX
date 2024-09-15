export interface PaysetPageVO {
  id: number;
  name: string;
  code: string;
  created_at: Date;
  updated_at: Date;
}

export interface ProductPageVO {
  id: number;
  name: string;
  code?: null | string;
  type?: string;
  note?: null | string;
  payment_provider_id?: number;
  cost_fee_rate?: string;
  cost_fee?: string;
  min_amount?: string;
  max_amount?: string;
  currency_id?: number;
  currency?: Currency;
  extra?: null | string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}
