<template>
  <div class="users-container">
    <el-card class="search-container">
      <page-search :searchConfig="searchFormConfig" @queryBtnClick="handleSearchClick"
        @resetBtnClick="handleResetClick" />
    </el-card>
    <el-card shadow="never" class="table-container">
      <page-content ref="contentRef" :parameterVal="searchFormData" :contentConfig="<IContentConfig>contentTableConfig"
        @newBtnClick="handleAddClick" @editBtnClick="handleEditClick" @exportBtnClick="handleExportClick" />
    </el-card>

    <!-- 新建表单弹窗 -->
    <page-modal ref="addModalRef" pageName="users" dialog-width="600px" @submit-click="handleSubmitClick"
      :modalConfig="modelConfigAdd" :defaultInfo="modalInfo" />
    <!-- 编辑表单弹窗 -->
    <page-modal ref="editModalRef" pageName="users" dialog-width="600px" @submit-click="handleSubmitClick"
      :modalConfig="modelConfigEdit" :defaultInfo="modalInfo" />
  </div>
</template>

<script setup lang="ts">
import usePage from "@/hooks/usePage";

import { contentTableConfig } from "./config/content.config";
import { IContentConfig } from "@/components/page-content";
import { modelConfigAdd, modelConfigEdit } from "./config/modal.config";
import { searchFormConfig } from "./config/search.config";

import { watchSwitchLang } from '@/utils/i18n'

// 表格表单国际监听
watchSwitchLang(() => {
  searchFormConfig
})

// 新建单独处理
const newHandleCallback = () => {
  const idItem = modelConfigAdd.formItems?.find((item) => item.prop === "id");
  idItem!.isHidden = true;
};

// 编辑单独处理
const editHandleCallback = () => {
  const idItem = modelConfigEdit.formItems?.find((item) => item.prop === "id");
  idItem!.isHidden = true;
};

// 查询 - 表格 联动默认状态
const loading = ref(false);
const setLoading = (value: boolean) => {
  loading.value = value;
};
provide("loading", loading);
provide("setLoading", setLoading);

// 默认请求值
const searchFormData = ref({
  bank: "",
  username: "",
  acct: "",
  uid: "",
  status: null,
})

// 处理的hook
const {
  modalInfo,
  contentRef,
  addModalRef,
  editModalRef,
  handleEditClick,
  handleAddClick,
  handleSubmitClick,
  handleExportClick,
  handleSearchClick,
  handleResetClick,
} = usePage(newHandleCallback, editHandleCallback, undefined, searchFormData.value);
</script>

<style lang="scss" scoped>
.users-container {
  padding: $container-padding;
}
</style>
