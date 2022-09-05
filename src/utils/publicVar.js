/*
 * @Description: 图片开发票url
 * @Author: zhoucheng
 * @Github:
 * @Date: 2021-06-15 11:13:14
 * @LastEditors: zhoucheng
 */

const publicVar = {
  install (Vue) {
    // 把当前的对象挂载到vue的全局
    Vue.prototype.$imgBaseUrl = this.imgBaseUrl
  },
  imgBaseUrl: '/api/operate/upload/imgs/'
}

export default publicVar
