// vite.config.js
import vue from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import { defineConfig, loadEnv } from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unplugin-vue-components/dist/vite.js";
import Icons from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unplugin-icons/dist/resolver.js";
import mockDevServerPlugin from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/vite-plugin-mock-dev-server/dist/index.js";
import UnoCSS from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unocss/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/unplugin-vue-components/dist/resolvers.js";
import { createSvgIconsPlugin } from "file:///C:/Users/XCCX/Desktop/XJBH-ZX/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "path";

// package.json
var name = "\u7BA1\u7406\u540E\u53F0";
var version = "1.0.0";
var dependencies = {
  "@element-plus/icons-vue": "^2.3.1",
  "@vitejs/plugin-vue-jsx": "^4.0.0",
  "@vueuse/core": "^10.11.0",
  "@wangeditor/editor": "^5.1.23",
  "animate.css": "^4.1.1",
  autoprefixer: "^10.4.19",
  axios: "^1.7.2",
  color: "^4.2.3",
  dayjs: "^1.11.12",
  "element-plus": "^2.7.6",
  "eslint-plugin-import": "^2.29.1",
  exceljs: "^4.4.0",
  "fuse.js": "^7.0.0",
  jsonwebtoken: "^9.0.2",
  "jwt-decode": "^4.0.0",
  "moment-timezone": "^0.5.45",
  nprogress: "^0.2.0",
  path: "^0.12.7",
  "path-browserify": "^1.0.1",
  pinia: "^2.1.7",
  postcss: "^8.4.39",
  "postcss-html": "^1.7.0",
  "postcss-scss": "^4.0.9",
  sass: "^1.77.6",
  "socket.io-client": "^4.8.0",
  unocss: "^0.61.0",
  "unplugin-icons": "^0.19.0",
  "unplugin-vue-components": "^0.27.2",
  "vite-plugin-mock-dev-server": "^1.5.1",
  "vite-plugin-svg-icons": "^2.0.1",
  vue: "^3.4.29",
  "vue-i18n": "9",
  "vue-router": "^4.3.3",
  "vue3-count-to": "^1.1.2"
};
var devDependencies = {
  "@iconify-json/ep": "^1.1.15",
  "@types/color": "^3.0.6",
  "@types/jsonwebtoken": "^9.0.7",
  "@types/node": "^22.1.0",
  "@types/nprogress": "^0.2.3",
  "@types/path-browserify": "^1.0.2",
  "@unocss/preset-uno": "^0.61.8",
  "@vitejs/plugin-vue": "^5.0.5",
  typescript: "^5.5.4",
  "unplugin-auto-import": "^0.18.2",
  vite: "^5.3.1",
  "vue-tsc": "^2.0.29"
};

// vite.config.js
var __vite_injected_original_dirname = "C:\\Users\\XCCX\\Desktop\\XJBH-ZX";
var __APP_INFO__ = {
  pkg: { name, version, dependencies, devDependencies },
  buildTimestamp: Date.now()
};
var pathSrc = resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    resolve: {
      alias: {
        "@": pathSrc
        //fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // CSS 预处理器
      preprocessorOptions: {
        // 定义全局 SCSS 变量
        scss: {
          javascriptEnabled: true,
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      // 允许IP访问
      host: "0.0.0.0",
      // 应用端口 (默认:3000)
      port: Number(env.VITE_APP_PORT),
      // 运行是否自动打开浏览器
      open: true,
      proxy: {
        /** 代理前缀为 /dev-api 的请求  */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          // 接口地址
          target: env.VITE_APP_API_URL,
          rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      }
    },
    plugins: [
      vue(),
      // jsx语法支持
      vueJsx(),
      // MOCK 服务
      env.VITE_MOCK_DEV_SERVER === "true" ? mockDevServerPlugin() : null,
      UnoCSS(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        // 目标文件
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.md$/
          // .md
        ],
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon"
            // 组件统一前缀
          })
        ],
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true
          // 自动导入的函数名
        },
        // 是否在 vue 模板中自动导入
        vueTemplate: true,
        // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
        dts: false
        // 指定生成的地址
        // dts: "./types/.auto-imports.d.ts",
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
            enabledCollections: ["ep"]
          })
        ],
        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        // 指定自动导入组件TS类型声明文件路径 (false:关闭自动生成)
        dts: false
        // 指定生成的地址
        // dts: "./types/.auto-components.d.ts",
      }),
      Icons({
        // 自动安装图标库
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(pathSrc, "assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      })
    ],
    // 预加载项目必需的组件
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "@vueuse/core",
        "sortablejs",
        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "vue-i18n",
        "path-browserify",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "element-plus/es/components/radio-button/style/css",
        "element-plus/es/components/checkbox-group/style/css",
        "element-plus/es/components/checkbox/style/css",
        "element-plus/es/components/tabs/style/css",
        "element-plus/es/components/tab-pane/style/css",
        "element-plus/es/components/rate/style/css",
        "element-plus/es/components/date-picker/style/css",
        "element-plus/es/components/notification/style/css",
        "element-plus/es/components/image/style/css",
        "element-plus/es/components/statistic/style/css",
        "element-plus/es/components/watermark/style/css",
        "element-plus/es/components/config-provider/style/css",
        "element-plus/es/components/text/style/css",
        "element-plus/es/components/drawer/style/css",
        "element-plus/es/components/color-picker/style/css"
      ]
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcWENDWFxcXFxEZXNrdG9wXFxcXFhKQkgtWlhcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFhDQ1hcXFxcRGVza3RvcFxcXFxYSkJILVpYXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9YQ0NYL0Rlc2t0b3AvWEpCSC1aWC92aXRlLmNvbmZpZy5qc1wiOy8vIGltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSBcInVucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGVcIjtcbmltcG9ydCBDb21wb25lbnRzIGZyb20gXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlXCI7XG5pbXBvcnQgSWNvbnMgZnJvbSBcInVucGx1Z2luLWljb25zL3ZpdGVcIjtcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gXCJ1bnBsdWdpbi1pY29ucy9yZXNvbHZlclwiO1xuaW1wb3J0IG1vY2tEZXZTZXJ2ZXJQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLW1vY2stZGV2LXNlcnZlclwiO1xuaW1wb3J0IFVub0NTUyBmcm9tIFwidW5vY3NzL3ZpdGVcIjtcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgbmFtZSwgdmVyc2lvbiwgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcblxuLyoqIFx1NUU3M1x1NTNGMFx1NzY4NFx1NTQwRFx1NzlGMFx1MzAwMVx1NzI0OFx1NjcyQ1x1MzAwMVx1OEZEMFx1ODg0Q1x1NjI0MFx1OTcwMFx1NzY4NGBub2RlYFx1NzI0OFx1NjcyQ1x1MzAwMVx1NEY5RFx1OEQ1Nlx1MzAwMVx1Njc4NFx1NUVGQVx1NjVGNlx1OTVGNFx1NzY4NFx1N0M3Qlx1NTc4Qlx1NjNEMFx1NzkzQSAqL1xuY29uc3QgX19BUFBfSU5GT19fID0ge1xuICBwa2c6IHsgbmFtZSwgdmVyc2lvbiwgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMgfSxcbiAgYnVpbGRUaW1lc3RhbXA6IERhdGUubm93KCksXG59O1xuY29uc3QgcGF0aFNyYyA9IHJlc29sdmUoX19kaXJuYW1lLCBcInNyY1wiKTtcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGhTcmMvL2ZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgfVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICAvLyBDU1MgXHU5ODg0XHU1OTA0XHU3NDA2XHU1NjY4XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIC8vIFx1NUI5QVx1NEU0OVx1NTE2OFx1NUM0MCBTQ1NTIFx1NTNEOFx1OTFDRlxuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiQC9zdHlsZXMvdmFyaWFibGVzLnNjc3NcIiBhcyAqO2AsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBcdTUxNDFcdThCQjhJUFx1OEJCRlx1OTVFRVxuICAgICAgaG9zdDogXCIwLjAuMC4wXCIsXG4gICAgICAvLyBcdTVFOTRcdTc1MjhcdTdBRUZcdTUzRTMgKFx1OUVEOFx1OEJBNDozMDAwKVxuICAgICAgcG9ydDogTnVtYmVyKGVudi5WSVRFX0FQUF9QT1JUKSxcbiAgICAgIC8vIFx1OEZEMFx1ODg0Q1x1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NjI1M1x1NUYwMFx1NkQ0Rlx1ODlDOFx1NTY2OFxuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIC8qKiBcdTRFRTNcdTc0MDZcdTUyNERcdTdGMDBcdTRFM0EgL2Rldi1hcGkgXHU3Njg0XHU4QkY3XHU2QzQyICAqL1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXToge1xuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAvLyBcdTYzQTVcdTUzRTNcdTU3MzBcdTU3NDBcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQUF9BUElfVVJMLFxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PlxuICAgICAgICAgICAgcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeXCIgKyBlbnYuVklURV9BUFBfQkFTRV9BUEkpLCBcIlwiKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIC8vIGpzeFx1OEJFRFx1NkNENVx1NjUyRlx1NjMwMVxuICAgICAgdnVlSnN4KCksXG4gICAgICAvLyBNT0NLIFx1NjcwRFx1NTJBMVxuICAgICAgZW52LlZJVEVfTU9DS19ERVZfU0VSVkVSID09PSBcInRydWVcIiA/IG1vY2tEZXZTZXJ2ZXJQbHVnaW4oKSA6IG51bGwsXG4gICAgICBVbm9DU1MoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQXJlZiwgcmVhY3RpdmUsIHRvUmVmIFx1N0I0OVxuICAgICAgICBpbXBvcnRzOiBbXCJ2dWVcIiwgXCJAdnVldXNlL2NvcmVcIiwgXCJwaW5pYVwiLCBcInZ1ZS1yb3V0ZXJcIiwgXCJ2dWUtaTE4blwiXSxcbiAgICAgICAgLy8gXHU3NkVFXHU2ODA3XHU2NTg3XHU0RUY2XG4gICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICAgIC9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgICAvXFwubWQkLywgLy8gLm1kXG4gICAgICAgIF0sXG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3NkY4XHU1MTczXHU1MUZEXHU2NTcwXHVGRjBDXHU1OTgyXHVGRjFBRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKFx1NUUyNlx1NjgzN1x1NUYwRilcbiAgICAgICAgICBFbGVtZW50UGx1c1Jlc29sdmVyKCksXG4gICAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XG4gICAgICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgICAgICBwcmVmaXg6ICdJY29uJywgLy8gXHU3RUM0XHU0RUY2XHU3RURGXHU0RTAwXHU1MjREXHU3RjAwXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIGVzbGludHJjOiB7XG4gICAgICAgICAgLy8gXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwIGVzbGludCBcdTg5QzRcdTUyMTlcdUZGMENcdTVFRkFcdThCQUVcdTc1MUZcdTYyMTBcdTRFNEJcdTU0MEVcdThCQkVcdTdGNkUgZmFsc2VcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTUxRkRcdTY1NzAgZXNsaW50IFx1ODlDNFx1NTIxOVx1NzY4NFx1NjU4N1x1NEVGNlxuICAgICAgICAgIGZpbGVwYXRoOiBcIi4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25cIixcbiAgICAgICAgICBnbG9iYWxzUHJvcFZhbHVlOiB0cnVlLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcdTc2ODRcdTUxRkRcdTY1NzBcdTU0MERcbiAgICAgICAgfSxcbiAgICAgICAgLy8gXHU2NjJGXHU1NDI2XHU1NzI4IHZ1ZSBcdTZBMjFcdTY3N0ZcdTRFMkRcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjVcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTFGRFx1NjU3MFRTXHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0IChmYWxzZTpcdTUxNzNcdTk1RURcdTgxRUFcdTUyQThcdTc1MUZcdTYyMTApXG4gICAgICAgIGR0czogZmFsc2UsXG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1NzUxRlx1NjIxMFx1NzY4NFx1NTczMFx1NTc0MFxuICAgICAgICAvLyBkdHM6IFwiLi90eXBlcy8uYXV0by1pbXBvcnRzLmQudHNcIixcbiAgICAgIH0pLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1xuICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XG4gICAgICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuICAgICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgICAgLy8gZWxlbWVudC1wbHVzXHU1NkZFXHU2ODA3XHU1RTkzXHVGRjBDXHU1MTc2XHU0RUQ2XHU1NkZFXHU2ODA3XHU1RTkzIGh0dHBzOi8vaWNvbi1zZXRzLmljb25pZnkuZGVzaWduL1xuICAgICAgICAgICAgZW5hYmxlZENvbGxlY3Rpb25zOiBbXCJlcFwiXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4MUVBXHU1QjlBXHU0RTQ5XHU3RUM0XHU0RUY2XHU0RjREXHU3RjZFKFx1OUVEOFx1OEJBNDpzcmMvY29tcG9uZW50cylcbiAgICAgICAgZGlyczogW1wic3JjL2NvbXBvbmVudHNcIiwgXCJzcmMvKiovY29tcG9uZW50c1wiXSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU3RUM0XHU0RUY2VFNcdTdDN0JcdTU3OEJcdTU4RjBcdTY2MEVcdTY1ODdcdTRFRjZcdThERUZcdTVGODQgKGZhbHNlOlx1NTE3M1x1OTVFRFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMClcbiAgICAgICAgZHRzOiBmYWxzZSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU3Njg0XHU1NzMwXHU1NzQwXG4gICAgICAgIC8vIGR0czogXCIuL3R5cGVzLy5hdXRvLWNvbXBvbmVudHMuZC50c1wiLFxuICAgICAgfSksXG4gICAgICBJY29ucyh7XG4gICAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUI4OVx1ODhDNVx1NTZGRVx1NjgwN1x1NUU5M1xuICAgICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcbiAgICAgICAgaWNvbkRpcnM6IFtyZXNvbHZlKHBhdGhTcmMsIFwiYXNzZXRzL2ljb25zXCIpXSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIixcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgLy8gXHU5ODg0XHU1MkEwXHU4RjdEXHU5ODc5XHU3NkVFXHU1RkM1XHU5NzAwXHU3Njg0XHU3RUM0XHU0RUY2XG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIFwidnVlXCIsXG4gICAgICAgIFwidnVlLXJvdXRlclwiLFxuICAgICAgICBcInBpbmlhXCIsXG4gICAgICAgIFwiYXhpb3NcIixcbiAgICAgICAgXCJAdnVldXNlL2NvcmVcIixcbiAgICAgICAgXCJzb3J0YWJsZWpzXCIsXG4gICAgICAgIFwicGF0aC10by1yZWdleHBcIixcbiAgICAgICAgXCJlY2hhcnRzXCIsXG4gICAgICAgIFwiQHdhbmdlZGl0b3IvZWRpdG9yXCIsXG4gICAgICAgIFwiQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWVcIixcbiAgICAgICAgXCJ2dWUtaTE4blwiLFxuICAgICAgICBcInBhdGgtYnJvd3NlcmlmeVwiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Zvcm0vc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZm9ybS1pdGVtL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2J1dHRvbi9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbnB1dC1udW1iZXIvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3dpdGNoL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3VwbG9hZC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9tZW51L3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pY29uL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3Jvdy9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWcvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvZGlhbG9nL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2xvYWRpbmcvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8vc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcmFkaW8tZ3JvdXAvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvcG9wb3Zlci9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zY3JvbGxiYXIvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdG9vbHRpcC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9kcm9wZG93bi1tZW51L3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2Ryb3Bkb3duLWl0ZW0vc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvc3ViLW1lbnUvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvbWVudS1pdGVtL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RpdmlkZXIvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2FyZC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9saW5rL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2JyZWFkY3J1bWIvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvYnJlYWRjcnVtYi1pdGVtL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RyZWUtc2VsZWN0L3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3RhYmxlLWNvbHVtbi9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zZWxlY3Qvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvb3B0aW9uL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL3BhZ2luYXRpb24vc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdHJlZS9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9hbGVydC9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYWRpby1idXR0b24vc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2hlY2tib3gtZ3JvdXAvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvY2hlY2tib3gvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvdGFicy9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90YWItcGFuZS9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9yYXRlL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RhdGUtcGlja2VyL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL25vdGlmaWNhdGlvbi9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9pbWFnZS9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9zdGF0aXN0aWMvc3R5bGUvY3NzXCIsXG4gICAgICAgIFwiZWxlbWVudC1wbHVzL2VzL2NvbXBvbmVudHMvd2F0ZXJtYXJrL3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2NvbmZpZy1wcm92aWRlci9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy90ZXh0L3N0eWxlL2Nzc1wiLFxuICAgICAgICBcImVsZW1lbnQtcGx1cy9lcy9jb21wb25lbnRzL2RyYXdlci9zdHlsZS9jc3NcIixcbiAgICAgICAgXCJlbGVtZW50LXBsdXMvZXMvY29tcG9uZW50cy9jb2xvci1waWNrZXIvc3R5bGUvY3NzXCIsXG4gICAgICBdLFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX0FQUF9JTkZPX186IEpTT04uc3RyaW5naWZ5KF9fQVBQX0lORk9fXyksXG4gICAgfSxcbiAgfVxufSlcbiIsICJ7XG4gIFwibmFtZVwiOiBcIlx1N0JBMVx1NzQwNlx1NTQwRVx1NTNGMFwiLFxuICBcInZlcnNpb25cIjogXCIxLjAuMFwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInZ1ZS10c2MgLS1ub0VtaXQgJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGVsZW1lbnQtcGx1cy9pY29ucy12dWVcIjogXCJeMi4zLjFcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZS1qc3hcIjogXCJeNC4wLjBcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4xMS4wXCIsXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3JcIjogXCJeNS4xLjIzXCIsXG4gICAgXCJhbmltYXRlLmNzc1wiOiBcIl40LjEuMVwiLFxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTlcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy4yXCIsXG4gICAgXCJjb2xvclwiOiBcIl40LjIuM1wiLFxuICAgIFwiZGF5anNcIjogXCJeMS4xMS4xMlwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNy42XCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI5LjFcIixcbiAgICBcImV4Y2VsanNcIjogXCJeNC40LjBcIixcbiAgICBcImZ1c2UuanNcIjogXCJeNy4wLjBcIixcbiAgICBcImpzb253ZWJ0b2tlblwiOiBcIl45LjAuMlwiLFxuICAgIFwiand0LWRlY29kZVwiOiBcIl40LjAuMFwiLFxuICAgIFwibW9tZW50LXRpbWV6b25lXCI6IFwiXjAuNS40NVwiLFxuICAgIFwibnByb2dyZXNzXCI6IFwiXjAuMi4wXCIsXG4gICAgXCJwYXRoXCI6IFwiXjAuMTIuN1wiLFxuICAgIFwicGF0aC1icm93c2VyaWZ5XCI6IFwiXjEuMC4xXCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzlcIixcbiAgICBcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjcuMFwiLFxuICAgIFwicG9zdGNzcy1zY3NzXCI6IFwiXjQuMC45XCIsXG4gICAgXCJzYXNzXCI6IFwiXjEuNzcuNlwiLFxuICAgIFwic29ja2V0LmlvLWNsaWVudFwiOiBcIl40LjguMFwiLFxuICAgIFwidW5vY3NzXCI6IFwiXjAuNjEuMFwiLFxuICAgIFwidW5wbHVnaW4taWNvbnNcIjogXCJeMC4xOS4wXCIsXG4gICAgXCJ1bnBsdWdpbi12dWUtY29tcG9uZW50c1wiOiBcIl4wLjI3LjJcIixcbiAgICBcInZpdGUtcGx1Z2luLW1vY2stZGV2LXNlcnZlclwiOiBcIl4xLjUuMVwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjI5XCIsXG4gICAgXCJ2dWUtaTE4blwiOiBcIjlcIixcbiAgICBcInZ1ZS1yb3V0ZXJcIjogXCJeNC4zLjNcIixcbiAgICBcInZ1ZTMtY291bnQtdG9cIjogXCJeMS4xLjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAaWNvbmlmeS1qc29uL2VwXCI6IFwiXjEuMS4xNVwiLFxuICAgIFwiQHR5cGVzL2NvbG9yXCI6IFwiXjMuMC42XCIsXG4gICAgXCJAdHlwZXMvanNvbndlYnRva2VuXCI6IFwiXjkuMC43XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMi4xLjBcIixcbiAgICBcIkB0eXBlcy9ucHJvZ3Jlc3NcIjogXCJeMC4yLjNcIixcbiAgICBcIkB0eXBlcy9wYXRoLWJyb3dzZXJpZnlcIjogXCJeMS4wLjJcIixcbiAgICBcIkB1bm9jc3MvcHJlc2V0LXVub1wiOiBcIl4wLjYxLjhcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNVwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjUuNFwiLFxuICAgIFwidW5wbHVnaW4tYXV0by1pbXBvcnRcIjogXCJeMC4xOC4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMy4xXCIsXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjIuMC4yOVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLHlCQUF5QjtBQUNoQyxPQUFPLFlBQVk7QUFDbkIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxlQUFlOzs7QUNYdEIsV0FBUTtBQUNSLGNBQVc7QUFRWCxtQkFBZ0I7QUFBQSxFQUNkLDJCQUEyQjtBQUFBLEVBQzNCLDBCQUEwQjtBQUFBLEVBQzFCLGdCQUFnQjtBQUFBLEVBQ2hCLHNCQUFzQjtBQUFBLEVBQ3RCLGVBQWU7QUFBQSxFQUNm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
