export interface TopLevel {
  data: CurrencyPageVO[];
  links: Links;
  meta: Meta;
}

export interface CurrencyPageVO {
  id: number;
  name: string;
  code: string;
  symbol: string;
  exchange_rate_for_withdraw: string;
  exchange_rate_for_deposit: string;
  created_at: Date;
  updated_at: Date;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
