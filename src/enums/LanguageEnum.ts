/**
 * 语言枚举
 */
export const enum LanguageEnum {
  /**
   * 中文
   */
  ZH_CN = "zh-cn",

  /**
   * 英文
   */
  EN = "en",

  /**
   * 越南语
   */
  VI = "vi",
}

export const LanguageOptions = [
  { label: "使用简体中文", value: LanguageEnum.ZH_CN },
  { label: "Use English", value: LanguageEnum.EN },
  { label: "Việt nam", value: LanguageEnum.VI },
];
