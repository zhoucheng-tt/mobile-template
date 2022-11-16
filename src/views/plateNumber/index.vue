<!--
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-05 14:30:00
 * @LastEditors: zhoucheng
-->

<template>
  <div class='mainbody'>
    <van-nav-bar :title=titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <div class="content">
      <div class="content-title">
        <div class="line"></div>
        <div class="title-content">请输入车牌缴费</div>
      </div>
      <!-- 车牌组件 -->
      <div class="plateInputDiv">
        <plate-number-input class="plateNumberInput"
                            ref="numInput"
                            v-model="plateNumber"
                            @idxChange='handleClickChangeIndex'
                            @currentPlateNumber='handleShowPlateNumber' />
      </div>
      <div class="content-title">
        <div class="line"></div>
        <div class="title-content">车牌颜色</div>
      </div>
      <van-row class="plateColorDiv">
        <van-row class="plateColorItem"
                 v-for="(item,index) in plateColorList"
                 :key="index"
                 :style="item.code==plateColorCode?`border:2px solid ${colorJson[item.name]}`:''"
                 @click="handleSelect(item)">
          <van-row class="itemLeft"
                   :style="{'background':colorJson[item.name]}"></van-row>
          <span style="margin-left:5px">{{item.name}}</span>
        </van-row>
      </van-row>
      <div class="content-button">
        <van-button class="content-button-item"
                    :disabled=buttonDisable
                    @click="handleClickConfirm">确认</van-button>
      </div>
      <!-- 车牌组件 -->
      <keyborad-button class="keyboradButton"
                       v-show="keyboradButtonShow"
                       ref="keyboard"
                       @handleClickClose="handleClickClose"
                       @handleClickRemoveAll="handleClickRemoveAll"
                       @click="handleKeyboardClick" />
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import plateNumberInput from '@/components/plateNumber/plateNumberInput'
import keyboradButton from '@/components/plateNumber/keyboradButton'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { plateNumberInput, keyboradButton },
  data () {
    // 这里存放数据
    return {
      titleName: '',
      // 车牌颜色
      plateColorList: [
        { code: '2', name: '蓝色' },
        { code: '6', name: '绿色' },
        { code: '5', name: '黑色' },
        { code: '3', name: '黄色' },
        { code: '4', name: '白色' }
      ],
      // 车牌颜色
      colorJson: {
        蓝色: '#5A6DF4',
        绿色: '#009017',
        黑色: '#262628',
        黄色: '#F6C210',
        白色: '#C8CAD8'
      },
      keyboradButtonShow: false, // 车牌键盘显示
      plateNumber: '', // 车牌号
      plateColor: '蓝色', // 车牌颜色
      plateColorCode: '2', // 默认蓝色车牌编码
      buttonDisable: true // 确认按钮
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    // 监听车牌长度变化
    plateNumber () {
      if (this.plateNumber.length < 7) {
        this.buttonDisable = true
        this.plateColorCode = '2'
      }
      if (this.plateNumber.length >= 7) {
        this.buttonDisable = false
      }
      if (this.plateNumber.length === 8) {
        this.plateColor = '绿色'
        this.plateColorCode = '6'
      }
      if (this.plateNumber.length !== 8) {
        this.plateColor = '蓝色'
        this.plateColorCode = '2'
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.titleName = this.$route.query.titleName
    // 给默认值
    // this.$refs.numInput.setInput('渝')
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
    // 确认
    handleClickConfirm () {
      this.$toast.success({
        message: this.plateNumber + '/' + this.plateColorCode
      })
      console.log(this.plateNumber, this.plateColorCode)
    },
    // 选取车牌颜色
    handleSelect (item) {
      if (this.plateNumber.length === 8) {
        this.plateColor = '绿色'
        this.plateColorCode = '6'
      } else {
        this.plateColor = item.name
        this.plateColorCode = item.code
      }
    },
    // 关闭车牌
    handleClickClose () {
      this.keyboradButtonShow = false
    },
    // 清空车牌
    handleClickRemoveAll () {
      this.$refs.numInput.handleClickRemovePlateNumber()
      this.plateNumber = ''
      this.plateColor = '蓝色'
      this.plateColorCode = '2'
    },
    // 获取到车牌的值
    handleShowPlateNumber (val) {
      this.plateNumber = val
    },
    // 获取车牌输入框的 index
    handleClickChangeIndex (val) {
      this.keyboradButtonShow = true
      this.$refs.keyboard.handleTypeChange(val)
    },
    // 键盘点击事件
    handleKeyboardClick (value) {
      this.$refs.numInput.setInput(value) // 将点击的值传入父组件
    },
    // 点击返回
    handleClickTitleLeft () {
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
  overflow-x: hidden;
  overflow-y: hidden;
  .content {
    width: calc(100% - 16px);
    margin: 10px 8px;
    height: 285px;
    background: #ffffff;
    box-shadow: 0px 3px 10px rgba(157, 224, 255, 0.08);
    border-radius: 20px;
    .content-title {
      width: calc(100% - 32px);
      padding: 16px;
      display: flex;
      .line {
        width: 4px;
        height: 22px;
        background: #559efc;
        opacity: 1;
        border-radius: 3px;
      }
      .title-content {
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-left: 8px;
      }
    }
    .plateColorDiv {
      width: 100%;
      height: 30px;
      display: flex;
      align-content: center;
      justify-content: center;
      margin-top: 10px;
      .plateColorItem {
        width: 17.5%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-left: 1%;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #dbdbdb;
      }
      .itemLeft {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    }
    .plateInputDiv {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .plateNumberInput {
        padding-top: 15px;
        background: #ffffff;
      }
    }
    .content-button {
      width: 100%;
      height: 44px;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .content-button-item {
        width: 56%;
        background: linear-gradient(130deg, #43b7fa 0%, #009bf3 100%);
        border-radius: 4px;
        font-size: 17px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        border: none;
      }
    }
  }
  .keyboradButton {
    width: calc(100% - 16px);
    height: 250px;
    border-radius: 15px;
    background: #e2e3e7;
    position: absolute;
    bottom: 0px;
    z-index: 1;
  }
}
</style>
