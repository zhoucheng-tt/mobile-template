<!--
 * @Description:多个订单订单详情
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-09 16:14:27
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTopBack" />
    <!-- 顶部 -->
    <div class="top">
      <div class="top-content"
           style="padding-top:50px">
        <span class="top-content-title">车牌号:</span>
        <span class="top-content-text">{{plateNumber}}</span>
      </div>
      <div class="top-content">
        <span class="top-content-title">车牌颜色:</span>
        <span class="top-content-text">{{plateColor}}</span>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="title">
        <div class="line"></div>
        <div class="title-text">订单信息</div>
      </div>
      <div class="content-bottom-list">
        <van-checkbox-group ref="checkboxGroup"
                            v-model="checkboxGroupResult"
                            @change="checkboxGroupChange">
          <van-row class="list-item"
                   v-for="(item,index) in orderList"
                   :key=index>
            <van-checkbox class="item-checkbox"
                          icon-size="17px"
                          :name="item"
                          shape="square"
                          :disabled="item.orderStatusCode==2">
              <div class="content-top">
                <div class="content-item">
                  <div class="content-item-title">入场时间:</div>
                  <div class="content-item-text">{{item.entranceTime}}</div>
                </div>
                <div class="content-item">
                  <div class="content-item-title">离场时间:</div>
                  <div class="content-item-text">{{item.leaveTime}}</div>
                </div>
                <div class="content-item">
                  <div class="content-item-title">当前状态:</div>
                  <div class="content-item-text"
                       :style="item.orderStatusCode>0?'color:#19A9FC':'color:#FF6C76'">{{item.status}}</div>
                </div>
                <div class="content-item">
                  <div class="content-item-title">停车时长:</div>
                  <div class="content-item-text">{{item.parkDuration}}</div>
                </div>
                <div class="content-item">
                  <div class="content-item-title">停车费用(元):</div>
                  <div class="content-item-text">{{Number(Number(item.totalFee)/100).toFixed(2)}}</div>
                  <div class="details"
                       @click.stop="handleClickDetails(item)">详情</div>
                </div>
              </div>
            </van-checkbox>
          </van-row>
        </van-checkbox-group>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-content">
        <div class="bottom-content-left">
          <van-checkbox v-model="selectAllOrNotAll"
                        class="bottom-checkbox"
                        icon-size="17px"
                        shape="square"
                        @click="changeAll(selectAllOrNotAll)">
            {{selectAllOrNotAll? '全不选':'全选'}}
          </van-checkbox>
        </div>
        <div class="bottom-content-right">
          <span class="text-total">合计:</span>
          <span class="text-totalNumber">{{total}}</span>
          <span class="text-total">元</span>
        </div>
      </div>
      <div class="bottom-button">
        <van-button class="bottom-button-item"
                    @click="handleClickToPay">去支付</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      plateNumber: '',
      plateColor: '',
      numberPlateColorCode: '',
      total: 0,
      selectAllOrNotAll: false,
      checkboxGroupResult: [],
      orderList: [],
      orderIds: [],
      current: this.$dateFmt(new Date(), 'yyyy-MM-dd hh:mm:ss')
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.plateNumber = this.$route.query.plateNumber
    this.plateColor = this.$route.query.plateColor
    this.numberPlateColorCode = this.$route.query.numberPlateColorCode
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.queryOrderList()
  },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    // 点击去支付
    handleClickToPay () {
      if (Number(this.total) === 0) {
        if (this.checkboxGroupResult.length !== 1) {
          // 无订单  全为欠费订单 或 有在停和欠费订单
          this.$toast('请先选择！')
        } else if (this.checkboxGroupResult.length === 1) {
          // 只有在停订单且为零元
          const info = {
            orderSequence: this.checkboxGroupResult[0].orderSequence
          }
          this.$payForParking.completeOrderFreeV2(info).then(() => {
            this.$toast('本单免费')
            this.$router.go(-1)
          })
        }
      } else {
        this.$router.push({
          name: 'choosePayStyle',
          query: {
            orderIds: this.orderIds,
            payMoney: Number(this.total),
            style: '补缴',
            plateNumber: this.plateNumber,
            numberPlateColorCode: this.numberPlateColorCode
          }
        })
      }
    },
    // 获取在停欠费
    queryOrderList () {
      const info = {
        plateNumber: this.$route.query.plateNumber,
        numberPlateColorCode: this.$route.query.numberPlateColorCode
      }
      this.$payOnBehalfDetails.queryInAndLackOrder(info).then(res => {
        for (let i = 0; i < res.resultEntity.length; i++) {
          // 如果无离场时间 需要自己算
          // 支付状态
          if (res.resultEntity[i].orderStatusCode === 1) {
            // 未支付
            res.resultEntity[i].status = '在停'
            res.resultEntity[i].leaveTime = '暂未出场'
          } else if (res.resultEntity[i].orderStatusCode === 2) {
            // 已支付
            res.resultEntity[i].status = '已支付'
            res.resultEntity[i].leaveTime = '暂未出场'
          } else if (res.resultEntity[i].orderStatusCode === -1) {
            // 欠费
            res.resultEntity[i].status = '欠费'
          }

          // 费用
          res.resultEntity[i].totalFee = Number(Number(res.resultEntity[i].receivableMoneyAmount) -
            Number(res.resultEntity[i].receivedMoneyAmount))

          // if (item.leaveTime === null || item.leaveTime === undefined) {
          //   item.status = '在停'
          //   item.leaveTime = '暂未出场'
          // } else {
          //   item.status = '欠费'
          // }
        }
        this.orderList = res.resultEntity
      })
    },
    // 多选组发生改变
    async checkboxGroupChange (names) {
      // 如果订单列表中有一支付订单 不参与全选和全部选
      const list = this.orderList.filter(item => {
        if (item.orderStatusCode !== 2) {
          return item
        }
      })
      if (names.length < list.length) {
        this.selectAllOrNotAll = false
      } else {
        this.selectAllOrNotAll = true
      }

      this.orderIds = []
      let total = 0
      const that = this
      for (let i = 0; i < names.length; i++) {
        // 如果是在停订单需重新计费
        if (names[i].orderStatusCode !== -1) {
          const info = {
            orderSequence: names[i].orderSequence
          }
          const response = await that.$commonPage.chargeBill(info)
          // 当前状态
          if (that.orderList[0].orderStatusCode === 1) {
            that.orderList[0].status = '在停'
          } else if (that.orderList[0].orderStatusCode === 2) {
            that.orderList[0].status = '已支付'
          }
          that.orderList[0].leaveTime = '暂未出场'
          that.orderList[0].receivableMoneyAmount = response.resultEntity.receivableMoneyAmount
          that.orderList[0].receivedMoneyAmount = response.resultEntity.receivedMoneyAmount
          that.orderList[0].totalFee = Number(Number(response.resultEntity.receivableMoneyAmount) -
            Number(response.resultEntity.receivedMoneyAmount))
        }
        total += names[i].totalFee
        that.orderIds.push(names[i].orderSequence)
      }
      this.total = Number(Number(total) / 100).toFixed(2)
    },
    // 全选或全不选
    changeAll (state) {
      this.$refs.checkboxGroup.toggleAll({
        skipDisabled: true,
        checked: state
      })
    },

    // 查询计费规则是否免费
    // async queryBillFreeOrNot (item) {
    //   const info = {
    //     billingRuleDefId: item
    //   }
    //   const res = await this.$payForParking.queryBillingRuleById(info)
    //   return res.resultEntity.chargeStatusCode
    // },

    // 点击订单详情
    handleClickDetails (item) {
      // 欠费
      if (item.orderStatusCode === -1) {
        this.$router.push({
          name: 'lackOrderDetailNoPayBut',
          query: {
            lackOrderDetail: JSON.stringify(item)
          }
        })
      } else {
        this.$router.push({
          name: 'onlineOrderDetailNoPayBut',
          query: {
            plateNumber: item.plateNumber,
            numberPlateColorCode: item.numberPlateColorCode
          }
        })
      }
    },
    // 返回
    handleClickTopBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.mainbody {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .top {
    width: 100%;
    height: 150px;
    background: url('../../../assets/parkCar/topback.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .top-content {
      height: 30px;
      line-height: 30px;
      padding-left: 16px;
      display: flex;
      .top-content-title {
        width: 85px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        opacity: 1;
      }
      .top-content-text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  .content {
    width: calc(100% - 32px);
    height: calc(100% - 120px - 120px - 56px);
    overflow-x: hidden;
    overflow-y: auto;
    margin-left: 16px;
    position: absolute;
    top: 166px;
    background: #ffffff;
    .title {
      width: 100%;
      height: 39px;
      border-bottom: 1px dashed #dddddd;
      display: flex;
      align-items: center;
      position: relative;
      .line {
        width: 2px;
        height: 18px;
        background: #0aa0f4;
        opacity: 1;
        border-radius: 6px;
        margin-left: 3%;
      }
      .title-text {
        width: 50%;
        margin-left: 2%;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        line-height: 0px;
        color: #333333;
        opacity: 1;
      }
    }
    .content-bottom-list {
      width: 100%;
      height: calc(100% - 40px);
      overflow-x: hidden;
      overflow-y: auto;
      .list-item {
        width: 100%;
        height: 170px;
        line-height: 44px;
        border-bottom: 1px solid #dddddd;
        .item-checkbox {
          width: 100%;
          height: 100%;
          display: flex;
          padding-left: 3%;
          align-items: flex-start;
          position: relative;

          /deep/ .van-checkbox__icon {
            margin-top: 8px !important;
          }
          .content-top {
            width: 100%;
            padding-left: 5%;

            .content-item {
              width: 100%;
              height: 33px;
              line-height: 33px;
              display: flex;
              align-items: center;
              .content-item-title {
                width: 110px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #666666;
                opacity: 1;
              }
              .content-item-text {
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                color: #333333;
                opacity: 1;
              }
              .details {
                width: 48px;
                height: 22px;
                border: 1px solid #19a9fc;
                border-radius: 11px;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 400;
                text-align: center;
                line-height: 22px;
                color: #19a9fc;
                position: absolute;
                right: 4%;
                bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 120px;
    background: #ffffff;
    opacity: 1;
    box-shadow: 0px 3px 6px rgba(221, 221, 221, 0.16);
    border-radius: 4px;
    position: absolute;
    bottom: 0;
    .bottom-content {
      width: 100%;
      height: 70px;
      line-height: 70px;
      display: flex;
      align-items: center;
      position: relative;
      .bottom-content-left {
        .bottom-checkbox {
          margin-left: 20px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          opacity: 1;
        }
      }
      .bottom-content-right {
        position: absolute;
        right: 20px;
        .text-total {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          opacity: 1;
        }
        .text-totalNumber {
          margin-left: 10px;
          margin-right: 10px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ff6c76;
          opacity: 1;
        }
      }
    }
    .bottom-button {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .bottom-button-item {
        width: 66%;
        height: 40px;
        border-radius: 20px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        background: #19a9fc;
        opacity: 1;
      }
    }
  }
}
</style>
