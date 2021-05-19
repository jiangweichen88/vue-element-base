import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/role/asyncRoutes.js'
import demo from '@/role/modules/demo.js'
import { getRoutesObj } from '@/api/role.js'
/* Layout */
import Layout from '@/layout'
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
    state.routes = constantRoutes.concat(routes)
  }
}
export function routesSetUrl(data) {
  const a = data.map(item => {
    return {
      ...item,
      component: Layout,
      children: item.children && item.children.length ? item.children.map(item2 => {
        return {
          ...item2,
          component: getViews(item2.component)
        }
      }) : []
    }
  })
  //	console.log(a)
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
    console.log(asyncRoutes, data.asyncRoutes)
    let asyncRoutes0
    const a = [{
      path: '/icon',
      children: [{
        path: 'index',
        component: 'views/icons/index',
        name: 'Icons',
        meta: {
          title: 'icons',
          icon: 'icon',
          roles: ['admin']
          //					noCache: true
        }
      }]
    },
    {
      path: '/icon2',
      component: Layout,
      children: [{
        path: 'index',
        component: 'views/icons2/index',
        name: 'Icons2',
        meta: {
          title: 'icons2',
          icon: 'icon'
          //					noCache: true
        }
      }]
    }
    ]
    //		let b = [{
    //			path: '/icon',
    //			component: Layout,
    //			children: [{
    //				path: 'index',
    //				component: () =>
    //					import('@/views/icons/index'),
    //				name: 'Icons',
    //				meta: {
    //					title: 'icons',
    //					icon: 'icon',
    //					noCache: true
    //				}
    //			}]
    //		}]
    asyncRoutes0 = routesSetUrl(a)
    asyncRoutes0 = asyncRoutes
    //      asyncRoutes0 = b;
    return new Promise(resolve => {
      console.log(resolve)
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes0 || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes0, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
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
