import { store } from '../index'
import { RouteVO } from "@/api/auth/menu";
import { constantRoutes } from "@/router";
import { RouteRecordRaw } from "vue-router";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

// 本地路由测试数据
import menuJson from "./test/menu.json";
import { MenuTestVO } from "./test/type";

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param roles 用户角色集合
 * @param route 路由
 * @returns
 */
const hasPermission = (roles:string[], route:any) => {
  if (route.meta && route.meta.roles) {
    // 角色【超级管理员】拥有所有权限，忽略校验
    if (roles.includes("ROOT")) {
      return true;
    }
    return roles.some((role) => {
      if (route.meta?.roles) {
        return route.meta.roles.includes(role);
      }
    });
  }
  return false;
};

/**
 * 递归过滤有权限的动态路由
 *
 * @param routes 接口返回所有的动态路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的动态路由
 */
const filterAsyncRoutes = (routes:RouteVO[], roles:string[]) => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw;; // 深拷贝 route 对象 避免污染
    if (hasPermission(roles, tmpRoute)) {
      // 如果是顶级目录，替换为 Layout 组件
      if (tmpRoute.component?.toString() == "Layout") {
        tmpRoute.component = Layout;
      } else {
        // 如果是子目录，动态加载组件
        const component = modules[`../../views/${tmpRoute.component}.vue`];
        if (component) {
          tmpRoute.component = component;
        } else {
          tmpRoute.component = modules[`../../views/error-page/404.vue`];
        }
      }

      if (tmpRoute.children) {
        tmpRoute.children = filterAsyncRoutes(route.children!, roles);
      }

      asyncRoutes.push(tmpRoute);
    }
  });

  return asyncRoutes;
};
// setup
export const usePermissionStore = defineStore("permission", () => {
  // state
  const routes = ref<RouteRecordRaw[]>([]);

  // actions
  function setRoutes(newRoutes:any) {
    console.log(newRoutes);
    routes.value = constantRoutes.concat(newRoutes);
  }

  /**
   * 生成动态路由
   *
   * @param roles 用户角色集合
   * @returns
   */
  function generateRoutes(roles:string[]) {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      // 接口获取所有路由
      // listRoutes()
      //   .then((data) => {
      let asyncRoutes = <any>[];
      // for (let i in roles) {
      //   asyncRoutes = [...asyncRoutes, ...menuJson[roles[i]]]
      // }
      asyncRoutes = [...asyncRoutes, ...(menuJson as MenuTestVO)[roles[0]]]
      // asyncRoutes[0].children.push(...userRoutes)
      console.log("asyncRoutes", asyncRoutes);
      // 正常
      // 根据角色获取有访问权限的路由
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);

      console.log("accessedRoutes==>", accessedRoutes);

      setRoutes(accessedRoutes);
      resolve(accessedRoutes);
      // })
      // .catch((error) => {
      //   reject(error);
      // });
    });
  }

  /**
   * 混合模式获取与激活的顶部菜单项相关的混合模式左侧菜单集合
   */
  const mixLeftMenus = ref<RouteRecordRaw[]>([]);
  function setMixLeftMenus(topMenuPath: string) {
    const matchedItem = routes.value.find((item) => item.path === topMenuPath);
    if (matchedItem && matchedItem.children) {
      mixLeftMenus.value = matchedItem.children;
    }
  }
  return {
    routes,
    setRoutes,
    generateRoutes,
    mixLeftMenus,
    setMixLeftMenus,
  };
});

// 非setup
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
