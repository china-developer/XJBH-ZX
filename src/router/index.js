import { createRouter, createWebHashHistory } from "vue-router";
export const Layout = () => import("@/layout/index.vue");


// 静态路由
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },

  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/bank",
    children: [
      // {
      //   path: "dashboard",
      //   component: () => import("@/views/dashboard/index.vue"),
      //   name: "Dashboard", // 用于 keep-alive, 必须与SFC自动推导或者显示声明的组件name一致
      //   // https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
      //   meta: {
      //     title: "r1",
      //     icon: "homepage",
      //     affix: true,
      //     keepAlive: true,
      //     alwaysShow: false,
      //   },
      // },
      {
        component: () => import("@/views/banks/index.vue"),
        name: "bank",
        path: "bank",
        meta: {
          alwaysShow: false,
          hidden: false,
          keepAlive: true,
          icon: "bank",
          roles: ["ADMIN"],
          title: "r8"
        }
      },

      {
        path: "401",
        component: () => import("@/views/error/401.vue"),
        meta: { hidden: true },
      },
      {
        path: "404",
        component: () => import("@/views/error/404.vue"),
        meta: { hidden: true },
      },
      {
        path: "/user/setting",
        component: () => import("@/views/usersetting/index.vue"),
        meta: { hidden: true },
      },
      {
        path: "/user/twoface",
        component: () => import("@/views/twoFactorAuth/index.vue"),
        meta: { hidden: true },
      }
    ],
  },
];


/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: "/login" });
}

export default router;
