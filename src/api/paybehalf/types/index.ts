export interface OrderPageVO {
  id: number;
  type: number;
  transfer_no: string;
  out_transfer_no: string;
  channel_id: number;
  amount: string;
  balance: string;
  currency_id: number;
  payee_account: string;
  payee_name: string;
  notify_url: string;
  custom: null;
  extra: Extra | null;
  fee_rate: string;
  fee: string;
  total_fees: string;
  commission_amount: string;
  total_amount: string;
  provider_id: number | null;
  provider_transfer_no: null | string;
  provider_status: null | string;
  note: null | string;
  user_id: number;
  partner_id: number;
  status: number;
  notify_status: number;
  notify_count: number;
  paid_at: Date | null;
  refunded_at: Date | null;
  notified_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  status_text: string;
}

interface Extra {
  bank_code?: string;
  account_type?: string;
  id_number?: string;
}

export interface ChannelsPageVO {
  id: number;
  key: null | string;
  name: string;
  note: null | string;
  fee_rate: string;
  fee: string;
  min_amount: string;
  max_amount: string;
  currency_id: number;
  submission: number;
  provider_id: number;
  limit_amount: string;
  extra: ExtraElement[] | [] | null;
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface ExtraElement {
  key: string;
  label: string;
  note: string;
}
