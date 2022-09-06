<!--
 * @Description:全选或全不选
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-06 14:14:48
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar title="全选/全不选"
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <!-- 选择内容 -->
    <van-row class="content">
      <van-checkbox-group ref="checkboxGroup"
                          v-model="checkboxGroupResult"
                          @change="checkboxGroupChange">
        <van-row class="content-item"
                 v-for="(item,index) in contentList"
                 :key=index>
          <van-checkbox class="item-checkbox"
                        icon-size="17px"
                        :name="item">
            <van-row class="item-content"> 单个数 ：{{item.number}} 个</van-row>
          </van-checkbox>
        </van-row>
      </van-checkbox-group>
    </van-row>
    <!-- 底部内容 -->
    <van-row class="bottom">
      <van-checkbox v-model="selectAllOrNotAll"
                    class="bottom-checkbox"
                    icon-size="17px"
                    @click="changeAll(selectAllOrNotAll)">
        {{selectAllOrNotAll? '全不选':'全选'}}
      </van-checkbox>
      <van-row class="bottom-text">
        <span class="text-total">总数：</span>
        <span class="text-totalNumber"> {{total}}</span>
        <span class="text-danwei">个</span>
      </van-row>
      <van-row class="bottom-button"
               @click="handleClickNext">
        下一步
      </van-row>
    </van-row>
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
      // 内容数组
      contentList: [
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 1 }
      ],
      total: 0, // 总数
      selectAllOrNotAll: '', // 全选或全不选
      checkboxGroupResult: [] // 多选绑定数组
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
  beforeCreate () { }, // 生命周期 - 创建之前
  beforeMount () { }, // 生命周期 - 挂载之前
  beforeUpdate () { }, // 生命周期 - 更新之前
  updated () { }, // 生命周期 - 更新之后
  beforeDestroy () { }, // 生命周期 - 销毁之前
  destroyed () { }, // 生命周期 - 销毁完成
  activated () { }, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    // 全选或全不选
    changeAll (state) {
      this.$refs.checkboxGroup.toggleAll(state)
    },
    // 多选组发生改变
    checkboxGroupChange (names) {
      if (names.length < this.contentList.length) {
        this.selectAllOrNotAll = false
      } else {
        this.selectAllOrNotAll = true
      }
      let total = 0
      names.forEach(item => {
        total += Number(item.number)
      })
      this.total = total
    },
    // 点击下一步
    handleClickNext () {
      if (Number(this.total) === 0) {
        this.$toast('总数不能为0，请先选择')
      } else {
        // 所选数组打印
        console.log(this.checkboxGroupResult)
      }
    },
    // 顶部返回
    handleClickTitleLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less' scoped>
.mainbody {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: calc(100% - 70px - 46px);
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    .content-item {
      width: 100%;
      height: 70px;
      background-color: #ffffff;
      border-bottom: 1px solid #e7e8e8;
      display: flex;
      .item-checkbox {
        width: 100%;
        display: flex;
        align-items: center;
        margin-left: 30px;
        .item-content {
          width: 100%;
          margin-left: 50px;
        }
      }
    }
  }
}
.bottom {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: white;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  .bottom-checkbox {
    width: 20%;
    height: 100%;
    font-size: 15px;
    color: #333333;
    display: flex;
    justify-content: center;
  }
  .bottom-text {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .text-total {
      font-size: 13px;
      color: #666666;
    }
    .text-totalNumber {
      font-size: 19px;
      color: #19a9fc;
      text-align: right;
    }
    .text-danwei {
      font-size: 15px;
      color: #333333;
    }
  }
  .bottom-button {
    width: 30%;
    height: 100%;
    font-size: 17px;
    color: #ffffff;
    background: #19a9fc;
    text-align: center;
  }
}
</style>
