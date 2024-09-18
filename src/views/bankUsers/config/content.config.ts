import BankUsersAPI from "@/api/bankUsers";
import { IContentConfig } from "@/components/page-content";

export const contentTableConfig: IContentConfig = {
  title: "",
  pk: "code",
  indexAction: function (queryParams: any) {
    return BankUsersAPI.getUsersPage(queryParams);
  },
  // deleteAction: function (ids) {
  //   return BankUsersAPI.deleteBanksPage(ids);
  // },
  propList: [
    { prop: "username", label: "用户名" },
    { prop: "bank", label: "银行" },
    { prop: "acct", label: "转账账号" },
    { prop: "uid", label: "登录账号" },
    { prop: "status", label: "状态", slotName: "switch" },
    { label: "tr2", align: "center", minWidth: "150", slotName: "handler", fixed: "right" },
  ],
  pagination: false,
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    headerCellStyle: { background: "#f5f7fa", color: "#5D5D5D" },
  },
};
