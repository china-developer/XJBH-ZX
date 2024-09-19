<template>
  <div :class="[isFilter ? '' : 'hy-form']">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form ref="formRef" :model="formData" :rules="formRules" :label-width="labelWidth || 'auto'">
      <el-row :gutter="20">
        <template v-for="(item, index) in formItems" :key="index">
          <el-col :xs="getColLayout(item, 'xs')" :sm="getColLayout(item, 'sm')" :md="getColLayout(item, 'md')"
            :lg="getColLayout(item, 'lg')" :xl="getColLayout(item, 'xl')" :offset="getOffset(item)">
            <el-form-item class="form-item" :prop="item.prop" :label="tf(item.label ?? '')" v-if="!item.isHidden">
              <!-- 输入框 -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input clearable v-model="formData[item.prop]" v-bind="item.attrs"
                  :placeholder="tf(item.attrs?.placeholder) ?? ''" :disabled="item.attrs?.disabled ?? loading"
                  :show-password="item.type === 'password'" />
              </template>

              <!-- Input Number 数字输入框 -->
              <template v-else-if="item.type === 'number'">
                <span v-if="!!item.tipContent" slot="label" style="display: inline-block">
                  <el-tooltip effect="dark" :content="tf(item.tipContent)" placement="top">
                    <el-icon :size="20" style="margin-top: 6px; margin-right: 10px">
                      <QuestionFilled />
                    </el-icon>
                  </el-tooltip>
                </span>
                <el-input-number v-model="formData[item.prop]" v-bind="item.attrs" />
              </template>

              <!-- TreeSelect 树形选择 -->
              <template v-else-if="item.type === 'treeSelect'">
                <el-tree-select v-model="formData[item.prop]" v-bind="item.attrs" />
              </template>

              <!-- DatePicker 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-model="formData[item.prop]" style="width: 100%" v-bind="item.attrs"
                  :start-placeholder="tf(item.attrs?.startPlaceholder) ?? ' '"
                  :end-placeholder="tf(item.attrs?.endPlaceholder) ?? ' '" :disabled="loading" />
              </template>

              <!-- Text 文本 -->
              <template v-else-if="item.type === 'text'">
                <el-text v-bind="item.attrs">
                  {{ formData[item.prop] }}
                </el-text>
              </template>

              <!-- Select 选择器 [条件筛选时候用] -->
              <template v-else-if="item.type === 'select'">
                <el-select v-model="formData[item.prop]" v-bind="item.attrs"
                  :placeholder="tf(item.attrs?.placeholder) ?? ''" style="width: 100%" :disabled="loading">
                  <template v-for="option in item.options" :key="option.id">
                    <el-option :label="getLabel(option)" :value="getValue(option)" />
                  </template>
                </el-select>
              </template>

              <!-- 文本域 -->
              <template v-else-if="item.type === 'textarea'">
                <el-input v-model="formData[item.prop]" v-bind="item.attrs" type="textarea" :disabled="loading" />
              </template>

              <!-- swicth切换 -->
              <template v-else-if="item.type === 'switch'">
                <el-switch v-model="formData[item.prop]" v-bind="item.attrs" />
              </template>

              <!-- 多选 -->
              <template v-else-if="item.type === 'checkbox'">
                <el-checkbox-group v-model="formData[item.prop]" v-bind="item.attrs">
                  <template v-for="option in item.options" :key="option.value">
                    <el-checkbox v-bind="option" :disabled="loading" />
                  </template>
                </el-checkbox-group>
              </template>

              <!-- 上传图片 -->
              <template v-else-if="item.type === 'upload'">
                <image-upload v-model="formData[item.prop]" v-bind="item.attrs" />
              </template>

              <!-- Radio 单选框 -->
              <template v-else-if="item.type === 'radio'">
                <el-radio-group v-model="formData[item.prop]" v-bind="item.attrs">
                  <template v-for="option in item.options" :key="option.value">
                    <el-radio v-bind="option">
                      {{ tf(option.label!) }}
                    </el-radio>
                  </template>
                </el-radio-group>
              </template>

              <!-- Radio 默认日期范围 -->
              <template v-if="item.type === 'radio-button'">
                <div class="flex w-full justify-end">
                  <el-button v-for="(button, index) in item.buttons" :key="index"
                    :type="selectedIndex == index ? 'primary' : ''" v-model="formData[`${item.prop}`]"
                    @click="handleSelectDate(index, button.type, button.format)" :disabled="loading">{{ tf(button.label)
                    }}</el-button>
                </div>
              </template>

              <!-- 穿梭框 -->
              <template v-else-if="item.type === 'transfer'">
                <el-transfer v-model="formData[item.prop]" :titles="transferTitles" filterable
                  :filter-method="filterMethod" :filter-placeholder="tf(item.placeHolder!) ?? ''" :data="item.data" />
              </template>

              <!-- 其他参数 model弹窗 - 需要提取到model组件 -->
              <template v-else-if="item.type === 'arguments'">
                <div class="flex flex-col flex-wrap">
                  <div class="flex align-items-center mb-6">
                    <el-button :icon="Plus" circle class="ml-3" @click="addHeaderRow(formData[item.prop] || [])"
                      :disabled="loading" />
                  </div>
                  <!-- <div class="flex w-full justify-around mb-3">
                  <span>key</span>
                  <span>label</span>
                  <span>备注</span>
                </div> -->
                  <div class="flex gap-6 mb-3 flex-wrap w-full" v-for="(el, index) in formData[item.prop]" :key="index">
                    <el-form-item prop="key">
                      <el-input class="w-50" v-model="el.key" placeholder="key" :disabled="loading"></el-input>
                    </el-form-item>
                    <el-form-item prop="label">
                      <el-input class="w-50" v-model="el.label" placeholder="label" :disabled="loading"></el-input>
                    </el-form-item>
                    <el-form-item prop="notes">
                      <el-input class="w-50" v-model="el.note" placeholder="备注" :disabled="loading"></el-input>
                    </el-form-item>
                    <el-button :icon="Close" circle @click="deleteHeaderRow(index, formData[item.prop] || [])"
                      :disabled="loading" />
                  </div>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </template>
        <slot name="filterBtns"></slot>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Close } from "@element-plus/icons-vue";
import { IFormItem } from "@/base-ui/form";
import { ElForm } from "element-plus";
import { getDateRange, getStartOfDay, getEndOfDay } from "@/utils";
import { tf } from "@/utils/i18n";

type FormRules = InstanceType<typeof ElForm>;

interface MyObject {
  [key: string]: number;
}

const props = defineProps({
  modelValue: {
    type: Object,
  },
  labelWidth: {
    type: String,
    default: undefined,
  },
  isFilter: {
    type: Boolean,
    default: () => false,
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" }),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 1, // ≥1920px
      lg: 1, // ≥1200px
      md: 1, // ≥992px
      sm: 1, // ≥768px
      xs: 1, // <768px
    }),
  },
});

const defaultColLayout: MyObject = {
  xl: 24, // ≥1920px
  lg: 24, // ≥1200px
  md: 24, // ≥992px
  sm: 24, // ≥768px
  xs: 24, // <768px
};

// emit 配置
const emit = defineEmits(["update:modelValue", "custom-event"]);

const filterMethod = (query: any, item: any) => {
  return item.label.includes(query);
};

/**
 *
 * @param item 自适应布局
 */
// getOffset
const getOffset = (item: any) => {
  return item.offset !== undefined ? item.offset : 0;
};
// getColLayout
const getColLayout = (item: any, size: number | string) => {
  return item.colLayout && item.colLayout[size] !== undefined
    ? item.colLayout[size]
    : defaultColLayout[size];
};

/**
 * 对下拉框的值并联进行处理
 */
const getLabel = (option: { code?: string, label?: string }): string => {
  return tf(option.code ? option.code : option.label as string);
};

const getValue = (option: { code?: string, label?: string, id?: string | number, value?: string }): string | number => {
  return option.id ? option.id : option.value as string | number;
};

// 校验规则拿到实例对象 初始化
const formRef = ref();

/**
 * 穿梭框的配置
 */
const transferTitles = [tf("text1"), tf("text2")];
const formData = ref({ ...props.modelValue });
const formItems = reactive(props.formItems);
const formRules = <FormRules>{};

// 获取对象的所有键
var keys = Object.keys(formData.value);

/**
 * 初始化表单
 */
const prepareFuncs = [];
// 遍历表单项并初始化
for (const item of formItems) {
  // 初始化配置接口
  item.initFn && item.initFn(item);
  // 对于密码确认框进行特殊处理
  if (item.prop?.includes("password_confirm")) {
    item.rules?.push({
      validator: (rule: any, value: any, callback: any) => {
        if (value === "") {
          callback(new Error(tf("message4")));
        } else if (value !== formData.value.password) {
          // console.log(tf("message5"), value, formData.value.password);
          callback(new Error(tf("message5")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    });
  }
  // 校验规则初始化
  if (item.rules && item.rules.length > 0) {
    // 情况formRules
    item.rules?.forEach((rule: any) => {
      rule.message = tf(rule.message);
    });
    (formRules as Record<string, any>)[item.prop] = item.rules ?? [];
  }

  // 初始值进行赋值 -> 如果没有值则赋默认值
  if (keys.includes(item.prop.toString()) && formData.value[item.prop] == undefined) {
    formData.value[item.prop] = item.defaultValue ?? null;
  }

  // 初始化函数
  if (item.watch !== undefined) {
    prepareFuncs.push(() => {
      watch(
        () => formData.value[item.prop],
        (newValue, oldValue) => {
          item.watch && item.watch(newValue, oldValue, formData, formItems);
        }, { deep: true, immediate: true }
      );
    });
  }
}

prepareFuncs.forEach((func) => func());

/**
 * 表单校验
 */
const validateForm = async () => {
  //校验成功则方法自动返回true，校验方法报错则说明校验失败，返回false
  try {
    return await formRef.value.validate();
  } catch (error) {
    return false;
  }
};

/**
 * 特殊表单单独处理
 */

/**
 * 点击加号:增加一行header
 */
const addHeaderRow = (otherForm: Record<string, any>[]) => {
  otherForm.push({ key: "", label: "", note: "" });
};

// 点击减号:删除一行header
const deleteHeaderRow = (index: number, otherForm: Record<string, any>[]) => {
  otherForm.splice(index, 1);
};

/**
 * radio-button类型处理【固定日期范围配置 】
 */

// 默认固定日期初始化按钮索引
const selectedIndex = ref<number>(0);
// 默认固定日期初始化
const defaultDateCache = ref([getStartOfDay(), getEndOfDay()]);

const handleSelectDate = (
  index: number,
  type: string = "today",
  format: string
) => {
  // 激活索引
  selectedIndex.value = index;
  // 获取固定的日期时间 - 【今天】
  let fixedDate = getDateRange(type, format);
  formData.value.day = Object.values(fixedDate);
  defaultDateCache.value = Object.values(fixedDate);
  // 去执行父组件的查询方法
  emit("custom-event", defaultDateCache.value);
};

// 监听一次，让日期回写数据【今日】
watch(
  () => props.formItems,
  (newVal) => {
    // 判断newVal是否有键为button
    let hasKey = newVal.some(function (obj) {
      return obj.hasOwnProperty("buttons");
    });
    if (hasKey) {
      handleSelectDate(0, "today", "");
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

/**
 * 监听表单数据变化 【传递数据给父组件】
 */
let previousValue: any = null; // 初始化之前保存的值
watch(
  () => formData,
  (formDataValue) => {
    // 表单是否含有isLinkage,并且isLinkage为true - 【币种-供应商联动】
    let isLinkage = formItems.some((item) => item.isLinkage === true);
    // 如果currency_id不为空,则请求formItems循环值的renderFn自定函数
    if (
      isLinkage &&
      formDataValue.value.currency_id &&
      Boolean(formDataValue.value.currency_id.toString().trim())
    ) {
      // 如果当前值和之前保存的值不同，则执行请求操作
      if (previousValue !== formDataValue.value.currency_id) {
        let item = formItems.find(
          (item) => item?.isLinkage === true
        ) as IFormItem;
        item.renderFn && item.renderFn(formDataValue.value.currency_id);
        // 清空值
        // formDataValue.value[item.prop] = []
        // 更新之前保存的值为当前值
        previousValue = formDataValue.value.currency_id;
      }
    }
    emit("update:modelValue", formDataValue.value);
  },
  { deep: true }
);

// 暴露的属性和方法
defineExpose({ validateForm });
</script>

<style scoped lang="scss">
.hy-form {
  padding: 20px;
  overflow-y: scroll;
  max-height: 600px;
}

::-webkit-scrollbar {
  display: none;
}

:deep(.el-textarea__inner) {
  height: 100px;
}
</style>
