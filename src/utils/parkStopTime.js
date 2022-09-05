/*
 * @Description: 停车时长
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-01-10 17:13:15
 * @LastEditors: linf
 */
import moment from 'moment'
export default function parkStopTime (currentTime, lastTime) {
  var parkStopTime
  const m1 = moment(lastTime)
  const m2 = moment(currentTime)
  let years = moment.duration(m2 - m1)._data.years
  let months = moment.duration(m2 - m1)._data.months
  let days = moment.duration(m2 - m1)._data.days
  let hours = moment.duration(m2 - m1)._data.hours
  let minutes = moment.duration(m2 - m1)._data.minutes
  // let seconds = moment.duration(m2 - m1)._data.seconds
  years === 0 ? years = '' : years += '年'
  months === 0 ? months = '' : months += '月'
  days === 0 ? days = '' : days += '天'
  hours === 0 ? hours = '' : hours += '小时'
  minutes === 0 ? minutes = '0分钟' : minutes += '分钟'
  parkStopTime = years + months + days + hours + minutes
  return parkStopTime
}
