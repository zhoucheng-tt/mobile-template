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
    <van-nav-bar title="移 动 端"
                 class="navbar" />
    <van-row class="content">
      <!-- 按钮内容 -->
      <van-button class="buttonClassItem"
                  v-for="(item,index) in buttonClassList"
                  :key="index"
                  @click="$router.push({name:item.value,query:{titleName:item.label}})">{{ item.label }}</van-button>
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
      buttonClassList: [
        { label: 'CSS类', value: 'cssClass' },
        { label: 'JS类', value: 'jsClass' },
        { label: '组件类', value: 'componentClass' },
        { label: '停车最小集', value: 'parkingModel' }
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
    padding: 10px 3% 0 3%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .buttonClassItem {
      width: 45%;
      height: 120px;
      background: #43e97b;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 20px;
      color: #ebedee;
      font-size: 20px;
    }
  }
}
</style>
