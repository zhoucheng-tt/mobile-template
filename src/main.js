/*
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-05 11:05:12
 * @LastEditors: zhoucheng
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import './styles/index.less'
import api from './api/index'
import publicVar from './utils/publicVar'

import dateFmt from './utils/dateFmt'
Vue.prototype.$dateFmt = dateFmt

Vue.use(api)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(publicVar)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
