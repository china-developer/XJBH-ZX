import type {
    PaginationProps,
    TableProps,
  } from "element-plus";


export type IObject = Record<string | number, any>;

export interface IOperatData {
  name: string;
  row: IObject;
  column: IObject;
}

export interface IContentConfig<T = any> {
    // 页面名称
    title?: string;
    // 新建按钮名称
    newBtnTitle?:string; 
    // table组件属性
    tableConfig?: Omit<TableProps<any>, "data">;
    // pagination组件属性
    pagination?:
      | boolean
      | Partial<
          Omit<
            PaginationProps,
            "v-model:page-size" | "v-model:current-page" | "total" | "currentPage"
          >
        >;
    // 列表的请求
    indexAction?: (queryParams?: T) => Promise<any>;
    // 默认的分页相关的请求参数
    request?: {
      pageName: string;
      limitName: string;
    };
    // 数据格式解析的回调函数
    parseData?: (res: any) => {
      total: number;
      list: IObject[];
      [key: string]: any;
    };
    // 修改属性请求
    modifyAction?: (data: {
      [key: string]: any;
      field: string;
      value: boolean | string | number;
    }) => Promise<any>;
    // 删除的请求
    deleteAction?: (ids: string & number) => Promise<any>;
    // 后端导出的
    exportAction?: (queryParams: T) => Promise<any>;
    // 前端全量导出
    exportsAction?: (queryParams: T) => Promise<IObject[]>;
    // 主键名(默认为id)
    pk?: string;
    // table组件列属性(额外的属性templet,operat,slotName)
    propList: Array<{
      type?: "default" | "selection" | "index" | "expand" | "primary" | "success" | "info" | "warning" | "danger";
      label?: string;
      prop?: string;
      width?: string | number;
      align?: "left" | "center" | "right";
      columnKey?: string;
      reserveSelection?: boolean;
      // 列是否显示
      show?: boolean;
      // 模板
      slotName?:
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
        | "header"
        | "tag"
        | "tag-route"
        | "handler"
        | "text"
      // image模板相关参数
      imageWidth?: number;
      imageHeight?: number;
      // list模板相关参数
      selectList?: IObject;
      // switch模板相关参数
      activeValue?: boolean | string | number;
      inactiveValue?: boolean | string | number;
      activeText?: string;
      showOverflowTooltip?: boolean;
      inactiveText?: string;
      // input模板相关参数
      inputType?: string;
      // price模板相关参数
      priceFormat?: string;
      // date模板相关参数
      dateFormat?: string;
      // 【前提slotName为header】在定义为表格头部时，可以自定义头部tooltip内容
      headerTipAttrs?: {
        tipAttrs:IObject,
        iconAttrs:IObject
      };
      // tool模板相关参数
      operat?: Array<
        | "edit"
        | "delete"
        | {
            auth?: string;
            icon?: string;
            name: string;
            text: string;
            type?: "primary" | "success" | "warning" | "danger" | "info";
            render?: (row: IObject) => boolean;
          }
      >;
      // filter值拼接符
      filterJoin?: string;
      [key: string]: any;
      // 初始化数据函数
      initFn?: (item: IObject) => void;
    }>;
    showSelectColumn?: boolean;
    showIndexColumn?: boolean;
    showActionColumn?: boolean;
    childrenProps?: {
        rowKey?:string,
        showOverflowTooltip?:boolean,
        headerCellStyle?:any,
    }
  }


  