<template>
  <section class="app-main ">
    <router-view>
      <template #default="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script setup>
import { useTagsViewStore } from "@/stores";
import { computed } from "vue";

const cachedViews = computed(() => useTagsViewStore().cachedViews); // 缓存页面集合
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  width: 100%;
  min-height: calc(100vh - $navbar-height);
  overflow: hidden;
  // background-color: var(--el-bg-color-page);
}

.hasTagsView .app-main {
  min-height: calc(100vh - $navbar-height - $tags-view-height);
}

.fixed-header+.app-main {
  min-height: 100vh;
  padding-top: $navbar-height;
}

.hasTagsView .fixed-header+.app-main {
  min-height: 100vh;
  padding-top: $navbar-height + $tags-view-height;
  display: flex;
  flex-direction: column;
}

.layout-mix,
.layout-top {
  .fixed-header+.app-main {
    padding-top: 0;
  }
}

.layout-mix {
  .app-main {
    height: calc(100vh - $navbar-height);
    padding-top: 0;
    overflow-y: auto;
  }

  .hasTagsView .app-main {
    height: calc(100vh - $navbar-height - $tags-view-height);
    min-height: calc(100vh - $navbar-height - $tags-view-height);
  }

  .fixed-header+.app-main {
    min-height: calc(100vh - $navbar-height);
  }

  .hasTagsView .fixed-header+.app-main {
    height: calc(100vh - $navbar-height);
    min-height: calc(100vh - $navbar-height);
    padding-top: $tags-view-height;
  }
}

.layout-top {
  .hasTagsView .fixed-header+.app-main {
    padding-top: $tags-view-height;
  }
}
</style>
