import { constantRoutes } from '@/router'
import { getRoutesObj } from '@/api/role.js'
/* Layout */
import Layout from '@/layout'
import { getRoutes } from '@/api/role'
import path from 'path'
import router from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if(route.meta && route.meta.roles) {
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
		if(hasPermission(roles, tmp)) {
			if(tmp.children) {
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
		if(item.children && item.children.length) {
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
		asyncRoutes0 = routesSetUrl(readNodes(abc.data))
		const rolesIsArr = Array.isArray(roles) // 参数是否数组
		if(!rolesIsArr) {
			asyncRoutes0 = routesSetUrl(readNodes(roles.Routes));
			// 动态添加可访问的路由
			router.addRoutes(asyncRoutes0)
//			console.log(asyncRoutes0)
		}

		function readNodes(nodes, arr = []) {
			for(const item of nodes) {
				if(!item.selected) continue
				let obj = { ...item,
				}
				arr.push(obj)
				if(item.children && item.children.length) {
					obj.children=[]
					readNodes(item.children, obj.children)
				}
			}
			return arr
		}
//		console.log(asyncRoutes0)
		return new Promise(resolve => {
			let accessedRoutes
			if(rolesIsArr && roles.includes('admin')) {
				accessedRoutes = asyncRoutes0 || []
			} else {
				// accessedRoutes = filterAsyncRoutes(asyncRoutes0, roles)
				accessedRoutes = asyncRoutes0 || []
			}
			commit('SET_ROUTES', accessedRoutes) // 决定左侧导航
			resolve(accessedRoutes)
		})
	}
}
// 重塑路由结构，使其看起来与侧边栏相同
function generateRoute(routes, basePath = '/') {
	const res = []

	for(let route of routes) {
		// skip some route
		if(route.hidden) {
			continue
		}

		const onlyOneShowingChild = onlyOneShowingChild(route.children, route)

		if(route.children && onlyOneShowingChild && !route.alwaysShow) {
			route = onlyOneShowingChild
		}

		const data = {
			...route,
			...{
				path: path.resolve(basePath, route.path),
				title: route.meta && route.meta.title
			}
		}

		// recursive child routes
		if(route.children) {
			data.children = generateRoute(route.children, data.path)
		}
		res.push(data)
	}
	return res
}

function onlyOneShowingChild(children = [], parent) {
	let onlyOneChild = null
	const showingChildren = children.filter(item => !item.hidden)

	// 当只有一个子路由时，缺省显示该子路由
	if(showingChildren.length === 1) {
		onlyOneChild = showingChildren[0]
		onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
		return onlyOneChild
	}

	// 如果没有子路由要显示，则显示父路由
	if(showingChildren.length === 0) {
		onlyOneChild = { ...parent,
			path: '',
			noShowingChildren: true
		}
		return onlyOneChild
	}

	return false
}
export default {
	namespaced: true,
	state,
	mutations,
	actions
}