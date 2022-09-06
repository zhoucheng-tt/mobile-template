<!--
 * @Description: 移动端组件 首页
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-04-09 14:08:54
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <!-- 标题 -->
    <van-nav-bar title="移动端组件"
                 class="navbar" />
    <van-row class="content">
      <!-- 按钮内容 -->
      <van-button class="buttonItem"
                  v-for="(item,index) in buttonList"
                  :key="index"
                  @click="$router.push('/'+item.value)">{{item.label}}</van-button>
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
      buttonList: [
        { label: '车 牌 组 件', value: 'plateNumber' },
        { label: '全选 / 全不选', value: 'selectAllOrNotAll' }
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
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.mainbody {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .navbar {
    width: 100%;
    height: 40px;
  }
  .content {
    width: 100%;
    height: calc(100% - 40px);
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
