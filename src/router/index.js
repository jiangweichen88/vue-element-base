import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/*
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏中(default is false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，则当item有多个子路由时,
 *                                它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
    roles: ['admin','editor']    控制页面角色(可以设置多个角色)
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'/'el-icon-x' 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    affix: true                  如果设置为true，它则会固定在tags-view中(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示(默认 true
    activeMenu: '/example/list'  当路由设置了该属性，则会高亮相对应的侧边栏。
								   这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
								   点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
*/

/**
 * constantRoutes
没有权限要求的基本页
所有角色均可访问
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () =>
      import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () =>
    import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () =>
    import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () =>
    import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () =>
    import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
      import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
}

]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
// export const asyncRoutes = asyncRoutes;
// store/modules/permission.js文件下

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
