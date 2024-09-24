import BanksAPI from '@/api/bank'
import { IContentConfig } from "@/components/page-content";

interface envOptionsType {
  [key: string]: { url: string; name: string };
}

export const contentTableConfig: IContentConfig = {
  title: "",
  pk: "id",
  indexAction: function () {
    return BanksAPI.getBanksPage();
  },
  deleteAction: function (ids) {
    return BanksAPI.deleteBanksPage(ids);
  },
  propList: [
    { prop: "id", label: "id" },
    { prop: "code", label: "tr13" },
    { prop: "name", label: "tr12" },
    {
      prop: "env", label: "环境",
      selectList: {},
      slotName: "list",
      minWidth: "100px",
      async initFn(colItem) {
        const { data: envOptions } = await BanksAPI.getEnvOptions()
        colItem.selectList = Object.values(envOptions as envOptionsType).reduce((acc: { [key: string]: string }, item: { name: string; url: string }) => {
          acc[item.url] = item.name;
          return acc;
        }, {});
      },
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
