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

    <!-- 消息通知 -->
    <el-badge class="setting-item" :value="noticeStore.length" :offset="[0, 15]" @click="handleNoticeChange">
      <svg-icon icon-class="notes" />
    </el-badge>

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

    <!-- 抽屉 -->
    <Teleport to="body">
      <el-drawer v-model="drawer" title="I am the title" :direction="direction">
        <template #header>
          <h4>消息内信</h4>
        </template>
        <template #default>
          <template v-for="(item, index) in noticeStore" :key="item.uid">
            <div class="noticeLi flex items-center w-full mb-5 cursor-pointer" @click="handleSpecify(item)"
              @mouseover="hoverIndex = index" @mouseleave="hoverIndex = null">
              <div class="flex flex-col justify-between w-full gap-2 p10px ">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-sm text-ellipsis overflow-hidden flex-1">{{ item.msg }}</span>
                  <span class="text-[var(--el-color-primary)] text-sm" v-show="hoverIndex === index">标记已读</span>
                </div>
                <div class="flex w-full justify-between items-center">
                  <div>
                    <span
                      class="bg-coolgray-200 border-1 text-sm border-coolgray-300 text-coolgray rounded-[5px] py-1 px-2">账号：{{
                        item.uid }}</span>
                    <span
                      class="bg-coolgray-200 border-1 text-sm border-coolgray-300 text-coolgray rounded-[5px] py-1 px-2 ml-2">银行：{{
                        item.bank }}</span>
                  </div>
                  <span class="text-coolgray text-sm">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </template>
        </template>
      </el-drawer>
    </Teleport>

    <!-- 对话框 -->
    <Teleport to="body">
      <el-dialog v-model="dialogVisible" title="提示" width="500" align-center>
        <span>是否标记为已读</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleMarkRed">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </Teleport>
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
import { io } from "socket.io-client";
import { TOKEN_KEY, REF_TOKEN_KEY } from "@/enums/CacheEnum";
import axios from "axios";
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
 * 通知
 */
// const noticeOptions = [
//   {
//     label: "通知:1",
//     value: "1",
//   },
//   {
//     label: "通知:2",
//     value: "2",
//   },
//   {
//     label: "通知:3",
//     value: "3",
//   },
// ];

let noticeStore = ref([]);
const hoverIndex = ref(null);
/**
 * 通知切换
 */

function handleNoticeChange(command) {
  console.log(command);
  drawer.value = true;
  // sendMessage()
}


/**
 * 抽屉事件
 */
const direction = ref('rtl')
const drawer = ref(false)
const dialogVisible = ref(false)
const markVal = ref(null)

/**
 * scoket.io 连接
 */
const access_token = localStorage.getItem(TOKEN_KEY)
const refresh_token = localStorage.getItem(REF_TOKEN_KEY);
const baseApi = import.meta.env.VITE_APP_BASE_API;

const socket = io('https://python.thai2570.com', {
  reconnectionDelayMax: 10000,
  reconnection: false, // 禁用自动重连
  auth: {
    token: access_token
  }
});

// 连接失败
socket.on('connect_error', (error) => {
  console.error('连接失败:', error);
  if (error.message.includes('invalid token')) {
    // Token 过期，调用刷新 token 的接口
    refreshToken()
  } else {
    console.error('连接错误:', error);
  }
});

const roomId = 'msg';
socket.emit("join_room", { room: roomId });
socket.on("connect", (err) => {
  console.log('connect===>', err)
  // socketStore.id = socket.id;
  // console.log(socket.id);
});

socket.on("disconnect", (err) => {
  console.log('disconnect===>', err)
  // console.log(socket.id);
});

socket.on("message", (msg) => {
  console.log('message===', msg);
});

socket.on("response", (res) => {
  noticeStore.value = res.data
  // console.log('noticeStore===>',noticeStore.value)
});

socket.io.on("error", (error) => {
  console.log('错误信息===', error);
  // ...
});


const refreshToken = () => {
  axios.get(`${baseApi}/api/cert/token/refresh`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`
    }
  })
    .then(response => {
      // 更新 token
      localStorage.setItem(TOKEN_KEY, response.data.token);
      localStorage.setItem(REF_TOKEN_KEY, response.data.refresh_token);
      // 重新连接 socket
      socket.auth.token = response.data.token;
      socket.connect();
    })
    .catch(error => {
      console.error('刷新 token 失败:', error);
    });
}

// 存储内容
const handleSpecify = (item) => {
  markVal.value = item
  dialogVisible.value = true
}

// 标记已读
const handleMarkRed = () => {
  console.log(markVal)
  socket.emit('message', { room: roomId, uid: markVal.value.uid }, (err, val) => {
    nextTick(()=>{
      noticeStore.value = noticeStore.value.filter(item => item.uid !== markVal.value.uid) || [];
    })
    ElMessage.success('标记已读成功,请刷新页面查看')
    console.log('触发message返回信息:', err, val);
  });
  dialogVisible.value = false
};


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

onMounted(() => {
  socket.connect(); //连接socket服务器
});
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

.noticeLi::before {
  content: '';
  display: inline-block;
  width: 1px;
  height: 50px;
  margin-right: 10px;
  // background: #dcdfe6;
  background: var(--el-color-primary);
}
</style>
