<!--
 * @Description:
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-14 09:43:22
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar title="瀑布布局"
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <!-- 内容由很多宽相同高不同的div组成 -->
    <div class="content">
      <div class="item"
           v-for="(item,index) in contentList"
           :key="index"
           :style={width:item.width}
           @click="$toast(item.id)">
        <div>{{item.content}}{{item.id}}</div>
        <!-- <div v-if="item.id===1">{{item.content}}</div> -->
        <img v-if="item.img"
             style="width:100%;height:100px"
             :src=item.img
             alt="">
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
      contentList: [
        {
          content: '天不生我李纯罡',
          img: require('@/assets/background/back.jpeg'),
          id: 1
        },
        { content: '50px', id: 2 },
        {
          content: '剑道万古如长夜',
          img: require('@/assets/background/back.jpeg'),
          id: 3
        },
        { content: '60px', id: 4 },
        { content: '70px', id: 5 },
        { content: '110px', id: 6 },
        { content: '80px', id: 7 },
        { content: '110px', id: 8 },
        { content: '90px', id: 9 },
        { content: '110px', id: 10 },
        { content: '80px', id: 11 },
        { content: '110px', id: 12 },
        { content: '100px', id: 13 },
        { content: '60px', id: 14 },
        { content: '100px', id: 15 },
        { content: '70px', id: 16 },
        { content: '100px', id: 17 },
        { content: '90px', id: 18 },
        { content: '100px', id: 19 },
        { content: '110px', id: 20 },
        { content: '100px', id: 21 },
        { content: '110px', id: 22 },
        { content: '80px', id: 23 },
        { content: '110px', id: 24 },
        { content: '60px', id: 25 },
        { content: '110px', id: 26 },
        { content: '90px', id: 27 },
        { content: '110px', id: 28 },
        { content: '100px', id: 29 },
        { content: '80px', id: 30 }
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
    this.waterFall()
  },
  // 方法集合
  methods: {
    // 宽度需相同，高度不同
    waterFall () {
      // 设置container盒子的宽度
      const container = document.getElementsByClassName('content')
      // 设置每项内容
      const item = document.getElementsByClassName('item')
      // 设置单位
      const unit = 'px'
      // 计算出浏览器窗口的宽度
      const clientWidth = document.documentElement.clientWidth
      // 上 左 间距
      const spacing = 10
      // 设置主体宽度
      container[0].style.width = (clientWidth - 2 * spacing) + unit
      const containerWidth = container[0].style.width.split(unit)[0]
      container[0].style.left = spacing + unit
      // 左侧数组
      const leftArr = []
      // 右侧数组
      const rightArr = []
      // 获取元素的宽度(含border，padding)
      const itemWidth = containerWidth / 2
      const heightArr = []
      // 循环盒子分为左右两组
      for (let i = 0; i < item.length; i++) {
        // 每个宽度
        item[i].style.width = itemWidth * 0.95 + unit
        if (i === 0 || i === 1) {
          item[i].style.left = Number(i * itemWidth + Math.floor((itemWidth * 0.05) / 2)) + unit
          item[i].style.marginLeft = Math.floor((itemWidth * 0.05) / 2) + unit
          item[i].style.top = 10
          heightArr.push(item[i].offsetHeight)
        } else {
          const min = Math.min(...heightArr)
          const index = heightArr.indexOf(min)
          item[i].style.left = Number(index * itemWidth + Math.floor((itemWidth * 0.05) / 2)) + unit
          item[i].style.marginLeft = Math.floor((itemWidth * 0.05) / 2) + unit
          item[i].style.top = min + unit
          heightArr[index] += item[i].offsetHeight
        }

        const itemHeight = window.getComputedStyle(item[i]).getPropertyValue('height')
        if (Number(item[i].style.left.split(unit)[0]) === Number(Math.floor((itemWidth * 0.05) / 2))) {
          leftArr.push({ idx: i, height: itemHeight })
        } else {
          rightArr.push({ idx: i, height: itemHeight })
        }
      }
      let leftHeightSum = 0
      leftArr.forEach((itemLeft, indexLeft) => {
        const top = Number((indexLeft) * spacing)
        const leftTop = leftHeightSum + Number(top)
        item[itemLeft.idx].style.top = leftTop + unit
        leftHeightSum = leftHeightSum + Number(window.getComputedStyle(item[itemLeft.idx]).getPropertyValue('height').split(unit)[0])
      })
      let rightHeightSum = 0
      rightArr.forEach((itemRight, indexRight) => {
        const top = Number((indexRight) * spacing)
        const leftTop = rightHeightSum + Number(top)
        item[itemRight.idx].style.top = leftTop + unit
        rightHeightSum = rightHeightSum + Number(window.getComputedStyle(item[itemRight.idx]).getPropertyValue('height').split(unit)[0])
      })
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
    .item {
      height: auto;
      // background-image: url('~@/assets/background/back.jpeg');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: red;
      font-size: 30px;
      position: absolute;
      border: 1px solid red;
      // box-shadow: inset 1px 1px red;
      word-wrap: break-word; // 控制换行
      word-break: break-all; // 控制换行
      overflow: hidden; // 控制换行
    }
    .item:nth-child(10) {
      height: 110px;
    }
    .item:nth-last-child(6) {
      height: 100px;
    }
  }
}
</style>
