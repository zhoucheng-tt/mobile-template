<!--
 * @Description: 车牌输入框显示
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-12-05 09:50:41
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'
       ref="plateNumberInput">
    <div v-for="(item, index) in plateInput"
         :key=index
         :class="index !==7 ? 'item':'itemLast'">
      <input type="text"
             class="iteminput"
             :value="item"
             @click="handleClickItem(index)"
             readonly>
    </div>
  </div>
</template>
<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {},
  data () {
    // 这里存放数据
    return {
      idx: 0, // 默认的idx是第一位
      idxNewVal: 0,
      plateInput: ['', '', '', '', '', '', '', ''], // 车牌输入框
      oldValStyle: 'border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))', // 没触发时的样式
      newValStyle: 'box-shadow :0 0 0px #4158D0 inset', // 触发时的样式
      plateNumber: '' // 车牌组件
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    // 通过监听idx的变化改变状态
    idx (newVal, oldVal) {
      this.$refs.plateNumberInput.children[oldVal].style = this.oldValStyle
      this.$refs.plateNumberInput.children[newVal].style = this.newValStyle
      this.$refs.plateNumberInput.children[newVal].children[0].focus()
      this.patternFirst(newVal)
      this.$emit('idxChange', newVal)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    // 默认进来展示
    this.patternFirst(0)
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
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
    // 车牌第一位正则
    patternFirst (idx) {
      if (idx === 1) {
        const reg = /[^\u4E00-\u9FA5]/
        if (reg.test(this.plateInput[0])) {
          this.plateInput[0] = ''
          this.idx -= 1
          this.$toast({ message: '请选择省份', type: 'error' })
        }
      } else if (idx === 2) {
        const reg = /^[A-Z]+$/
        if (!reg.test(this.plateInput[1])) {
          this.plateInput[1] = ''
          this.idx -= 1
          this.$toast({ message: '车牌第二位必须为字母', type: 'error' })
        }
      }
    },
    // 点击输入框的每项
    handleClickItem (index) {
      // 和父组件双向绑定一个idx
      this.$emit('idxChange', index)
      this.idx = index
      // 点击改变输入框的状态
      this.$refs.plateNumberInput.children[index].style = this.newValStyle
    },
    // 供父组件调用，给输入框赋值
    setInput (val) {
      // 不是删除
      if (val !== '删') {
        // 将键盘点击内容放入输入框
        this.plateInput.splice(this.idx, 1, val)
        // 控制index最大为7
        if (this.idx++ >= 7) {
          this.idx = 7
          this.$refs.plateNumberInput.children[7].children[0].focus()
        }
      } else {
        if (this.plateInput[this.idx] !== '') {
          // 如果要删除的不是空值,就删除当前一个输入框的内容
          this.plateInput.splice(this.idx, 1, '')
        } else {
          // 如果要删除的是空值,就删除前面一个输入框的内容
          this.plateInput.splice(this.idx - 1, 1, '')
        }
        // 控制index最小为0
        if (this.idx-- <= 0) {
          this.idx = 0
          this.$refs.plateNumberInput.children[0].children[0].focus()
        }
      }
      // 拼接输入框中包含的内容
      this.plateNumber = this.plateInput.join('')
      // 数组前七位有没有空格
      if (this.plateInput.slice(0, 7).indexOf('') !== -1) {
        // 有空格
        this.$emit('currentPlateNumber', 'fail')
        // this.$toast({ message: '车牌中不能有空格', type: 'error' })
      } else {
        // 没空格
        // this.$emit('handleButtonDisable', false)
        this.$emit('currentPlateNumber', this.plateNumber)
      }
    },
    // 清空整个车牌输入框
    handleClickRemovePlateNumber () {
      this.plateInput = ['', '', '', '', '', '', '', '']
      this.$refs.plateNumberInput.children[0].children[0].focus()
      this.idx = 0
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.mainbody {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  .item {
    margin: 0 1px;
    .iteminput {
      width: 34px;
      height: 40px;
      text-align: center;
      border: 2px solid #26aefc;
    }
    .iteminput:focus {
      border-width: 2px;
      border: 2px solid green;
    }
  }
  .itemLast {
    position: relative;
    .iteminput {
      width: 34px;
      height: 40px;
      text-align: center;
      border: 2px solid #26aefc;
    }
    .iteminput:focus {
      border: 2px solid green;
    }
  }
  .itemLast::after {
    content: '新能源';
    position: absolute;
    left: 0;
    top: -3px;
    width: 40px;
    text-align: center;
    background: green;
    color: #ffffff;
    font-size: 12px;
    border-radius: 20px;
  }
}
</style>
