import path from "path-browserify";
import i18n from '@/lang'

// import i18n from '@/lang'
/**
 * 筛选出可供搜索的路由对象
 * @param routes 路由表
 * @param basePath 基础路径，默认为 /
 * @param prefixTitle
 */
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  // 循环 routes 路由
  for (const route of routes) {
    // 创建包含 path 和 title 的 item
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 当前存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    // 动态路由不允许被搜索
    // 匹配动态路由的正则
    const re = /.*\/:.*/
    if (
      route.meta &&
      route.meta.title &&
      !re.exec(route.path) &&
      !res.find(item => item.path === data.path)
    ) {
      const i18ntitle = i18n.global.t(`route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }

    // 存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}


/**
 * 返回所有子路由
 */
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRouters = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}