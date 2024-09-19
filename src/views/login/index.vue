<template>
  <div class="login-container">
    <!-- 顶部 -->
    <div class="absolute right-10 top-10">
      <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" @change="toggleTheme" />
      <lang-select v-model="loginData.language" :langOptions="langList" class="ml-2 cursor-pointer" />
    </div>
    <!-- 登录表单 -->
    <el-card class="!border-none !bg-transparent !rounded-4% w-100 <sm:w-85">
      <div class="text-center relative">
        <h2>{{ defaultSettings.title }}</h2>
      </div>

      <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
        <!-- 用户名 -->
        <el-form-item prop="email">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="user" class="mx-2" />
            <el-input ref="user" v-model="loginData.user" :placeholder="$t('login.username')" name="user" size="large"
              class="h-[48px]" />
          </div>
        </el-form-item>

        <!-- 密码 -->
        <el-tooltip :visible="isCapslock" :content="$t('login.capsLock')" placement="right">
          <el-form-item prop="password">
            <div class="flex-y-center w-full">
              <svg-icon icon-class="lock" class="mx-2" />
              <el-input v-model="loginData.password" :placeholder="$t('login.password')" type="password" name="password"
                @keyup="checkCapslock" @keyup.enter="handleLogin" size="large" class="h-[48px] pr-2" show-password />
            </div>
          </el-form-item>
        </el-tooltip>

        <!-- 选择语言 -->
        <el-form-item prop="language">
          <div class="flex-y-center w-full">
            <svg-icon icon-class="captcha" class="mx-2" />
            <el-select v-model="languageData.language" @change="handelChangeLang" size="large">
              <el-option v-for="item in langList" :key="item.value" :label="item.label" :value="item" />
            </el-select>
          </div>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button :loading="loading" type="primary" size="large" class="w-full" @click.prevent="handleLogin">{{
          $t("login.login") }}
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { useSettingsStore, useUserStore, useOptionsStore } from "@/stores";
import router from "@/router";
import { useI18n } from "vue-i18n";
import defaultSettings from "@/settings";
import { ThemeEnum } from "@/enums/ThemeEnum";
import AuthAPI from "@/api/auth";
import { ElMessage } from "element-plus";
import { Moon } from "@element-plus/icons-vue";
import { Sunny } from "@element-plus/icons-vue";
import { LanguageEnum } from "@/enums/LanguageEnum";
import { useAppStore } from "@/stores/modules/app";
import { reactify } from "@vueuse/core";
// Stores
const userStore = useUserStore();
const settingsStore = useSettingsStore();

const optionsStore = useOptionsStore();
const appStore = useAppStore();
// Internationalization
const { locale, t } = useI18n();

// Reactive states
const isDark = ref(settingsStore.theme === ThemeEnum.DARK);
const icpVisible = ref(true);
const loading = ref(false); // 按钮loading
const isCapslock = ref(false); // 是否大写锁定
const captchaBase64 = ref(); // 验证码图片Base64字符串
const loginFormRef = ref(ElForm); // 登录表单ref
const { height } = useWindowSize();

const langList = [
  { label: "使用简体中文", value: LanguageEnum.ZH_CN },
  { label: "Use English", value: LanguageEnum.EN },
  { label: "Việt nam", value: LanguageEnum.VI },
];

const languageTag = computed(() => {
  let lang = langList.find((item) => item.value === appStore.language);
  return lang;
});

// 登录下拉框触发事件 -> 触发语言改变
const handelChangeLang = (item) => {
  locale.value = item.value;
  appStore.changeLanguage(item.value);
};

const loginData = ref({
  user: "",
  password: "",
});

const languageData = ref({
  language: languageTag.value || langList[0],
});

const loginRules = computed(() => {
  return {
    user: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.user.required"),
      },
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.password.required"),
      },
      {
        min: 1,
        message: t("login.message.password.min"),
        trigger: "blur",
      },
    ],
    captchaCode: [
      {
        required: true,
        trigger: "blur",
        message: t("login.message.captchaCode.required"),
      },
    ],
  };
});

/** 获取验证码 */
// function getCaptcha() {
//   AuthAPI.getCaptcha().then((data) => {
//     loginData.value.captchaKey = data.captchaKey;
//     captchaBase64.value = data.captchaBase64;
//   });
// }

/** 登录 */
const route = useRoute();
const handleLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      // await AuthAPI.csrfCookie();
      userStore
        .login(loginData.value)
        .then(async () => {
          const query = route.query;
          const redirect = query.redirect ?? "/";
          const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
            if (cur !== "redirect") {
              acc[cur] = query[cur];
            }
            return acc;
          }, {});

          // await optionsStore.getInitalBankOptions();

          // 成功跳转页面
          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch((error) => {
          ElMessage.error(error.message);
          // getCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
};

/** 主题切换 */
const toggleTheme = () => {
  const newTheme =
    settingsStore.theme === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
  settingsStore.changeTheme(newTheme);
};

/** 根据屏幕宽度切换设备模式 */
watchEffect(() => {
  if (height.value < 600) {
    icpVisible.value = false;
  } else {
    icpVisible.value = true;
  }
});

/** 检查输入大小写 */
const checkCapslock = (event) => {
  // 防止浏览器密码自动填充时报错
  if (event instanceof KeyboardEvent) {
    isCapslock.value = event.getModifierState("CapsLock");
  }
};

onMounted(() => {
  // getCaptcha();
});
</script>

<style lang="scss" scoped>
html.dark .login-container {
  background: url("@/assets/images/login-bg-dark.jpg") no-repeat center right;
}

.login-container {
  overflow-y: auto;
  background: url("@/assets/images/login-bg.jpg") no-repeat center center;
  background-size: cover;

  @apply wh-full flex-center;

  .login-form {
    padding: 30px 10px;
  }
}

.el-form-item {
  background: var(--el-input-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 5px;
}

:deep(.el-input) {
  .el-input__wrapper {
    padding: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}

:deep(.el-select) {
  .el-select__wrapper {
    padding-left: 0;
    background-color: transparent;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: none !important;
    }

    input:-webkit-autofill {
      /* 通过延时渲染背景色变相去除背景颜色 */
      transition: background-color 1000s ease-in-out 0s;
    }
  }
}
</style>
