<!--
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-04 15:44:48
 * @LastEditors: zhoucheng
-->
<template>
  <div class='fieldSelect'>
    <van-field class="fieldSelect-field"
               v-model="fieldBind.name"
               @click="handleClickFieldClick"
               readonly
               placeholder="请选择" />
    <van-action-sheet style="height:40%"
                      v-model="actionSheetShow"
                      :title="actionSheetTitle"
                      :actions="actionSheetList"
                      @select="handleSelectItem"
                      close-on-click-action
                      cancel-text="取消" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // import引入的组件需要注入到对象中才能使用
  model: {
    prop: 'fieldBind',
    event: 'fieldBindEmit'
  },
  props: {
    actionSheetList: {
      type: Array
    },
    actionSheetTitle: {
      type: String
    }
  },
  components: {},
  data () {
    // 这里存放数据
    return {
      fieldBind: {
        name: '',
        code: ''
      },
      actionSheetShow: false
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
  // 方法集合
  methods: {
    // 输入框点击
    handleClickFieldClick () {
      this.actionSheetShow = true
    },
    // 弹出层选中
    handleSelectItem (val) {
      this.fieldBind = val
      this.$emit('fieldBindEmit', val)
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
//@import url(); 引入公共css类
.fieldSelect {
  .fieldSelect-field {
    background: #999999;
  }
}
</style>
