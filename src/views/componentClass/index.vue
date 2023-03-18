<!--
 * @Description:组件类 componentClass
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-20 19:51:47
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)"
                 class="navbar" />
    <van-row class="content">
      <van-button class="buttonItem"
                  v-for="(item,index) in buttonList"
                  :key="index"
                  @click="$router.push({name:item.value,query:{titleName:item.label}})">{{item.label}}</van-button>
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
        { label: '全选 / 全不选', value: 'selectAllOrNotAll' },
        { label: '输入框弹窗选择', value: 'inputPopupSelect' },
        { label: '上传单个图片', value: 'uploadSinglePic' },
        { label: '上传单个图片带水印', value: 'uploadSinglePicWithMark' }
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
  },
  // 方法集合
  methods: {

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
      background: #43e97b;
      color: #ebedee;
      border-radius: 20px;
      border: none;
      margin-left: 3.2%;
      margin-top: 10px;
    }
  }
}
</style>
