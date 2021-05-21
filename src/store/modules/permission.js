import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/role/asyncRoutes.js'
import demo from '@/role/modules/demo.js'
import { getRoutesObj } from '@/api/role.js'
/* Layout */
import Layout from '@/layout'
import { getRoutes } from '@/api/role'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    //		state.routes = constantRoutes.concat(routes)
    state.routes = routes // 左侧导航数据
  }
}
export function routesSetUrl(data) {
  const a = data.map(item => {
    if (item.children && item.children.length) {
      return {
        ...item,
        component: getViews(item.component),
        children: routesSetUrl(item.children)
      }
    } else {
      return {
        ...item,
        component: getViews(item.component)
      }
    }
  })
  return a
}
export function getViews(path) {
  return resolve => {
    require.ensure([], (require) => {
      resolve(require('@/' + path + '.vue'))
    })
  }
}
const actions = {
  async generateRoutes({
    commit
  }, roles) {
    const data = await getRoutesObj().then(res => {
      const data = res.data
      return data
    })
    let asyncRoutes0
    const abc = await getRoutes() // 请求路由json
    asyncRoutes0 = routesSetUrl(abc.data.filter(item => item.selected))
    const rolesIsArr = Array.isArray(roles) // 参数是否数组
    if (!rolesIsArr) {
      //			asyncRoutes0 = roles.Routes.filter(item =>
      //				item.selected
      //			);
      console.log(roles.Routes)
      asyncRoutes0 = readNodes(roles.Routes, [])
      console.log(asyncRoutes0)
    }
    function readNodes(nodes, arr = []) {
      for (const item of nodes) {
        if (!item.selected) continue
        const obj = { ...item,
          children: []
        }
        arr.push(obj)
        if (item.children && item.children.length) readNodes(item.children, obj.children)
      }
      return arr
    }
    console.log(asyncRoutes0)
    return new Promise(resolve => {
      console.log(resolve)
      let accessedRoutes
      if (rolesIsArr && roles.includes('admin')) {
        accessedRoutes = asyncRoutes0 || []
      } else {
        // accessedRoutes = filterAsyncRoutes(asyncRoutes0, roles)
        accessedRoutes = asyncRoutes0 || []
      }
      console.log(asyncRoutes0, accessedRoutes)
      commit('SET_ROUTES', accessedRoutes) // 决定左侧导航
      resolve(accessedRoutes)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
