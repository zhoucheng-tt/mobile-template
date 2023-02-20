/*
 * @Description: 请求接口入口
 * @Author: zhoucheng
 * @Github: https://github.com/hzylyh
 * @Date: 2021-03-31 20:39:39
 * @LastEditors: zhoucheng
 */

// 公用方法
import * as commonApi from './commonApi/commonApi.js'

import * as demo from './demo/demo.js'

const install = function (Vue) {
  if (install.installed) {
    return (install.installed = true)
  }
  Object.defineProperties(Vue.prototype, {
    $commonApi: { get () { return commonApi } },
    $demo: { get () { return demo } }
  })
}

export default {
  install
}
