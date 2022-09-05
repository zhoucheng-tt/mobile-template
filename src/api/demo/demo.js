/*
 * @Description: demo api
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-06-09 14:33:16
 * @LastEditors: zhoucheng
 */
import request from '@/utils/request'

const preFix = '/demo'

export function demo (param) {
  return request({
    url: preFix + '/demo/demo',
    method: 'post',
    data: param
  })
}
