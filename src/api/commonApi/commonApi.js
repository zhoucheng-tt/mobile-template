/*
 * @Description:公用api commonApi
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-20 14:43:37
 * @LastEditors: zhoucheng
 */
import request from '@/utils/request'

// 上传图片
export function upFile (param) {
  return request({
    url: '/operate/file/upFile',
    method: 'post',
    data: param
  })
}
