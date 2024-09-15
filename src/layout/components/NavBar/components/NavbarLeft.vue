<template>
  <div class="flex">
    <hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
    <breadcrumb />
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores";

const appStore = useAppStore();

function toggleSideBar () {
  appStore.toggleSidebar();
}
</script>
