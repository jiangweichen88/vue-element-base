/* Layout */
import Layout from '@/layout'
import demo from './modules/demo.js'
export const asyncRoutes = [{
  path: '/menu',
  component: Layout,
  redirect: '/menu/index',
  name: 'menuIndex',
  meta: {
    title: 'menu'
  },
  children: [{
    path: 'index',
    component: () =>
      import('@/views/menu/index'),
    name: 'menu',
    meta: {
      title: 'menu',
      icon: 'nested'
    }
  }]
},
{
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [{
    path: 'page',
    component: () =>
      import('@/views/permission/page'),
    name: 'PagePermission',
    meta: {
      title: 'pagePermission',
      roles: ['admin'] // or you can only set roles in sub nav
    }
  },
  {
    path: 'directive',
    component: () =>
      import('@/views/permission/directive'),
    name: 'DirectivePermission',
    meta: {
      title: 'directivePermission'
      // if do not set roles, means: this page does not require permission
    }
  },
  {
    path: 'role',
    component: () =>
      import('@/views/permission/role'),
    name: 'RolePermission',
    meta: {
      title: 'rolePermission',
      roles: ['admin']
    }
  }
  ]
},
demo
]
