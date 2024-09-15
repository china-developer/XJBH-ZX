<!-- 左侧边菜单：包括左侧布局(left)、顶部布局(all)、混合布局(left) -->
<template>
  <el-menu :default-active="currentRoute.path" :collapse="!appStore.sidebar.opened"
    :background-color="variables['menu-background']" :text-color="variables['menu-text']"
    :active-text-color="variables['menu-active-text']" :unique-opened="true" :collapse-transition="false"
    :mode="layout === 'top' ? 'horizontal' : 'vertical'">
    <SidebarMenuItem v-for="route in menuList" :key="route.path" :item="route" :base-path="resolvePath(route.path)"
      :is-collapse="!appStore.sidebar.opened" />
  </el-menu>
</template>

<script setup>
import { useSettingsStore, useAppStore } from "@/stores";
import { isExternal } from "@/utils/index";
import path from "path-browserify";
import variables from "@/styles/variables.module.scss";

const settingsStore = useSettingsStore();
const appStore = useAppStore();
const currentRoute = useRoute();
const layout = computed(() => settingsStore.layout);
const props = defineProps({
  menuList: {
    required: true,
    default: () => {
      return [];
    },
    type: Array,
  },
  basePath: {
    type: String,
    required: true,
  },
});

console.log(props.menuList)

/**
 * 解析路径
 *
 * @param routePath 路由路径 /user
 */
function resolvePath (routePath) {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }

  // 完整绝对路径 = 父级路径(/system) + 路由路径(/user)
  const fullPath = path.resolve(props.basePath, routePath);
  return fullPath;
}
</script>

<style lang="scss" scoped>
:deep(.el-menu-item:hover) {
  color: #fff !important;
}
:deep(.el-sub-menu__title:hover) {
  background: $menu-hover !important;
}
</style>
