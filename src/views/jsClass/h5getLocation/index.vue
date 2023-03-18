<!--
 * @Description: h5获取定位
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-09 19:28:47
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <!-- 百度地图 -->
    <van-row>
      百度地图地址: {{ baiduAddress }} <br />
      百度地图经纬度: ({{ baiduLng }},{{ baiduLat }})
    </van-row>
    <van-button class="buttonItem"
                @click="handleClickBaiduMap">百度地图获取定位</van-button>

    <!-- 高德地图 -->
    <van-row id="amapContainer"></van-row>
    <van-row>
      高德地图地址:{{ gaodeAddress }} <br />
      高德地图经纬度:({{ gaodeLng }},{{ gaodeLat }})
    </van-row>
    <van-button class="buttonItem"
                @click="handleClickGaodeMap">高德地图获取定位</van-button>

    <!-- html5 -->
    <van-row id="h5Container"></van-row>
    <van-row>
      h5地址:{{ h5Address }} <br />
      h5经纬度:({{ h5Lng }},{{ h5Lat }})
    </van-row>
    <van-button class="buttonItem"
                @click="handleClickh5">h5获取定位</van-button>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import LatlngConversion from '@/commonJs/LatlngConversion'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      baiduAddress: '',
      baiduLng: '',
      baiduLat: '',

      amap: null,
      gaodeAddress: '',
      gaodeLng: '',
      gaodeLat: '',

      h5Address: '',
      h5Lng: '',
      h5Lat: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.latLngConversion()
  },
  // 方法集合
  methods: {
    // 坐标转换
    latLngConversion () {
      // 以南京得塔软件科技有限公司为例
      // const latlng = new LatlngConversion()
      // console.log(118.924832, 31.910907, '高德经纬度')
      // console.log(118.931235, 31.917253, '百度经纬度')
      // console.log(latlng, '-----------------')
      // latlng.gcjTobd(118.924832, 31.910907) // 118.93092192061948 31.91709120137742  '高德转百度=>百度'
      // latlng.bdTogcj(118.931235, 31.917253) // 118.9251450419891 31.91106736504723 '百度转高德=>高德'
    },
    // 百度地图获取经纬度
    handleClickBaiduMap () {
      const geolocation = new window.BMap.Geolocation()
      const that = this
      geolocation.getCurrentPosition(function (e) {
        console.log(e)
        that.baiduAddress = e.address.province + e.address.city
        that.baiduLng = e.longitude
        that.baiduLat = e.latitude
      })
    },
    // 高德地图获取经纬度
    handleClickGaodeMap () {
      this.amap = new window.AMap.Map('amapContainer')
      this.amap.plugin(['AMap.Geolocation', 'AMap.Geocoder'])
      // 通过创建实例 从实例中找到内容 市中心经纬度
      console.log(this.amap.w.center)
      this.gaodeLng = this.amap.w.center.lng
      this.gaodeLat = this.amap.w.center.lat
      // 根据ip获取到当前位置的定位（可能需要https）
      // window.AMap.plugin('AMap.Geolocation', function () {
      //   var geolocation = new window.AMap.Geolocation({
      //     enableHighAccuracy: true,
      //     buttonOffset: new window.AMap.Pixel(10, 20),
      //     zoomToAccuracy: true,
      //     buttonPosition: 'RB',
      //     timeout: 10000
      //   })
      //   // 获取当前定位
      //   geolocation.getCurrentPosition()
      //   window.AMap.event.addListener(geolocation, 'complete', onComplete)
      //   window.AMap.event.addListener(geolocation, 'error', onError)
      //   function onComplete (data) {
      //     // data是具体的定位信息
      //     console.log('data是具体的定位信息', data)
      //   }
      //   function onError (data) {
      //     // 定位出错
      //     console.log('定位失败')
      //   }
      // })
    },
    // h5获取当前位置
    handleClickh5 () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition, this.showError)
      } else {
        console.log('该浏览器不支持获取地理位置')
      }
    },
    // h5获取当前位置 正确
    showPosition (position) {
      console.log(position, '成功')
      this.h5lng = position.coords.longitude
      this.h5lat = position.coords.latitude
    },
    // h5获取当前位置 错误
    showError (error) {
      // 会抱nerworkError
      console.log(error, '失败')
    }

  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类，
.mainbody {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .buttonItem {
    width: 93.6%;
    height: 40px;
    background: #43e97b;
    color: #ffffff;
    border-radius: 20px;
    margin-left: 3.2%;
    margin-top: 10px;
  }
}
</style>
