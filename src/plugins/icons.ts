import type { App } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 注册所有图标
export const setupElIcons = (app: App<Element>) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
}
