<template>
  <template v-if="icon">
    <el-icon v-if="icon.startsWith('el-icon')" class="sub-el-icon">
      <component :is="icon.replace('el-icon-', '')" />
    </el-icon>
    <svg-icon v-else :icon-class="icon" size="1.4em" />
  </template>
  <span v-if="title" class="ml-3">{{ translateRouteTitle(title) }}</span>
</template>

<script setup>
import { translateRouteTitle } from "@/utils/i18n";

defineProps({
  icon: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.sub-el-icon {
  width: 14px !important;
  margin-right: 0 !important;
  font-size: 14px !important;
  color: currentcolor;
}

.hideSidebar {

  .el-sub-menu,
  .el-menu-item {

    .svg-icon,
    .sub-el-icon {
      margin-left: 20px;
    }
  }
}
</style>
