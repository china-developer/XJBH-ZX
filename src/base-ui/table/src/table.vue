<template>
  <div class="hy-table">
    <div class="header my-2">
      <slot name="header" class="w-full">
        <div class="title" v-if="title">{{ title }}</div>
        <div class="handler w-full">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :row-key="pk"
      v-loading="loading"
      :data="listData"
      border
      @selection-change="selectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        :label="tt('tr1')"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column
          v-bind="item"
          :label="tt(item.label)"
          :align="item.align ?? 'left'"
          :minWidth="item.minWidth ?? colObj[item.prop].width"
          :show-overflow-tooltip="item.showOverflowTooltip ?? false"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row" :col="item">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
          <template v-if="item.slotName === 'header'" #header>
            <div>
              {{ tt(item.label) }}
              <el-tooltip
                v-bind="item.headerTipAttrs.tipAttrs"
                :content="tt(item.headerTipAttrs.tipAttrs.content)"
              >
                <svg-icon v-bind="item.headerTipAttrs.iconAttrs" />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </template>
      <slot></slot>
    </el-table>
    <div class="footer" v-if="showPagination">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          v-bind="page"
          :page-size="page.per_page"
          :current-page="page.page"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { tt } from "@/utils/i18n";
import type { IObject } from "@/components/page-content/types";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  pk: {
    type: String,
    default: "id",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showIndexColumn: {
    type: Boolean,
    default: true,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  listData: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  propList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  childrenProps: {
    type: Object,
    default: () => ({}),
  },
  page: {
    type: Object,
    default: () => ({
      page: 1,
      per_page: 15,
    }),
  },
});

/**
 * 自动计算列宽
 */
function calColWidth(propList: Array<{}>, listData: IObject[]) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context!.font = "14px Microsoft YaHei";

  let res: Record<string, any> = {};
  propList.forEach((item: any) => {
    //计算propList中每个item的宽度，取最大值
    // 设置表头的文字大小
    let Thsize = 32;
    if (item.label) {
      res[item.prop] = {
        label: tt(item.label),
        width: context!.measureText(tt(item.label)).width + Thsize,
      };
    }
  });
  //遍历表格数据
  // 设置表格内的文字大小
  let Trsize = 28;
  for (let i = 0; i < listData.length; i++) {
    propList.forEach((item: any) => {
      const curContent = listData[i][item.prop] + "";
      const curWidth = context!.measureText(curContent).width + Trsize;
      if (curWidth > res[item.prop].width) {
        res[item.prop].width = curWidth;
      }
      // 针对特殊字段调整
      if (item.prop === "status") {
        res[item.prop].width += 10;
      }
    });
  }
  console.log(res);
  return res;
}

let colObj = computed(() => calColWidth(props.propList, props.listData));

watch(
  () => props.listData,
  () => {
    console.log("colObj====>", colObj.value);
  },
  {
    deep: true,
  }
);

const emit = defineEmits(["selectionChange", "update:page"]);

// 上一页
const selectionChange = (value: any) => {
  console.log(1, value);
  if (props.showSelectColumn) {
    emit("selectionChange", value);
  }
};

// 下一页
const handleCurrentChange = (page: number) => {
  emit("update:page", { ...props.page, page });
};

// 分页数量
const handleSizeChange = (per_page: number) => {
  emit("update:page", { ...props.page, per_page });
};
</script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
    width: 200px;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
