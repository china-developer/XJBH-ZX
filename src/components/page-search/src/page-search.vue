<template>
  <div>
    <hy-form ref="formRef" v-bind="searchConfig" @custom-event="handleCustomEvent" v-model="formData" :loading="loading"
      :isFilter="true">
      <template #filterBtns>
        <div class="filterBtns ml-5">
          <el-button :icon="Refresh" @click="handleResetClick" :disabled="loading">{{ tf('reset') }}</el-button>
          <el-button type="primary" :icon="Search" @click="handleQueryClick" :disabled="loading">{{ tf('search')
            }}</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { Search, Refresh } from "@element-plus/icons-vue";
import HyForm, { IForm } from "@/base-ui/form";
import { tf } from "@/utils/i18n"

interface IFormData {
  [key: string]: any;
}

const props = defineProps({
  searchConfig: {
    type: Object as PropType<IForm>,
    required: true,
  },
  title: {
    type: String,
    default: "高级检索",
  },
});
const emit = defineEmits(["queryBtnClick", "resetBtnClick"]);
const originFormData: IFormData = {};
const formItems = props.searchConfig.formItems ?? [];
for (const formItem of formItems) {
  formItem.initFn && formItem.initFn(formItem);
  originFormData[`${formItem.prop}`] = formItem.defaultValue;
}

const formData = ref<IFormData>({ ...originFormData });

// 自定义事件
let transferDate: any = ref([]);
const handleCustomEvent = (val: [] = []) => {
  if (val.length > 0) {
    transferDate.value = val;
  }
  // 如果自组件form有默认范围日期，则点击查询按钮时，将默认日期赋值给formData，触发handleQueryClick()查询事件
  handleQueryClick();
};

// 重置筛选
const handleResetClick = () => {
  for (const key in originFormData) {
    formData.value[`${key}`] = originFormData[key];
  }
  emit("resetBtnClick", formData.value);
};

// 条件筛选
const handleQueryClick = () => {
  // 输出新的数据对象
  console.log("触发条件查询originFormData", originFormData);
  emit("queryBtnClick", formData.value);
};

// 使用inject注入setChildBLoading函数
const loading = inject<any>('loading');

defineExpose({
  formData
})
</script>

<style scoped>
.title {
  padding-left: 30px;
  text-align: left;
}
</style>
