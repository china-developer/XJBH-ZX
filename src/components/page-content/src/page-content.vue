<template>
  <div class="page-content">
    <hy-table :listData="pageData" v-bind="contentConfig" v-model:page="paginationval" :showPagination="showPagination"
      :loading="loading">
      <template #headerHandler>
        <div class="w-full" :class="[
          !contentConfig.title ? 'flex-x-between flex' : 'flex justify-end',
        ]">
          <div>
            <el-button v-if="isCreate" type="primary" :disabled="loading" @click="handleNewData" :icon="Plus">
              {{ tt(contentConfig.newBtnTitle!) ?? tt("add") }}
            </el-button>
            <!-- <el-button type="danger" @click="handleDelete()">
                  <i-ep-delete />
                  删除
                </el-button> -->
          </div>
          <div v-if="isOut">
            <el-button class="ml-3" :disabled="loading" :loading="downLoading" @click="handleOpenExportsModal">
              <template #icon><i-ep-download /></template>
              {{ tt("export") }}
            </el-button>
          </div>
        </div>
      </template>
      <!-- Text 文本 -->
      <template #text="{ row, col }">
        <div class="bg-slate-50 border-rounded px-2 py-1 text-slate">
          <el-text>
            {{ getText(row, col) }}
          </el-text>
        </div>
      </template>

      <!-- 生成货币组件 -->
      <template #list="{ row, col }">
        {{ col.selectList[row[col.prop]] }}
      </template>

      <!-- 生成Tag标签组件 -->
      <template #tag="{ row, col }">
        <!-- 有selectList -->
        <template v-if="!!col.selectList">
          <el-tag :type="(col.selectList ?? {})[row[col.prop]]?.type ?? 'info'">
            {{ tt((col.selectList ?? {})[row[col.prop]]?.text) ?? "unknow" }}
          </el-tag>
        </template>
        <template v-else>
          <!-- 无selectList,且是数组 -->
          <template v-if="Array.isArray(row[col.prop]) && row[col.prop].length > 0">
            <template v-if="row[col.prop][0] !== ''">
              <el-tag v-for="(item, index) in row[col.prop]" :key="index" type="primary" class="mx-1 my-1">
                {{ item }}
              </el-tag>
            </template>
            <template v-else> {{}} </template>
          </template>
          <!-- 无selectList,且是单个字符串 -->
          <template v-else-if="typeof row[col.prop] === 'string'">
            <el-tag :type="col.type ?? 'primary'">
              {{ row[col.prop] }}
            </el-tag>
          </template>
          <template v-else> </template>
        </template>
      </template>

      <!-- 生成Tag-route标签组件 -->
      <template #tag-route="{ row, col }">
        <div class="flex flex-col items-start">
          <div v-for="(item, index) in row[col.prop]" :key="index" class="my-1">
            <el-tag v-for="(tag, indexx) in item.method" :key="index + 'oo'" type="primary" class="mr-1">
              {{ tag }}
            </el-tag>
            <el-tag type="info">{{ item.path }}</el-tag>
          </div>
        </div>
      </template>

      <!-- 生成显示图片组件 -->
      <template #image="{ row, col }">
        <template v-if="col.prop">
          <template v-if="Array.isArray(row[col.prop])">
            <template v-for="(item, index) in row[col.prop]" :key="item">
              <el-image :src="item" :preview-src-list="row[col.prop]" :initial-index="index" :preview-teleported="true"
                :style="`width: ${col.imageWidth ?? 40}px; height: ${col.imageHeight ?? 40
                  }px`" />
            </template>
          </template>
          <template v-else>
            <el-image :src="row[col.prop]" :preview-src-list="[row[col.prop]]" :preview-teleported="true" :style="`width: ${col.imageWidth ?? 40}px; height: ${col.imageHeight ?? 40
              }px`" />
          </template>
        </template>
      </template>

      <!-- 生成开关组件 -->
      <template #switch="{ row, col }">
        <!-- pageData.length>0: 解决el-switch组件会在表格初始化的时候触发一次change事件 -->
        <el-switch v-model="row[col.prop]" :active-value="col.activeValue ?? 1" disabled
          :inactive-value="col.inactiveValue ?? 0" :inline-prompt="true" :active-text="col.activeText ?? ''"
          :inactive-text="col.inactiveText ?? ''" :validate-event="false" @change="
            pageData.length > 0 && handleModify(col.prop, row[col.prop], row)
            " />
      </template>

      <!-- 格式化时间 -->
      <template #date="{ row, col }">
        <template v-if="col.prop">
          {{
            row[col.prop]
              ? useDateFormat(
                row[col.prop],
                col.dateFormat ?? "YYYY-MM-DD HH:mm:ss"
              ).value
              : ""
          }}
        </template>
      </template>

      <!-- 生成操作组件 -->
      <template #handler="scope">
        <template v-for="item in scope.col.operat ?? ['edit', 'delete']" :key="item">
          <template v-if="typeof item === 'string'">
            <!-- 编辑/删除 -->
            <template v-if="item === 'edit' || item === 'delete'">
              <el-button :type="item === 'edit' ? 'primary' : 'danger'" :icon="item" size="small" link @click="
                handleOperat({
                  name: item,
                  row: scope.row,
                  column: scope.col,
                })
                ">
                {{ item === "edit" ? tt("edit") : tt("delete") }}
              </el-button>
            </template>
          </template>
          <!-- 其他 -->
          <template v-else-if="typeof item === 'object'">
            <el-button v-if="item.render === undefined || item.render(scope.row)" :icon="item.icon"
              :type="item.type ?? 'primary'" size="small" link @click="
                handleOperat({
                  name: item.name,
                  row: scope.row,
                  column: scope.col,
                })
                ">
              {{ tt(item.text) }}
            </el-button>
          </template>
        </template>
      </template>

      <!-- 生成其他组件 -->
      <!-- <template
        v-for="item in otherPropSlots"
        :key="item?.prop"
        #[item?.slotName!]="scope"
      >
        <template v-if="item?.slotName">
          <slot :name="item?.slotName" :row="scope.row"></slot>
        </template>
      </template> -->
    </hy-table>
    <!-- 导出弹窗 -->
    <el-dialog v-model="exportsModalVisible" :align-center="true" width="600px" style="padding-right: 0"
      @close="handleCloseExportsModal">
      <template #header>
        <div class="my-header">
          <span>{{ tt('text8') }}</span>
        </div>
      </template>
      <!-- 滚动 -->
      <el-scrollbar max-height="60vh">
        <!-- 表单 -->
        <el-form ref="exportsFormRef" label-width="auto" class="mx-8 box-border" :model="exportsFormData"
          :rules="exportsFormRules">
          <el-form-item :label="tt('text3')" class="mt-4" prop="filename">
            <el-input v-model="exportsFormData.filename" clearable />
          </el-form-item>
          <el-form-item :label="tt('text4')" class="mt-4" prop="sheetname">
            <el-input v-model="exportsFormData.sheetname" clearable />
          </el-form-item>
          <el-form-item :label="tt('text5')" class="mt-4" prop="origin">
            <el-select v-model="exportsFormData.origin">
              <el-option :label="tt('text6')" :value="ExportsOriginEnum.CURRENT" />
              <el-option :label="tt('text7')" :value="ExportsOriginEnum.REMOTE"
                :disabled="contentConfig.exportsAction === undefined" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <!-- 弹窗底部操作按钮 -->
      <template #footer>
        <div style="padding-right: var(--el-dialog-padding-primary)" class="mt-6">
          <el-button type="primary" @click="handleExportsSubmit">
            {{ tt("confirm") }}
          </el-button>
          <el-button @click="handleCloseExportsModal">{{
            tt("cancel")
          }}</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import ExcelJS from "exceljs";
import HyTable from "@/base-ui/table";
import { Fn, useDateFormat, useThrottleFn } from "@vueuse/core";
import { Plus, Delete, Edit } from "@element-plus/icons-vue";
import { type FormInstance } from "element-plus";
import { tt } from "@/utils/i18n";
const { t } = useI18n();

import type {
  IObject,
  IContentConfig,
  IOperatData,
} from "@/components/page-content/types";

const props = defineProps({
  contentConfig: {
    type: Object as () => IContentConfig,
    required: true,
  },
  isExport: {
    type: Boolean,
    default: false,
  },
  isOut: {
    type: Boolean,
    default: false,
  },
  isCreate: {
    type: Boolean,
    default: true,
  },
  parameterVal: {
    type: Object as () => IObject,
    default: () => { },
  },
});

const emit = defineEmits([
  "newBtnClick",
  "editBtnClick",
  "exportBtnClick",
  "operatClick",
]);

// 下载加载状态
const downLoading = ref(false);

// 主键
const pk = props.contentConfig.pk ?? "id";

// 注入请求
const setLoading = inject<(value: boolean) => void>("setLoading");

// 表格文字处理
const getText = (row: any, col: any) => {
  if (
    row[col.prop] === undefined ||
    row[col.prop] === null ||
    row[col.prop] === 0
  ) {
    return "";
  } else {
    return row[col.prop];
  }
};

// 表格列
const cols = ref(
  props.contentConfig.propList.map((col) => {
    col.initFn && col.initFn(col);
    if (col.show === undefined) {
      col.show = true;
    }
    if (
      col.prop !== undefined &&
      col.columnKey === undefined &&
      col["column-key"] === undefined
    ) {
      col.columnKey = col.prop;
    }
    if (
      col.type === "selection" &&
      col.reserveSelection === undefined &&
      col["reserve-selection"] === undefined
    ) {
      // 配合表格row-key实现跨页多选
      col.reserveSelection = true;
    }
    return col;
  })
);

/**
 * 【操作列】
 * 操作事件函数
 */

// 操作列

function handleOperat(data: IOperatData) {
  switch (data.name) {
    // 编辑
    case "edit":
      emit("editBtnClick", data.row);
      break;
    // 删除
    case "delete":
      handleDeleteClick(data.row[pk] as string & number);
      break;
    // 其他
    default:
      emit("operatClick", data);
      break;
  }
}

// 刷新
function handleRefresh(isRestart = false) {
  fetchPageData(lastFormData, isRestart);
}

// 删除操作
const handleDeleteClick = (id: string & number) => {
  ElMessageBox.confirm(tt("text1"), tt("tip1"), {
    confirmButtonText: tt("confirm"),
    cancelButtonText: tt("cancel"),
    type: "warning",
  }).then(function () {
    if (props.contentConfig.deleteAction) {
      loading.value = true;
      setLoading && setLoading!(true);
      props.contentConfig
        .deleteAction(id)
        .then(() => {
          ElMessage.success(tt("text2"));
          handleRefresh(true);
        })
        .finally(() => {
          setLoading && setLoading!(false);
        });
    } else {
      ElMessage.error(t('el.message3'));
    }
  });
};

// 新建数据
const handleNewData = () => {
  emit("newBtnClick");
};

// 属性修改
function handleModify(
  field: string,
  value: boolean | string | number,
  row: Record<string, any>
) {
  if (props.contentConfig.modifyAction) {
    props.contentConfig.modifyAction({
      [pk]: row[pk],
      field: field,
      value: value,
    });
  } else {
    // ElMessage.error(t('el.message4'));
  }
}

// 剩余需要的插槽  ---- 暂时【废弃】
const otherPropSlots = computed(() => {
  return props.contentConfig.propList.filter((item: any) => {
    if (item.slotName === "tag") return false;
    else if (item.slotName === "switch") return false;
    else if (item.slotName === "date") return false;
    else if (item.slotName === "handler") return false;
    return true;
  });
});

// 加载状态
const loading = ref(false);
// 列表数据
const pageData = ref<IObject[]>([]);
// 显示分页
const showPagination = props.contentConfig.pagination !== false;
// 分页配置
const defalutPagination = {
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  per_page: 15, // 限制每页15条数据
  pageSizes: [10, 15, 30], // 限制每页的数据
  total: 0,
  page: 1, // 当前页
};

const paginationval = ref(
  typeof props.contentConfig.pagination === "object"
    ? { ...defalutPagination, ...props.contentConfig.pagination }
    : defalutPagination
);

console.log(paginationval);

// 分页相关的请求参数
const request = props.contentConfig.request ?? {
  pageName: "page",
  limitName: "per_page",
};

// 监听到分页改变，执行获取数据 -> 【暂时保留该方法，性能有影响】
watch(
  () => paginationval.value,
  () => fetchPageData(lastFormData) //使用上一次搜索条件的参数传递进去
);

// 获取分页数据
let lastFormData = {};
function fetchPageData(formData: IObject = {}, isRestart = false) {
  loading.value = true;
  setLoading && setLoading!(true);
  // 上一次搜索条件
  lastFormData = formData;
  // 重置页码
  if (isRestart) {
    paginationval.value.page = 1;
  }
  props.contentConfig.indexAction!(
    showPagination
      ? {
        // [request.pageName]: paginationval.value.page, // 当前页
        // [request.limitName]: paginationval.value.per_page, // 限制每页10条数据
        ...formData, // 查询信息
      }
      : formData // 查询信息
  )
    .then((res: any) => {
      // 如果有分页，则显示条数
      if (showPagination) {
        // paginationval.value.total = res.meta.total ?? res.data.length;
        pageData.value = res.data;
      } else {
        pageData.value = res.data;
      }
    })
    .finally(() => {
      loading.value = false;
      setLoading && setLoading!(false);
    });
}

// 初始化执行一次
fetchPageData({ ...props.parameterVal });

/**
 * 导出表单
 */
const ExportsOriginEnum = {
  CURRENT: "current",
  REMOTE: "remote",
};
// 表格列
const exportsModalVisible = ref(false);
const exportsFormRef = ref<FormInstance>();
const exportsFormData = reactive({
  filename: "",
  sheetname: "",
  origin: ExportsOriginEnum.CURRENT,
});

interface exportsObj {
  required: boolean;
  message: string;
}
type FormRules = Record<string, exportsObj[]>;
const exportsFormRules: FormRules = {
  origin: [{ required: true, message: tt('message1') }],
};

// 打开导出弹窗
const handleOpenExportsModal = () => {
  exportsModalVisible.value = true;
};
// 导出确认
const handleExportsSubmit = useThrottleFn(() => {
  exportsFormRef.value?.validate((valid: any) => {
    if (valid) {
      handleExports();
      handleCloseExportsModal();
    }
  });
}, 3000);

// 导出
function handleExports() {
  const filename = exportsFormData.filename;
  const sheetname = exportsFormData.sheetname
    ? exportsFormData.sheetname
    : "sheet";
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetname);
  const columns: Partial<ExcelJS.Column>[] = [];
  cols.value.forEach((col) => {
    if (col.label && col.prop) {
      columns.push({ header: col.label, key: col.prop });
    }
  });
  worksheet.columns = columns;
  // 导出查询当前日期所有数据
  if (exportsFormData.origin === ExportsOriginEnum.REMOTE) {
    // 直接请求后端接口获取数据
    if (props.contentConfig.exportsAction) {
      downLoading.value = true;
      props.contentConfig
        .exportsAction(lastFormData)
        .then((res) => {
          worksheet.addRows(res);
          workbook.xlsx
            .writeBuffer()
            .then((buffer) => {
              saveXlsx(buffer, filename);
            })
            .catch((error) => console.log(error));
        })
        .finally(() => {
          downLoading.value = false;
        });
    } else {
      ElMessage.error(t('el.message5'));
    }
  } else {
    // 格式化数据
    // let formatData = formatJson(columnsConfig, dataList.value);

    // 导出当前页得数据
    worksheet.addRows(pageData.value);
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        saveXlsx(buffer, filename);
      })
      .catch((error) => console.log(error));
  }
}

// 该方法负责将数组转化成二维数组
// const formatJson = (headers, rows) => {
//   console.log(rows);
//   // 首先遍历数组
//   return rows.map((item) => {
//     return headers.map((key) => {
//       // 时间特殊处理
//       if (key.prop === "created_at") {
//         return utcTolocaltime(item[key.prop]);
//       }
//       if (key.prop === "currency") {
//         return item[key.prop].code;
//       }
//       // 状态特殊处理
//       if (key.prop === "status") {
//         const roles = item[key.prop];
//         return roles == 1 ? "启用" : "禁用";
//         // return JSON.stringify(roles.map(role => role.title))
//       }
//       return item[key.prop];
//     });
//   });
// };

// 浏览器保存文件
function saveXlsx(fileData: any, fileName: any) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8";

  const blob = new Blob([fileData], { type: fileType });
  const downloadUrl = window.URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = downloadUrl;
  downloadLink.download = fileName;

  document.body.appendChild(downloadLink);
  downloadLink.click();

  document.body.removeChild(downloadLink);
  window.URL.revokeObjectURL(downloadUrl);
}

// 关闭导出弹窗
function handleCloseExportsModal() {
  exportsModalVisible.value = false;
  exportsFormRef.value?.resetFields();
  nextTick(() => {
    exportsFormRef.value?.clearValidate();
  });
}

// 暴露的属性和方法
defineExpose({ fetchPageData, handleExports, handleRefresh });
</script>

<style lang="scss" scoped>
.my-header {
  height: 40px;
  border-bottom: 1px solid #e4e7ed;
  font-size: 16px;
  font-weight: bold;
  color: #606060;

  & span {
    display: flex;
    align-items: center;
  }

  & span::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 20px;
    background-color: #409eff;
    margin-right: 10px;
  }
}
</style>
