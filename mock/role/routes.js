// Just a mock data

const constantRoutes = [

	{
		path: '/',
		component: 'layout/index',
		redirect: 'dashboard',
		selected: true,
		disabled: true,
		meta: {
			title: 'dashboard',
		},
		children: [{
			path: 'dashboard',
			selected: true,
			disabled: true,
			component: 'views/dashboard/index',
			name: 'Dashboard',
			meta: {
				title: 'dashboard',
				icon: 'dashboard',
				affix: true
			}
		}]
	},
]

const asyncRoutes = [{
		path: '/menu',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'menu',
		selected: true,
		disabled: true,
		meta: {
			title: 'menu',
		},
		children: [{
			path: 'index',
			component: 'views/menu/index',
			name: 'menu',
			selected: true,
			disabled: true,
			meta: {
				title: 'menu',
				roles: ['admin'],
				icon: 'nested'
			},
		}]
	}, {
		path: '/permission',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'Permission',
		selected: true,
		meta: {
			title: 'permission',
		},
		children: [{
				path: 'page',
				component: 'views/permission/page',
				name: 'PagePermission',
				selected: true,
				meta: {
					title: 'pagePermission',
					roles: ['admin'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'directive',
				component: 'views/permission/directive',
				name: 'DirectivePermission',
				selected: true,
				meta: {
					title: 'directivePermission'
					// if do not set roles, means: this page does not require permission
				}
			},
			{
				path: 'role',
				component: 'views/permission/role',
				name: 'RolePermission',
				selected: true,
				meta: {
					title: 'rolePermission',
					roles: ['admin']
				}
			}
		]
	},
	{
		path: '/demo',
		component: 'layout/index',
		redirect: 'noRedirect',
		name: 'demo',
		selected: true,
		meta: {
				title: 'demo',
		},
		children: [{
				path: '/guide', // 引导页
				component: 'views/com/index',
				redirect: 'noRedirect',
				selected: true,
				meta: {
					title: 'guide',
				},
				children: [{
					path: 'index',
					component: 'views/guide/index',
					name: 'Guide',
					selected: true,
					meta: {
						title: 'guide',
						icon: 'guide',
					}
				}]
			},
			{
				path: '/icon',
				component: 'views/com/index',
				selected: true,
				children: [{
					path: 'index',
					component: 'views/demo/icons/index',
					name: 'Icons',
					selected: true,
					meta: {
						title: 'icons',
						icon: 'icon',
					}
				}]
			},
			{
				path: '/demo/example',
				component: 'views/com/index',
				redirect: 'noRedirect',
				name: 'Example',
				selected: true,
				meta: {
					title: 'example',
					icon: 'el-icon-s-help'
				},
				children: [{
						path: 'create',
						component: 'views/demo/example/create',
						name: 'CreateArticle',
						selected: true,
						meta: {
							title: 'createArticle',
							icon: 'edit'
						}
					},
					{
						path: 'edit/:id(\\d+)',
						component: 'views/demo/example/edit',
						name: 'EditArticle',
						selected: true,
						meta: {
							title: 'editArticle',
							noCache: true,
							activeMenu: '/demo/example/list'
						},
						hidden: true
					},
					{
						path: 'list',
						component: 'views/demo/example/list',
						name: 'ArticleList',
						selected: true,
						meta: {
							title: 'articleList',
							icon: 'list'
						}
					}
				]
			},

			{
				path: '/error',
				component: 'views/com/index',
				redirect: 'noRedirect',
				name: 'ErrorPages',
				selected: true,
				meta: {
					title: 'errorPages',
					icon: '404'
				},
				children: [{
						path: '401',
						component: 'views/error-page/401',
						name: 'Page401',
						selected: true,
						meta: {
							title: 'page401',
							noCache: true
						}
					},
					{
						path: '404',
						component: 'views/error-page/404',
						name: 'Page404',
						selected: true,
						meta: {
							title: 'page404',
							noCache: true
						}
					}
				]
			},
			{
				path: 'external-link',
				component: 'views/com/index',
				selected: true,
				children: [{
					path: 'https://github.com/jiangweichen88/vue-element-base',
					selected: true,
					meta: {
						title: 'externalLink',
						icon: 'link'
					}
				}]
			},

			// 404页必须放在最后 !!!
			{
				path: '*',
				redirect: '/404',
				hidden: true,
				selected: true,
			}
		]
	}
]

module.exports = {
	constantRoutes,
	asyncRoutes
}