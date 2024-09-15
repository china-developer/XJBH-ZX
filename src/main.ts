
import { createApp } from 'vue'
import router from "@/router";
import { setupDirective } from "@/directive";
import { setupStore } from "@/stores";
import { setupElIcons, setupI18n, setupPermission } from "@/plugins";

import App from './App.vue'
import countTo from 'vue3-count-to'

// 本地SVG图标
import "virtual:svg-icons-register";

// 样式
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
import "uno.css";
import "animate.css";
import './assets/css/common.css'
const app = createApp(App)
// 全局注册 自定义指令(directive)
setupDirective(app);
// 全局注册 状态管理(store)
setupStore(app);
// 全局注册Element-plus图标
setupElIcons(app);
// 国际化
setupI18n(app);
// 注册动态路由
setupPermission();
app.use(router).use(countTo).mount('#app')
