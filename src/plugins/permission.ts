import router from "@/router";
import {
  RouteRecordRaw,
} from "vue-router";
import { useUserStore, usePermissionStore  } from "@/stores";
import NProgress from "@/utils/nprogress";
import { TOKEN_KEY } from "@/enums/CacheEnum";
import i18n from "@/lang";
const { t } = i18n.global;

export function setupPermission () {
  // 白名单路由
  const whiteList = ["/login"];
  
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const hasToken = localStorage.getItem(TOKEN_KEY);
    if (hasToken) {
      if (to.path === "/login") {
        // 如果已登录，跳转首页
        next({ path: "/" });
        console.log(1)
        NProgress.done();
      } else {
        const userStore = useUserStore();
        const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;

        if(hasRoles) {
          // console.log('hasRoles-true')
          // 未匹配到任何路由，跳转404
          if (to.matched.length === 0) {
            console.log(3)
            from.name ? next({ name: from.name }) : next("/404");
          } else {
            console.log(4)
            next();
          }
        }
         else {
          const permissionStore = usePermissionStore();
          try {
            const userInfo = await userStore.getUserInfo();
            let roles = (userInfo as {roles:string[]})?.roles || [];
            console.log('userInfo',userInfo)
            const accessRoutes = await permissionStore.generateRoutes(roles);
            accessRoutes.forEach((route:RouteRecordRaw) => {
              router.addRoute(route);
            });
            console.log(5)
            next(to.path);
  
          } catch (error) {
            // 移除 token 并跳转登录页
            // await userStore.resetToken();
            console.log(6)
            next(`/login?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      // 未登录可以访问白名单页面
      if (whiteList.indexOf(to.path) !== -1) {
        console.log(7)
        next();
      } else {
        console.log(8)
        ElMessage.success(t('logout.success'));
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    NProgress.done();
  });
}
