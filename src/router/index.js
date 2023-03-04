/*
 * @Description:巡检员端 路由 注册页面
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-04-08 13:45:18
 * @LastEditors: zhoucheng
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

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
  // CSS
  {
    path: '/cssClass',
    name: 'cssClass',
    component: () => import('@/views/cssClass/index.vue'),
    meta: { name: 'css类', type: 'list' }
  },
  {
    path: '/waterFallLayOut',
    name: 'waterFallLayOut',
    component: () => import('@/views/cssClass/waterFallLayOut/index.vue'),
    meta: { name: '瀑布布局', type: 'list' }
  },
  {
    path: '/imgWaterMark',
    name: 'imgWaterMark',
    component: () => import('@/views/cssClass/imgWaterMark/index.vue'),
    meta: { name: '图片水印', type: 'list' }
  },
  // JS
  {
    path: '/jsClass',
    name: 'jsClass',
    component: () => import('@/views/jsClass/index.vue'),
    meta: { name: 'js类', type: 'list' }
  },
  {
    path: '/longitudeDragDiv',
    name: 'longitudeDragDiv',
    component: () => import('@/views/jsClass/longitudeDragDiv/index.vue'),
    meta: { name: '纵向拖拽盒子', type: 'list' }
  },
  {
    path: '/longitudinalShuffling',
    name: 'longitudinalShuffling',
    component: () => import('@/views/jsClass/longitudinalShuffling/index.vue'),
    meta: { name: '纵向轮播', type: 'list' }
  },
  {
    path: '/h5getLocation',
    name: 'h5getLocation',
    component: () => import('@/views/jsClass/h5getLocation/index.vue'),
    meta: { name: '获取定位', type: 'list' }
  },
  // component
  {
    path: '/componentClass',
    name: 'componentClass',
    component: () => import('@/views/componentClass/index.vue'),
    meta: { name: '组件类', type: 'list' }
  },
  {
    path: '/plateNumber',
    name: 'plateNumber',
    component: () => import('@/views/componentClass/plateNumber/index.vue'),
    meta: { name: '车牌组件', type: 'list' }
  },
  {
    path: '/selectAllOrNotAll',
    name: 'selectAllOrNotAll',
    component: () => import('@/views/componentClass/selectAllOrNotAll/index.vue'),
    meta: { name: '全选/全不选', type: 'list' }
  },
  {
    path: '/inputPopupSelect',
    name: 'inputPopupSelect',
    component: () => import('@/views/componentClass/inputPopupSelect/index.vue'),
    meta: { name: '输入框弹窗选择', type: 'list' }
  },
  {
    path: '/uploadSinglePic',
    name: 'uploadSinglePic',
    component: () => import('@/views/componentClass/uploadSinglePic/index.vue'),
    meta: { name: '单个图片上传', type: 'list' }
  },
  // 停车模块
  {
    path: '/parkingModel',
    name: 'parkingModel',
    component: () => import('@/views/parkingModel/index.vue'),
    meta: { name: '停车模块', type: 'list' }
  },
  {
    path: '/singleOrderList',
    name: 'singleOrderList',
    component: () => import('@/views/parkingModel/singleOrderList/index.vue'),
    meta: { name: '单个订单订单详情', type: 'list' }
  },
  {
    path: '/multipleOrderList',
    name: 'multipleOrderList',
    component: () => import('@/views/parkingModel/multipleOrderList/index.vue'),
    meta: { name: '多个订单订单详情', type: 'list' }
  },
  {
    path: '/billRuleDetail',
    name: 'billRuleDetail',
    component: () => import('@/views/parkingModel/billRuleDetail/index.vue'),
    meta: { name: '计费规则详情', type: 'list' }
  },
  // 微信公众号
  {
    path: '/officialAccount',
    name: 'officialAccount',
    component: () => import('@/views/officialAccount/index.vue'),
    meta: { name: '微信公众号', type: 'list' }
  },
  {
    path: '/useNavigate',
    name: 'useNavigate',
    component: () => import('@/views/officialAccount/useNavigate/index.vue'),
    meta: { name: '导航', type: 'list' }
  },
  // test
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test/index.vue'),
    meta: { name: 'test', type: 'list' }
  }
]

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL
})

// 全局路由守卫
// router.beforeEach((to, from, next) => {
// // 需要绑定停车场才能进入以下路径
// const path = ['/outCharge', '/register', '/parkingOrder', '/signIn']
// if (path.indexOf(to.path) !== -1) {
//   // 判断是否绑定停车场
//   if (!Vue.prototype.$cookie.get('managePark')) {
//     Toast('请先绑定停车场')
//     next('/homePage')
//   } else {
//     next()
//   }
// } else {
//   next()
// }
// })

export default router
