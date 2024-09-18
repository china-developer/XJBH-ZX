<template>
  <div class="page-modal">
    <el-dialog v-model="dialogVisible" :width="dialogWidth" align-center destroy-on-close>
      <template #header>
        <div class="my-header">
          <span>{{ tf(modalConfig.title) }}</span>
        </div>
      </template>
      <hy-form ref="ruleFormRef" v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{ tf('cancel') }}</el-button>
          <el-button type="primary" @click="handleConfirmClick" :loading="loadingStatus">{{ tf('confirm') }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import HyForm from "@/base-ui/form";
import { useThrottleFn } from "@vueuse/core";
import { tf } from "@/utils/i18n"

const props = defineProps({
  modalConfig: {
    type: Object,
    required: true,
  },
  defaultInfo: {
    type: Object,
    default: () => ({}),
  },
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    required: true,
  },
  dialogWidth: {
    type: String,
    default: "35%",
  },
});

// 按钮加载状态
const loadingStatus = ref<boolean>(false);
// 【新建】or【编辑】标识
const isEdit = ref<boolean>(false);
// 自定义事件
const emit = defineEmits<{
  submitClick: [];
}>();

// 1.绑定属性
const originFormData: any = {};
const formData = ref({ ...originFormData });

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const formItem of props.modalConfig.formItems) {
      formItem.initFn && formItem.initFn(formItem);
      formData.value[`${formItem.prop}`] = newValue[`${formItem.prop}`];
    }
    console.log("监==>", formData.value);
  }
);

// 2.内部处理
const ruleFormRef = ref();

const dialogVisible = ref<boolean>(false);
const handleConfirmClick = useThrottleFn(async () => {
  loadingStatus.value = true;
  let flag = await ruleFormRef.value?.validateForm();
  if (flag) {
    // ElMessage.success("已通过检查！");
    console.log("表单数据====>", formData.value);
    // 判断【新建】or【编辑】
    if (Object.keys(props.defaultInfo).length) {
      isEdit.value = true;
      console.log("编辑");
    } else {
      isEdit.value = false;
      console.log("新建");
    }
    //校验通过的代码
    if (typeof props.modalConfig.beforeSubmit === "function") {
      props.modalConfig.beforeSubmit(formData);
    }
    props.modalConfig
      .formAction(formData.value, isEdit.value)
      .then((res: object) => {
        let msg = tf('message7');
        if (props.modalConfig.title) {
          msg = tf(props.modalConfig.title) + tf('success');
        }
        ElMessage.success(msg);
        emit("submitClick");
        handleCloseModal();
      })
      .catch(() => {
        // ElMessage.error("操作失败");
      })
      .finally(() => {
        loadingStatus.value = false;
      });
  } else {
    loadingStatus.value = false;
    ElMessage.warning(tf('message6'));
  }
}, 3000);

// 关闭弹窗
function handleCloseModal() {
  dialogVisible.value = false;
  // 重置表单
  ruleFormRef.value?.resetFields();
  nextTick(() => {
    ruleFormRef.value?.clearValidate();
  });
}

defineExpose({
  dialogVisible,
});
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
