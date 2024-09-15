export interface TopLevel {
  data: AdminPageVO[];
  links: Links;
  meta: Meta;
}

export interface AdminPageVO {
  id: number;
  uri: string;
  method: Method;
  ip: string;
  payload: Payload;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}


export type Method = "GET" | "PUT" | "POST" | "DELETE" | "PATCH";

export interface Payload {
  page: string;
  per_page: string;
  start?: Date;
  end?: Date;
  user_id?: null | string;
  currency_id?: null | string;
  day?: null;
}



export interface RolesPageVO {
  id: number;
  name: string;
  title: string;
  description: null;
  guard_name: string;
  permissions: any[];
  created_at: Date;
  updated_at: Date;
}
export interface PermissionsPageVO {
  id: number;
  name: string;
  title: string;
  description: null;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
}