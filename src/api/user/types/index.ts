export interface UsersPageVO {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  two_factor_confirmed_at: null;
  available_funds: string;
  locked_funds: string;
  parent_id: number;
  currency_id: number;
  ip: string[];
  status: number;
  created_at: Date;
  updated_at: Date;
}

export interface AccessPageVO {
  id: number;
  user_id: number;
  key: string;
  secret: string;
  ip_addresses: string[];
  status: number;
  last_used_at: Date | null;
  created_at: Date;
  updated_at: Date;
}
