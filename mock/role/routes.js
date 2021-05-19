// Just a mock data

const constantRoutes = [

  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: 'layout/Layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: 'views/guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

const asyncRoutes = [
{
		path: '/menu',
		component: 'layout/Layout',
		redirect: '/menu/index',
		name: 'menu',
		meta: {
			title: 'menu',
			icon: 'lock',
		},
		children: [{
			path: 'index',
			component:'/menu/index',
			name: 'menu',
			meta: {
				title: 'menu',
				roles: ['admin'] 
			},
		}]
	}
,{
		path: '/permission',
		component: 'layout/Layout',
		redirect: '/permission/page',
		name: 'Permission',
		meta: {
			title: 'permission',
			icon: 'lock',
			roles: ['admin', 'editor'] // you can set roles in root nav
		},
		children: [{
				path: 'page',
				component: 
					'/permission/page',
				name: 'PagePermission',
				meta: {
					title: 'pagePermission',
					roles: ['admin'] // or you can only set roles in sub nav
				}
			},
			{
				path: 'directive',
				component: 
					'/permission/directive',
				name: 'DirectivePermission',
				meta: {
					title: 'directivePermission'
					// if do not set roles, means: this page does not require permission
				}
			},
			{
				path: 'role',
				component: 
					'/permission/role',
				name: 'RolePermission',
				meta: {
					title: 'rolePermission',
					roles: ['admin']
				}
			}
		]
},
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
