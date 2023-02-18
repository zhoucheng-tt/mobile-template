<!--
 * @Description:纵向拖拽div
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-20 19:48:10
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <div class="content">
      <draggable v-model="dataList"
                 @end="end">
        <transition-group>
          <div v-for="item in dataList"
               :key="item.key"
               class="item">
            {{item.value}}
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import draggable from 'vuedraggable'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    draggable
  },
  data () {
    // 这里存放数据
    return {
      dataList: [
        {
          key: 1,
          value: 1,
          height: '100px'
        },
        {
          key: 2,
          value: 2,
          height: '110px'
        },
        {
          key: 3,
          value: 3,
          height: '80px'
        },
        {
          key: 4,
          value: 4,
          height: '50px'
        },
        {
          key: 5,
          value: 5,
          height: '60px'
        }
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
    dragstart (val) {
      console.log('触发')
      // console.log(val)
    },
    end () {
      console.log(this.dataList)
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
    height: calc(100% - 46px);
    overflow-x: hidden;
    overflow-y: auto;
    .item {
      width: 94%;
      margin-left: 3%;
      margin-top: 10px;
      height: 40px;
      background: greenyellow;
      color: #000000;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
