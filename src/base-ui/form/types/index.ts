

export interface ISelectOption {
  label?: string;
  value?: any;
  code?: string;
  id?: any;
  name?: any;
}

export type IObject = Record<string, any>;

type ItemType =
  | "input"
  | "password"
  | "select"
  | "text"
  | "datepicker"
  | "treeSelect"
  | "textarea"
  | "switch"
  | "number"
  | "checkbox"
  | "arguments"
  | "upload"
  | "transfer"
  | "radio"
  | "radio-button"

// 模板
type slotNameType =
  | "image"
  | "list"
  | "url"
  | "switch"
  | "input"
  | "price"
  | "percent"
  | "icon"
  | "date"
  | "tool"
  | "custom"
  | "tag"
  | "tag-route"
  | "handler";

export interface IFormItem<T = any> {
  prop: string;
  type: ItemType;
  label?: string;
  placeHolder?: string;
  isLinkage?: boolean;
  rules?: any[];
  slotName?: slotNameType;
  // 可选项(适用于select组件)
  options?: ISelectOption[];
  otherOption?: {};
  // 初始值
  defaultValue?: any;
  isHidden?: boolean;
  // label提示内容
  tipContent?: string;
  colLayout?: any;
  // 偏移值
  offset?: number;
  // 组件属性(input-tag组件支持join,btnText,size属性)
  attrs?: IObject;
  multiple?: boolean;
  data?: any[];
  buttons?: any[]; // 当选项为radio-button时,使用buttons属性
  // 初始化数据函数扩展
  initFn?: (formItem: IObject) => void;
  // 自定义渲染函数
  renderFn?: (formItem: IObject) => void;
  // 监听函数
  watch?: (newValue: any, oldValue: any, data: T, items: IObject[]) => void;
}

export interface IForm<T = any> {
  title?: string;
  formItems?: IFormItem[];
  labelWidth?: string;
  itemStyle: any;
  colLayout: any;
  // 提交的网络请求函数(需返回promise)
  formAction?: (data: T, isEidt: boolean) => Promise<any> | void;
}
