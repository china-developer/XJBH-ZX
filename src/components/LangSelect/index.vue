<template>
  <el-dropdown trigger="click" @command="handleLanguageChange">
    <div>
      <svg-icon icon-class="language" :size="size" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :disabled="appStore.language === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/modules/app";
import { LanguageOptions } from "@/enums/LanguageEnum";

const { locale, t } = useI18n();
const props = defineProps({
  size:{
    type: String,
    default: "20px"
  },
  modelValue: {
    type: Object,
    default: {}
  },
  langOptions: {
    type: Array,
    default: () => LanguageOptions
  }
})

const emit = defineEmits(['update:modelValue'])

const appStore = useAppStore();




function handleLanguageChange(lang) {
  locale.value = lang;
  appStore.changeLanguage(lang);
  let langOjb = props.langOptions.find(item => item.value === lang)
  ElMessage.success(t("langSelect.message.success"));
  emit('update:modelValue',langOjb)
}
</script>
