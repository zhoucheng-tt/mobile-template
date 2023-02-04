<!--
 * @Description:输入框弹窗选择
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-03 15:14:54
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <div class="content">

      <!-- 业务组件 -->
      <fieldSelect v-model="fieldBind"
                   :actionSheetList="actionSheetList"
                   :actionSheetTitle="actionSheetTitle"></fieldSelect>

      <van-button @click="handleClick"
                  class="buttonItem"> 点击 </van-button>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import fieldSelect from './components/fieldSelect.vue'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    fieldSelect
  },
  data () {
    // 这里存放数据
    return {
      titleName: '',

      fieldBind: {},
      actionSheetTitle: '弹窗标题',
      actionSheetList: [
        { name: '样例内容1', code: 1, color: 'red' },
        { name: '样例内容2', code: 2 },
        { name: '样例内容3', code: 3 },
        { name: '样例内容4', code: 4, disabled: true },
        { name: '样例内容5', code: 5 },
        { name: '样例内容6', code: 6 }
      ]

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
  // 方法集合
  methods: {
    handleClick () {
      console.log(this.fieldBind)
    },
    // 点击返回
    handleClickTitleLeft () {
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
//@import url(); 引入公共css类，
.mainbody {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .content {
    width: 100%;
    height: calc(100% - 56px);
    margin-top: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    .buttonItem {
      width: 93.6%;
      height: 40px;
      background: green;
      color: #ffffff;
      border-radius: 20px;
      margin-left: 3.2%;
      margin-top: 10px;
    }
  }
}
</style>
