<template>
  <div :class="{ 'has-logo': sidebarLogo }">
    <!--混合布局-->
    <div class="flex w-full items-center" v-if="layout == LayoutEnum.MIX">
      <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
      <SidebarMixTopMenu class="flex-1" />
      <NavbarRight />
    </div>
    <!--左侧布局 || 顶部布局 -->
    <template v-else>
      <SidebarLogo v-if="sidebarLogo" :collapse="!appStore.sidebar.opened" />
      <!-- <SidebarUser :collapse="appStore.sidebar.opened" /> -->
      <!-- <header-search v-if="appStore.sidebar.opened" class="right-menu-item hover-effect"></header-search> -->
      <el-scrollbar>
        <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
      </el-scrollbar>
      <NavbarRight v-if="layout === LayoutEnum.TOP" />
    </template>
  </div>
</template>

<script setup>
import { useSettingsStore, usePermissionStore, useAppStore } from "@/stores";
import { LayoutEnum } from '@/enums/LayoutEnum';
import { computed } from "vue";
import SidebarUser from "./components/SidebarUser.vue";

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();

const sidebarLogo = computed(() => settingsStore.sidebarLogo);
const layout = computed(() => settingsStore.layout);
</script>

<style lang="scss" scoped>
.has-logo {
  .el-scrollbar {
    height: calc(100vh - $navbar-height);
  }
  .right-menu-item {
      display: inline-block;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
}
</style>
