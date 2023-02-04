<!--
 * @Description:全选或全不选
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-06 14:14:48
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <!-- 业务组件 -->
    <van-row class="content">
      <van-checkbox-group ref="checkboxGroup"
                          v-model="groupResult"
                          @change="handleChangeGroup">
        <van-row class="content-item"
                 v-for="(item,index) in contentList"
                 :key=index>
          <van-checkbox class="item-checkbox"
                        :name="item"
                        :disabled="item.code===2">
            <van-row class="item-content"> 单个数 ：{{item.number}} 元</van-row>
          </van-checkbox>
        </van-row>
      </van-checkbox-group>
    </van-row>
    <!-- 业务组建 -->
    <van-row class="bottom">
      <van-checkbox class="bottom-checkbox"
                    v-model="selectAllOrNotAll"
                    @click="changeAll(selectAllOrNotAll)"
                    icon-size="16px">{{selectAllOrNotAll? '全不选':'全选'}}</van-checkbox>
      <van-row class="bottom-text">
        <span class="text-total">总数：</span>
        <span class="text-totalNumber"> {{ total }} </span>
        <span class="text-danwei">元</span>
      </van-row>
      <van-row class="bottom-button"
               @click="handleClickNext"> 下一步 </van-row>
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
      titleName: '',

      contentList: [
        { name: '第一项', code: 1, number: 1 },
        { name: '第二项', code: 2, number: 2 },
        { name: '第三项', code: 3, number: 3 },
        { name: '第四项', code: 4, number: 4 }
      ], // 内容数组

      total: 0, // 总数
      selectAllOrNotAll: '', // 全选或全不选
      groupResult: [] // 多选绑定数组
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
    this.titleName = this.$route.query.titleName
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
    // 多选组发生改变
    handleChangeGroup (names) {
      // 需要先过滤 不可选中 的
      const filtetrList = this.contentList.filter(item => {
        if (item.code !== 2) {
          return item
        }
      })

      if (names.length < filtetrList.length) {
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

    // 全选或全不选
    changeAll (state) {
      this.$refs.checkboxGroup.toggleAll({
        skipDisabled: true,
        checked: state
      })
    },
    // 点击下一步
    handleClickNext () {
      if (Number(this.total) === 0) {
        this.$toast('总数不能为0，请先选择')
      } else {
        console.log(this.groupResult)
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
      font-size: 14px;
      color: #333333;
      display: flex;
      justify-content: center;
    }
    .bottom-text {
      width: 50%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      font-size: 14px;
      .text-total {
        color: #333333;
      }
      .text-totalNumber {
        font-size: 18px;
        color: #19a9fc;
      }
      .text-danwei {
        color: #333333;
      }
    }
    .bottom-button {
      width: 30%;
      background: #19a9fc;
      font-size: 17px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
