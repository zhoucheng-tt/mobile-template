<!--
 * @Description:单个订单订单详情 singleOrderList
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-09 16:07:05
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTopBack" />
    <van-row class="content">
      <van-row class="contentDiv">
        <van-row class="contentTitle">订单详情</van-row>
        <van-row class="lineItem">
          <van-col class="title">车牌号</van-col>
          <van-col class="detail">{{orderList.plateNumber}}</van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">在停地</van-col>
          <van-col class="detail">{{orderList.parkName}}</van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">泊位号</van-col>
          <van-col class="detail">{{orderList.parkSpaceNumber}}</van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">开始时间</van-col>
          <van-col class="detail">{{orderList.entranceTime}}</van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">停车时长</van-col>
          <van-col class="detail">{{orderList.parkDurationFmt}}</van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">计费规则</van-col>
          <van-col class="detail"
                   style="color:blue">
            <span @click="handleClickBillRuleDetail">查看计费规则详情</span>
          </van-col>
        </van-row>
        <van-row class="lineItem">
          <van-col class="title">收款单位</van-col>
          <van-col class="detail">{{orderList.operate}}</van-col>
        </van-row>
      </van-row>
      <van-row class="contentDiv">
        <van-row class="lineItem"
                 style="margin-bottom:8px">
          <van-col class="title">应收费用</van-col>
          <van-col class="money">
            <span class="needmoney">{{orderList.receivableMoneyAmount}}</span>
            <span v-if="showFree===2"> - </span>
            <span class="freeMoney"
                  v-if="showFree===2">{{orderList.receivableMoneyAmount}}</span>
            <span class="danwei"> 元 </span>
          </van-col>
        </van-row>
      </van-row>
      <van-button class="payButton"
                  @click="handleClickPay">支 付</van-button>
    </van-row>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { timeMinToFmt, differTimeFmt } from '../commonJs/durationTransform'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      orderList: {}, // 订单详情列表
      showFree: 0 // 1是收费 2是免费
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
    // 根据车牌号车牌颜色查询 或者 根据订单编号查询 或者 根据设备编号查询
    // if (JSON.stringify(this.$route.query).includes('plateNumber') &&
    //   JSON.stringify(this.$route.query).includes('numberPlateColorCode')) {

    // } else if (JSON.stringify(this.$route.query).includes('orderSequence')) {

    // } else if (JSON.stringify(this.$route.query).includes('deviceId')) {

    // }

    this.queryOrderList()
  },
  // 方法集合
  methods: {
    // 获取订单详情列表
    queryOrderList () {
      // const info = {
      //   plateNumber: this.$route.query.plateNumber,
      //   numberPlateColorCode: this.$route.query.numberPlateColorCode
      // }
      // this.$demo.demo(info).then(res => {
      //   this.orderList = res.resultEntity
      //   // 查询停车场是否免费
      //   this.queryForFree(res.resultEntity.billingRuleDefId)
      // })
      const orderList = {
        plateNumber: '苏A12345',
        parkName: '南京某地',
        parkSpaceNumber: 'NJ001',
        parkDuration: '1441',
        entranceTime: '2023-01-01 00:00:00',
        leaveTime: '2023-01-01 01:00:00',
        operate: '某收款单位',
        receivableMoneyAmount: '2.00'
      }
      if (orderList.leaveTime === undefined || orderList.leaveTime === '') {
        orderList.parkDurationFmt = timeMinToFmt(orderList.parkDuration)
      } else {
        orderList.parkDurationFmt = differTimeFmt(orderList.entranceTime, orderList.leaveTime)
      }
      this.orderList = orderList
    },
    // 查询该计费规则是否收费
    queryForFree (val) {
      const info = {
        billingRuleDefId: val
      }
      this.$demo.demo(info).then(res => {
        // 1是收费 2是免费
        if (res.resultEntity.chargeStatusCode === 1) {
          this.showFree = 1
        } else if (res.resultEntity.chargeStatusCode === 2) {
          this.showFree = 2
        }
      })
    },
    // 支付按钮
    handleClickPay () {
      if (this.showFree === 1) {
        // 收费
        if (Number(this.orderList.receivableMoneyAmount) !== 0 && this.orderSequence) {
          this.$router.push({
            name: 'choosePayStyle',
            query: {
              payMoney: this.orderList.receivableMoneyAmount,
              payOrder: this.orderSequence,
              plateNumber: this.orderList.plateNumber,
              numberPlateColorCode: this.orderList.numberPlateColorCode
            }
          })
        } else if (Number(this.orderList.receivableMoneyAmount) === 0) {
          const that = this
          const info1 = {
            orderSequence: that.orderSequence
          }
          that.$commonPage.chargeBill(info1).then(response => {
            const _that = that
            _that.orderList.receivableMoneyAmount =
              Number((response.resultEntity.receivableMoneyAmount - response.resultEntity.receivedMoneyAmount) / 100).toFixed(2)

            if (Number(response.resultEntity.receivableMoneyAmount) === 0) {
              _that.$payForParking.completeOrderFreeV2(info1).then(() => {
                _that.$toast('支付成功!')
                _that.$router.push('/parkPayForOthers')
              })
            } else {
              _that.$router.push({
                name: 'choosePayStyle',
                query: {
                  payMoney: _that.orderList.receivableMoneyAmount,
                  payOrder: _that.orderSequence,
                  plateNumber: _that.orderList.plateNumber,
                  numberPlateColorCode: _that.orderList.numberPlateColorCode
                }
              })
            }
          })
        }
      } else if (this.showFree === 2) {
        // 不收费直接返回，订单结束
        const info = {
          orderSequence: this.orderSequence
        }
        this.$payForParking.completeOrderFreeV2(info).then(res => {
          this.$toast('本单免费')
          this.$router.go(-1)
        })
      }
    },
    // 查看计费规则详情
    handleClickBillRuleDetail () {
      // 根据停车场编号查询计费规则
      this.$router.push({
        name: 'billRuleDetail',
        query: { parkId: this.orderList.parkId }
      })
    },
    // 顶部返回按钮
    handleClickTopBack () {
      this.$router.go(-1)
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
.mainbody {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .content {
    width: 100%;
    height: calc(100% - 46px - 20px);
    .contentDiv {
      width: 93.6%;
      background: #ffffff;
      margin: 20px 3.2%;
      padding-top: 12px;
      border-radius: 5px;
      .contentTitle {
        margin: 8px 0 12px 12px;
        font-size: 15px;
        font-weight: 500;
        font-family: PingFang-SC;
        color: #333333;
      }
      .lineItem {
        height: 33.5px;
        line-height: 33.5px;
        display: block;
        font-size: 15px;
        color: #333333;
        .title {
          width: 80px;
          margin-left: 12px;
          font-weight: 400;
          color: #909090;
        }
        .detail {
          width: calc(100% - 80px - 12px);
          min-height: 33.5px;
        }
        .money {
          width: 200px;
          font-size: 20px;
          .needmoney {
            color: #19a9fc;
          }
          .freeMoney {
            color: red;
          }
          .danwei {
            font-size: 16px;
          }
        }
      }
    }
    .payButton {
      width: 93.6%;
      background: #19a9fc;
      margin: 0 3.2%;
      border-radius: 5px;
      font-size: 17px;
      color: #ffffff;
    }
  }
}
</style>
