/*
 * @Description: 请求封装
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-05 11:55:29
 * @LastEditors: zhoucheng
 */

import axios from 'axios'
import { Toast } from 'vant'
import router from '../router/index'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.userToken = localStorage.getItem('userToken')
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.resultCode === '3004') {
      router.push('/login')
    }
    if (res.resultCode !== '2000') {
      Toast(res.resultMsg)
      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject(res)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)
export default service
