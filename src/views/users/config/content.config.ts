import UsersAPI from "@/api/users";
import { IContentConfig } from "@/components/page-content";

export const contentTableConfig: IContentConfig = {
  title: "",
  pk: "id",
  indexAction: function (queryParams: any) {
    // console.log('queryParams==>', queryParams)
    return UsersAPI.getUsersPage(queryParams);
  },
  deleteAction: function (ids) {
    return UsersAPI.deleteUserPage(ids);
  },
  propList: [
    { prop: "id", label: "id" },
    { prop: "username", label: "用户名" },
    { prop: "bank", label: "银行" },
    { prop: "acct", label: "转账账号" },
    { prop: "uid", label: "登录账号" },
    {
      prop: "status", label: "状态", activeValue: true,
      inactiveValue: false,
      align: "center",
      activeText: "ON",
      inactiveText: "OFF",
      slotName: "switch",
    },
    { label: "tr2", align: "center", minWidth: "150", slotName: "handler", fixed: "right" },
  ],
  pagination: false,
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    headerCellStyle: { background: "#f5f7fa", color: "#5D5D5D" },
  },
};
