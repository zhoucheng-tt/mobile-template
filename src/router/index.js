/*
 * @Description:巡检员端 路由 注册页面
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-04-08 13:45:18
 * @LastEditors: zhoucheng
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    redirect: '/homePage',
    meta: {
      name: '重定向页面'
    }
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import('@/views/homePage/index.vue'),
    meta: { name: '首页', type: 'list' }
  },
  {
    path: '/plateNumber',
    name: 'plateNumber',
    component: () => import('@/views/plateNumber/index.vue'),
    meta: { name: '车牌组件', type: 'list' }
  }

]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 需要绑定停车场才能进入以下路径
  const path = ['/outCharge', '/register', '/parkingOrder', '/signIn']
  if (path.indexOf(to.path) !== -1) {
    // 判断是否绑定停车场v
    if (!Vue.prototype.$cookie.get('managePark')) {
      Toast('请先绑定停车场')
      next('/homePage')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
