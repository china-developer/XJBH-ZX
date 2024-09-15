export {}
declare global {
  const ElMessage: (typeof import('element-plus'))['ElMessage']
  const ElMessageBox: (typeof import('element-plus'))['ElMessageBox']
  const ElLoading: (typeof import('element-plus'))['ElLoading']
}

declare module "element-plus/dist/locale/zh-cn.mjs";
declare module "element-plus/dist/locale/en.mjs";
