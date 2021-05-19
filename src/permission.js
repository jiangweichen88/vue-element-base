import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否已经登
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done() //
    } else {
      // 判断用户是否通过getInfo获取了权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // 注意:角色必须是一个对象数组!例如:['admin']或，['developer'，'editor']
          const { roles } = await store.dispatch('user/getInfo')

          // 生成基于角色的可访问路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 动态添加可访问的路由
          router.addRoutes(accessRoutes)

          // hack方法，以确保地址路由是完整的
          // 设置replace: true，这样导航就不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在whitelist中,直接跳转
      next()
    } else {
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
