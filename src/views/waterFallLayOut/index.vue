<!--
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-14 09:43:22
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar title="瀑布布局CSS版"
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <div class="content">
      <!-- 内容由很多 宽相同高不同的div组成 -->
      <div class="content-item"
           v-for="(item,index) in contentList"
           :key="index"
           :style={width:item.width,height:item.height}
           @click="$toast(item.id)">
        {{item.id}}
      </div>
    </div>
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
      offsetWidth: 0,
      contentList: [
        { width: '200px', height: '100px', id: 1 },
        { width: '200px', height: '110px', id: 2 },
        { width: '200px', height: '100px', id: 3 },
        { width: '200px', height: '110px', id: 4 },
        { width: '200px', height: '100px', id: 5 },
        { width: '200px', height: '110px', id: 6 },
        { width: '200px', height: '100px', id: 7 },
        { width: '200px', height: '110px', id: 8 },
        { width: '200px', height: '100px', id: 9 },
        { width: '200px', height: '110px', id: 10 },
        { width: '200px', height: '100px', id: 11 },
        { width: '200px', height: '110px', id: 12 },
        { width: '200px', height: '100px', id: 13 },
        { width: '200px', height: '110px', id: 14 },
        { width: '200px', height: '100px', id: 15 },
        { width: '200px', height: '110px', id: 16 },
        { width: '200px', height: '100px', id: 17 },
        { width: '200px', height: '110px', id: 18 },
        { width: '200px', height: '100px', id: 19 },
        { width: '200px', height: '110px', id: 20 },
        { width: '200px', height: '100px', id: 21 },
        { width: '200px', height: '110px', id: 22 },
        { width: '200px', height: '100px', id: 23 },
        { width: '200px', height: '110px', id: 24 },
        { width: '200px', height: '100px', id: 25 },
        { width: '200px', height: '110px', id: 26 },
        { width: '200px', height: '100px', id: 27 },
        { width: '200px', height: '110px', id: 28 },
        { width: '200px', height: '100px', id: 29 },
        { width: '200px', height: '110px', id: 30 }
      ]
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    offsetWidth (val) {
      console.log(val)
      this.waterFall()
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        that.offsetWidth = document.body.offsetWidth
      })()
    }
    // 页面初始化调用
    this.waterFall()
  },
  // 方法集合
  methods: {
    // 宽度需相同，高度不同
    waterFall () {
      // 设置单位
      const unit = 'px'
      // 设置container盒子的宽度
      const container = document.getElementsByClassName('content')
      // 设置每项内容
      const item = document.getElementsByClassName('content-item')
      // 获取元素的宽度(含border，padding)
      const itemWidth = item[0].offsetWidth
      // 计算出浏览器窗口的宽度
      const clientWidth = document.documentElement.clientWidth
      // 计算出应该放几列（向下取整）浏览器的可视区域的宽度 / 一个item元素的宽度 = 一行的排列的元素的个数
      const columnCount = Math.floor(clientWidth / itemWidth)
      // 设置容器的宽度 列数*宽度）
      container[0].style.width = columnCount * itemWidth + unit
      // 每行宽度
      const lineRowWitdh = container[0].style.width.split(unit)[0]
      // 设置整体左边距离
      container[0].style.marginLeft = Number(clientWidth - lineRowWitdh) / 2 + unit
      // 设置每一个item元素的排列位置
      // 第一行整体的top值都是0 后面的依次找上一行高度最小的容器，在它下面进行排列
      const heightArr = []
      for (let i = 0; i < item.length; i++) {
        // 定位第一行的图片
        if (i < columnCount) {
          // 设置第一行的宽度
          item[i].style.width = itemWidth * 0.95 + unit
          item[i].style.left = Number(i * itemWidth + Math.floor((itemWidth * 0.05) / 2)) + unit
          item[i].style.top = 0
          // 第一行的高度
          heightArr.push(item[i].offsetHeight)
        } else {
          // 盒子距离顶部的距离
          for (let j = 0; j < heightArr.length; j++) {
            heightArr[j] = heightArr[j] + 5
          }
          // 第一行之后的 选择总高度最小的列
          const min = Math.min(...heightArr)
          const index = heightArr.indexOf(min)
          item[i].style.left = Number(index * itemWidth + Math.floor((itemWidth * 0.05) / 2)) + unit
          // 将每个元素定位到当前总高度最小的列下
          item[i].style.top = min + unit
          // 设置第二行的宽度
          item[i].style.width = itemWidth * 0.95 + unit
          // 当前定位的元素加入该列
          heightArr[index] += item[i].offsetHeight
        }
      }
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
<style lang='scss' scoped>
//@import url(); 引入公共css类
.mainbody {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  .content {
    width: 100%;
    height: calc(100% - 46px - 10px);
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    .content-item {
      background-image: url('~@/assets/background/back.jpeg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      box-shadow: inset 0px 0px 2px black;
      color: red;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
    }
  }
}
</style>
