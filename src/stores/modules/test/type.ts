export interface MenuTestVO {
  [key:string]: Admin[];
}

export interface Admin {
  path: string;
  component: string;
  name?: string;
  redirect: string;
  meta: Meta;
  children: Child[];
}

export interface Child {
  component: string;
  name: string;
  path: string;
  meta: Meta;
}

export interface Meta {
  alwaysShow: boolean;
  hidden: boolean;
  keepAlive: boolean;
  icon: string;
  roles: string[];
  title?: string;
}


