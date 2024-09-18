<template>
  <div class="flex">
    <template v-if="!isMobile">
      <!--全屏 -->
      <div class="setting-item" @click="toggle">
        <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
      </div>

      <!-- 布局大小 -->
      <el-tooltip :content="$t('sizeSelect.tooltip')" effect="dark" placement="bottom">
        <size-select class="setting-item" />
      </el-tooltip>

      <!-- 语言选择 -->
      <lang-select class="setting-item" />
    </template>

    <!-- 用户头像 -->
    <el-dropdown class="setting-item" trigger="click">
      <div class="flex-center h100% p10px">
        <img :src="userStore.user.avatar + '?imageView2/1/w/80/h/80'" class="rounded-full mr-10px w24px w24px" />
        <span>{{ userStore.user.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item @click="jumpTo('/user/setting')">
            {{ $t("navbar.userset") }}
          </el-dropdown-item>
          <el-dropdown-item @click="jumpTo('/user/twoface')">
            {{ $t("navbar.twoface") }}
          </el-dropdown-item> -->
          <el-dropdown-item divided @click="logout">
            {{ $t("navbar.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 设置 -->
    <!-- <template v-if="defaultSettings.showSettings">
      <div class="setting-item" @click="settingStore.settingsVisible = true">
        <svg-icon icon-class="setting" />
      </div>
    </template> -->
  </div>
</template>
<script setup>
import {
  useAppStore,
  useTagsViewStore,
  useUserStore,
  useSettingsStore,
} from "@/stores";
import defaultSettings from "@/settings";
import { DeviceEnum } from "@/enums/DeviceEnum";
const appStore = useAppStore();
const tagsViewStore = useTagsViewStore();
const userStore = useUserStore();
const settingStore = useSettingsStore();
const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const isMobile = computed(() => appStore.device === DeviceEnum.MOBILE);

const { isFullscreen, toggle } = useFullscreen();

/**
 * 注销
 */
async function logout() {
  try {
    const loadingInstance = ElLoading.service({
      lock: true,
      text: "Loading...",
      background: "rgba(0, 0, 0, 0.7)",
    });

    await ElMessageBox.confirm(t('logout.message'), t('logout.tip'), {
      confirmButtonText: t('logout.confirm'),
      cancelButtonText: t('logout.cancel'),
      type: "warning",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          instance.confirmButtonLoading = true;
          userStore
            .logout()
            .then(() => {
            })
            .finally(() => {
              instance.confirmButtonLoading = false;
              tagsViewStore.delAllViews();
              loadingInstance.close();
              done();
            });
        } else {
          // 取消操作，关闭加载动画
          loadingInstance.close();
          done();
        }
      },
    });
  } catch (error) {
    // 用户点击取消或关闭弹框
    console.error(error);
  }
}

/**
 * 跳转到用户设置页面
 */
function jumpTo(path) {
  router.push(path);
}
</script>
<style lang="scss" scoped>
.setting-item {
  display: inline-block;
  min-width: 40px;
  height: $navbar-height;
  line-height: $navbar-height;
  color: var(--el-text-color);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0 0 0 / 10%);
  }
}

.layout-top,
.layout-mix {

  .setting-item,
  .el-icon {
    color: var(--el-color-white);
  }
}

.dark .setting-item:hover {
  background: rgb(255 255 255 / 20%);
}
</style>
