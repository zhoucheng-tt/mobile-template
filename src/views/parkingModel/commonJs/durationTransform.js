/*
 * @Description: 停车时长 durationTransform
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-01-10 17:13:15
 * @LastEditors: zhoucheng
 */

// 需要先安装依赖 npm install --save moment
import moment from 'moment'

// 停车时长 分钟格式化
export function timeMinToFmt (minutes) {
  let parkDuration
  if (minutes === undefined) {
    parkDuration = `${0}分钟`
  } else if (minutes >= 0 && minutes < 60) {
    parkDuration = `${minutes}分钟`
  } else if (minutes >= 60 && minutes < 1440) {
    if (parseInt(minutes % 60) === 0) {
      parkDuration = `${parseInt(minutes / 60)}小时`
    } else {
      parkDuration = `${parseInt(minutes / 60)}小时
                      ${parseInt(minutes % 60)}分钟`
    }
  } else if (minutes >= 1440) {
    const day = parseInt(minutes / 1440)
    const hour = parseInt((minutes % 1440) / 60)
    const minute = parseInt(minutes % 1440) % 60
    if (hour === 0 && minute === 0) {
      parkDuration = `${day}天`
    }
    if (hour === 0 && minute !== 0) {
      parkDuration = `${day}天 ${minute}分钟`
    }
    if (hour !== 0 && minute === 0) {
      parkDuration = `${day}天 ${hour}小时`
    }
    if (hour !== 0 && minute !== 0) {
      parkDuration = `${day}天 ${hour}小时 ${minute}分钟`
    }
  }
  return parkDuration
}

// 停车时长 时间差
export function differTimeFmt (startTime, endTime) {
  const startTimeFmt = moment(startTime)
  const endTimeFmt = moment(endTime)
  let years = moment.duration(endTimeFmt - startTimeFmt)._data.years
  let months = moment.duration(endTimeFmt - startTimeFmt)._data.months
  let days = moment.duration(endTimeFmt - startTimeFmt)._data.days
  let hours = moment.duration(endTimeFmt - startTimeFmt)._data.hours
  let minutes = moment.duration(endTimeFmt - startTimeFmt)._data.minutes
  // let seconds = moment.duration(endTimeFmt - startTimeFmt)._data.seconds

  years === 0 ? years = '' : years += '年'
  months === 0 ? months = '' : months += '月'
  days === 0 ? days = '' : days += '天'
  hours === 0 ? hours = '' : hours += '小时'
  if (moment.duration(endTimeFmt - startTimeFmt)._milliseconds !== 0) {
    minutes === 0 ? minutes = '' : minutes += '分钟'
  } else {
    minutes = '0分钟'
  }

  const parkStopTime = years + months + days + hours + minutes
  return parkStopTime
}

// 判断间隔时长
export function intervalTimeJudge (startTime, endTime) {
  const startTimeFmt = moment(startTime)
  const endTimeFmt = moment(endTime)

  const milliTime = moment.duration(endTimeFmt - startTimeFmt)._milliseconds
  const intervalTime = milliTime / 1000 / 60 // 单位分钟

  return intervalTime
}
