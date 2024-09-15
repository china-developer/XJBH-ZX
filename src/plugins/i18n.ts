import type { App } from "vue";
// 国际化
import i18n from "@/lang/index";
export function setupI18n (app: App<Element>) {
  app.use(i18n);
}
