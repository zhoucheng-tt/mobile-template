<!--
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-14 20:08:40
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
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
      list: [
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
        { value: '6' },
        { value: '7' },
        { value: '8' },
        { value: '9' },
        { value: '10' },
        { value: '11' },
        { value: '12' },
        { value: '13' },
        { value: '14' },
        { value: '15' },
        { value: '16' },
        { value: '17' },
        { value: '18' },
        { value: '19' },
        { value: '20' },
        { value: '21' },
        { value: '22' },
        { value: '23' },
        { value: '24' },
        { value: '25' },
        { value: '26' },
        { value: '27' },
        { value: '28' },
        { value: '29' },
        { value: '30' }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.titleName = this.$route.query.titleName
  },
  // 方法集合
  methods: {
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
}
</style>
