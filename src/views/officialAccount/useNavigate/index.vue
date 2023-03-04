<!--
 * @Description:公众号导航
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-03-01 11:53:19
 * @LastEditors: zhoucheng
-->
<template>
  <div class="mainbody">
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTopBack" />
    <van-button class="navigateButton"
                @click="navigate()">导 航</van-button>
  </div>
</template>

<script>
import wx from 'weixin-jsapi'
export default {
  components: {},
  data () {
    return {
      spointx: '', // 当前位置经度
      spointy: '', // 当前纬度
      longitude: '', // 终点经度
      latitude: '', // 终点纬度

      url: '',
      signature: '',
      timestamp: '',
      nonceStr: '',
      openid: '',
      code: '',
      userToken: '',
      ordinaryMemberId: '',
      parkingLotList: [],
      // 当前位置
      location: ''
    }
  },
  mounted () {
    this.code = this.getQueryString('code')
    console.log(this.code)
    this.currentPosi()

    sessionStorage.setItem('code', this.code)
    this.login()
    this.createSignature()
  },
  methods: {
    // 截取code
    getQueryString (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      const r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    //  // 获取code
    //  getWeChatCode () {
    //   var page = this.getQueryString('page')
    //   location.replace(
    //     'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa0ccb4f988931c11&redirect_uri=https://cqpark-test.datatachina.com/official/%23/' + page + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
    //   )
    // },
    // getQueryString (name, search) {
    //   search = search || window.location.search.substr(1) || window.location.hash.split('?')[1]
    //   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    //   const r = search.match(reg)
    //   if (r != null) return unescape(r[2]); return null
    // }
    // 获取当前位置
    currentPosi () {
      const that = this
      const map = new window.AMap.Map('container', {
        resizeEnable: true
      })
      window.AMap.plugin('AMap.Geolocation', function () {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 10000, // 超过10秒后停止定位，默认：5s
          buttonPosition: 'RB', // 定位按钮的停靠位置
          buttonOffset: new window.AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
        })
        map.addControl(geolocation)
        geolocation.getCurrentPosition(function (status, result) {
          if (status === 'complete') {
            console.log(result)
            onComplete(result)
            that.queryParkInfo()
          }
        })
      })
      // 解析定位结果
      function onComplete (data) {
        that.spointx = data.position.lng
        that.spointy = data.position.lat
      }
    },
    //  停车场信息查询
    queryParkInfo () {
      this.$homePage.queryParkRealtimeMonitorList({}).then(res => {
        // 查询距离
        const localPosition = [
          parseFloat(this.spointx),
          parseFloat(this.spointy)
        ]
        this.parkingLotList = res.resultEntity[0]
        const position = [this.parkingLotList.lng, this.parkingLotList.lat]
        this.parkingLotList.distance = Math.round(
          Number(window.AMap.GeometryUtil.distance(localPosition, position)) / 1000
        )
      })
    },
    login () {
      const param = {
        code: this.code
      }
      this.$homePage.oauth2GetOpenidWithToken(param).then(response => {
        const userInfo = response.resultEntity
        const openid = response.resultEntity.openid
        const userToken = response.resultEntity.userToken
        const ordinaryMemberId = response.resultEntity.ordinaryMemberId
        // 保存用户信息
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        // 单独保存openid
        sessionStorage.setItem('openid', openid)
        this.openid = openid
        // 单独保存userToken
        localStorage.setItem('userToken', userToken)
        // 单独保存用户编号
        localStorage.setItem('ordinaryMemberId', ordinaryMemberId)
      })
    },
    // 微信签名查询接口
    createSignature () {
      this.url = location.href.split('#')[0]
      // 通过location.href.split("#")[0]截取之后的url
      this.$homePage.createSignature(this.url).then(res => {
        // 将返回的签名存放起来
        localStorage.setItem('signature', res.resultEntity[0])
        this.signature = localStorage.getItem('signature')
        // 将返回的随机串存放起来
        localStorage.setItem('nonceStr', res.resultEntity[1])
        this.nonceStr = localStorage.getItem('nonceStr')
        // 将返回的时间戳存放起来
        localStorage.setItem('timestamp', res.resultEntity[2])
        this.timestamp = localStorage.getItem('timestamp')
        // 调用微信配置接口接口
        this.wxConfig()
      })
    },
    // 配置微信接口
    wxConfig () {
      wx.config({
        // debug: true,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxa0ccb4f988931c11', // 必填，公众号的唯一标识
        timestamp: parseInt(localStorage.getItem('timestamp')), // 必填，生成签名的时间戳 注意:需要转成int类型
        nonceStr: localStorage.getItem('nonceStr'), // 必填，生成签名的随机串
        signature: localStorage.getItem('signature'), // 必填，签名
        jsApiList: ['openLocation'] // 必填，需要使用的JS接口列表 这里需要使用使用微信内置地图查看位置接口.获取地理位置接口 jssdk中的8.1 8.2
      })
    },
    //  导航
    navigate () {
      // alert(localStorage.getItem("signature"));
      this.wxConfig()
      const latitude = this.parkingLotList.lat
      const longitude = this.parkingLotList.lng
      const address = this.parkingLotList.address
      //  调用微信接口获取地理位置接口
      wx.ready(function () {
        // 使用微信内置地图查看位置接口
        wx.openLocation({
          latitude: parseFloat(latitude), // 纬度，浮点数，范围为90 ~ -90
          longitude: parseFloat(longitude), // 经度，浮点数，范围为180 ~ -180。
          address: address, // 地址详情说明
          scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
          name: address // 位置名
          // fail: function(res) {
          //   alert(JSON.stringify(res));
          // }
          // 在查看位置界面底部显示的超链接,可点击跳转
          // infoUrl: ""
        })
      })
    },
    // 顶部返回按钮
    handleClickTopBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.mainbody {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .navigateButton {
    width: 94%;
    height: 40px;
    margin-left: 3%;
    background: #43e97b;
    color: #ebedee;
    font-size: 13px;
    border-radius: 10px;
  }
}
</style>
