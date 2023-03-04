/*
 * @Description: 经纬度转换
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-10 09:49:19
 * @LastEditors: zhoucheng
 */

/*
 * WGS-84:国标 GPS
 * GCJ:火星坐标 谷歌、腾讯、高德
 * 其他坐标体系:一般都是由GCJ-02进过偏移算法得到的。百度、搜狗
 */
export default class LatlngConversion {
  pi = 3.14159265358979324;
  a = 6378245.0;
  ee = 0.00669342162296594323;
  xpi = this.pi * 3000.0 / 180.0;

  // 高德转百度
  gcjTobd (lat, lon) {
    const z = Math.sqrt(lon * lon + lat * lat) + 0.00002 * Math.sin(lat * this.xpi)
    const theta = Math.atan2(lat, lon) + 0.000003 * Math.cos(lon * this.xpi)

    const bdlon = z * Math.cos(theta) + 0.0065
    const bdlat = z * Math.sin(theta) + 0.006

    console.log(bdlat, bdlon, '高德转百度=>百度')
    return { bdlat, bdlon }
  }

  // 百度转高德
  bdTogcj (lat, lon) {
    const x = lon - 0.0065
    const y = lat - 0.006
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.xpi)
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.xpi)

    const gglon = z * Math.cos(theta)
    const gglat = z * Math.sin(theta)

    console.log(gglat, gglon, '百度转高德=>高德')
    return { gglat, gglon }
  }

  // 高德转到国标
  gcjTowgs (lat, lon) {
    const dLat = this.transformLat(lon - 105.0, lat - 35.0)
    const dLon = this.transformLon(lon - 105.0, lat - 35.0)
    const radLat = lat / 180.0 * this.pi

    const magic = Math.sin(radLat)
    const magicChange = 1 - this.ee * magic * magic

    const sqrtMagic = Math.sqrt(magicChange)

    const dLatChange = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magicChange * sqrtMagic) * this.pi)
    const dLonChange = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi)

    const mgLat = lat + dLatChange
    const mgLon = lon + dLonChange

    const lontitude = lon * 2 - mgLon
    const latitude = lat * 2 - mgLat

    return { latitude, lontitude }
  }

  // 国标转高德
  wgsTogcj (lat, lon) {
    const dLat = this.transformLat(lon - 105.0, lat - 35.0)
    const dLon = this.transformLon(lon - 105.0, lat - 35.0)
    const radLat = lat / 180.0 * this.pi

    const magic = Math.sin(radLat)
    const magicChange = 1 - this.ee * magic * magic

    const sqrtMagic = Math.sqrt(magicChange)

    const dLatChange = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magicChange * sqrtMagic) * this.pi)
    const dLonChange = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi)

    const mgLat = lat + dLatChange
    const mgLon = lon + dLonChange

    return { mgLat, mgLon }
  }

  // 国标转百度
  wgsTobd (lat, lon) {
    const wgsTogcj = this.wgsTogcj(lat, lon)
    return this.gcjTobd(wgsTogcj[0], wgsTogcj[1])
  }

  // 经纬度转换
  transformLat (lat, lon) {
    let ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat))
    ret = this.getRet(lat, lon, ret)
    ret += (160.0 * Math.sin(lon / 12.0 * this.pi) + 320 * Math.sin(lon * this.pi / 30.0)) * 2.0 / 3.0
    return ret
  }

  // 经纬度转换
  transformLon (lat, lon) {
    let ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat))
    ret = this.getRet(lat, lat, ret)
    ret += (150.0 * Math.sin(lat / 12.0 * this.pi) + 300.0 * Math.sin(lat / 30.0 * this.pi)) * 2.0 / 3.0
    return ret
  }

  getRet (lat, lon, ret) {
    ret += (20.0 * Math.sin(6.0 * lat * this.pi) + 20.0 * Math.sin(2.0 * lat * this.pi)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(lon * this.pi) + 40.0 * Math.sin(lon / 3.0 * this.pi)) * 2.0 / 3.0
    return ret
  }
}
