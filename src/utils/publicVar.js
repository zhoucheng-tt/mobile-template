/*
 * @Description:  把当前的对象挂载到vue的全局
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-12-15 11:13:14
 * @LastEditors: zhoucheng
 */

const publicVar = {
  install (Vue) {
    Vue.prototype.$imgBaseUrl = this.imgBaseUrl
  },
  imgBaseUrl: '/api/operate/upload/imgs/'
}

export default publicVar
