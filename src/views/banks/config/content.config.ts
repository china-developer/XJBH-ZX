import BanksAPI from "@/api/bank";
import { IContentConfig } from "@/components/page-content";

export const contentTableConfig: IContentConfig = {
  title: "",
  pk: "id",
  indexAction: function (queryParams: any) {
    return BanksAPI.getBanksPage(queryParams);
  },
  deleteAction: function (ids) {
    return BanksAPI.deleteBanksPage(ids);
  },
  propList: [
    { prop: "id", label: "id" },
    { prop: "code", label: "tr13" },
    { prop: "name", label: "tr12" },
    { label: "tr2", align: "center", minWidth: "150", slotName: "handler", fixed: "right" },
  ],
  pagination: false,
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    headerCellStyle: { background: "#f5f7fa", color: "#5D5D5D" },
  },
};
