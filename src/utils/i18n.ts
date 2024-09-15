// translate router.meta.title, be used in breadcrumb sidebar tagsview
import i18n from "@/lang/index";
import { watch } from 'vue'
import { useAppStore } from "@/stores/modules/app";
const appStore = useAppStore();

// 定义一个Trim工具类型，用于对于字符串字面量进行空格处理
type TrimLeft<T extends string> = T extends ` ${infer A}` ? TrimLeft<A> : T;
type TrimRight<T extends string> = T extends `${infer A} ` ? TrimRight<A> : T;

type Trim<V extends string> = TrimLeft<TrimRight<V>>;

export function translateRouteTitle (title : string) {
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te("route." + title);
  if (hasKey) {
    const translatedTitle = i18n.global.t("route." + title);
    return translatedTitle;
  }
  return title;
}

// 对应表单的国际化
export function tf(key: Trim<string>): string {
  if (key == null) {
    return key;
  }
  const trimmedKey: Trim<typeof key> = key.trim();
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te("form." + trimmedKey);
  if (hasKey) {
    const translatedTitle = i18n.global.t("form." + trimmedKey);
    return translatedTitle;
  }
  return trimmedKey;
}

// 对应表格的国际化
export function tt(key: Trim<string>): string {
  if (key == null) {
    return key;
  }
  const trimmedKey: Trim<typeof key> = key.trim();
  // 判断是否存在国际化配置，如果没有原生返回
  const hasKey = i18n.global.te("table." + trimmedKey);
  if (hasKey) {
    const translatedTitle = i18n.global.t("table." + trimmedKey);
    return translatedTitle;
  }
  return trimmedKey;
}


/**
 *
 * @param  {...any} cbs 所有的回调
 */

export function watchSwitchLang(...cbs: Function[]){
  watch(
    () => appStore.language,
    () => {
      cbs.forEach(cb => cb(appStore.language))
    }
  )
}