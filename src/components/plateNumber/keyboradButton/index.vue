<!--
 * @Description: 车牌键盘显示
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2021-12-05 09:50:36
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <div class="lineOne">
      <div class="lineOneLeft">
        <div class="lineOneLeftText">
          <span @click="handleClickRemoveAll">清 空</span>
        </div>
      </div>
      <div class="lineOneRight">
        <span class="lineOneRightText"
              @click="handleClickClose">关 闭</span>
      </div>
    </div>
    <div class="lineContent">
      <div class="lineTwo">
        <div class="item"
             v-for="(item,index) in showKeyBoard==='province'? keybordProvince.lineFirst:keybordNumberLetter.lineFirst"
             :key="index"
             @click="handleClickItem(item)">
          {{item}}
        </div>
      </div>
      <div class="lineThree">
        <div class="item"
             v-for="(item,index) in showKeyBoard==='province'? keybordProvince.lineSecond:keybordNumberLetter.lineSecond"
             :style="item==='I'||item==='O'?'background:grey;color:#8188181':''"
             :key="index"
             @click="handleClickItem(item)">
          {{item}}
        </div>
      </div>
      <div class="lineFour">
        <div class="item"
             v-for="(item,index) in showKeyBoard==='province'? keybordProvince.lineThird:keybordNumberLetter.lineThird"
             :key="index"
             @click="handleClickItem(item)">
          {{item}}
        </div>
      </div>
      <div class="lineFive">
        <div class="left"
             @click="handleClickChange">
          <span>{{showKeyBoard==='province'?'ABC':'省份'}}</span>
        </div>
        <div class="item"
             v-for="(item,index) in showKeyBoard==='province'? keybordProvince.lineForth:keybordNumberLetter.lineForth"
             :key="index"
             @click="handleClickItem(item)">
          {{item}}
        </div>
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
      showKeyBoard: 'numberLetter', // province  numberLetter
      // 省份
      keybordProvince: {
        lineFirst: ['渝', '津', '晋', '冀', '蒙', '辽', '吉', '黑', '沪', '港'],
        lineSecond: ['苏', '浙', '皖', '闽', '赣', '鲁', '豫', '鄂', '湘', '澳'],
        lineThird: ['使', '粤', '桂', '琼', '京', '川', '贵', '云', '藏', '领'],
        lineForth: ['陕', '甘', '青', '宁', '新', '警', '学', '删']
      },
      // 字母,
      keybordNumberLetter: {
        lineFirst: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        lineSecond: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        lineThird: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        lineForth: ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '删']
      }
    }
  },
  // 方法集合
  methods: {
    // 键盘点击事件
    handleClickItem (item) {
      if (item !== 'I' && item !== 'O') {
        this.$emit('click', item)
      }
    },
    // 键盘省份、ABC切换
    handleClickChange () {
      if (this.showKeyBoard === 'province') {
        this.showKeyBoard = 'numberLetter'
      } else if (this.showKeyBoard === 'numberLetter') {
        this.showKeyBoard = 'province'
      }
    },
    // 供父组件调用省份 ABC切换方法
    handleTypeChange (val) {
      if (val === 0) {
        this.showKeyBoard = 'province'
      } else {
        this.showKeyBoard = 'numberLetter'
      }
    },
    // 清空车牌
    handleClickRemoveAll () {
      this.showKeyBoard = 'province'
      this.$emit('handleClickRemoveAll')
    },
    // 关闭组建
    handleClickClose () {
      this.$emit('handleClickClose')
    }
  }
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.mainbody {
  width: 100%;
  height: 250px;
  .lineOne {
    width: 98%;
    height: 35px;
    line-height: 35px;
    padding: 0 1%;
    display: flex;
    justify-content: space-around;
    .lineOneLeft {
      width: 50%;
      padding-left: 20px;
      .lineOneLeftText {
        float: left;
        font-size: 15px;
      }
    }
    .lineOneRight {
      width: 50%;
      padding-right: 20px;
      .lineOneRightText {
        float: right;
        font-size: 15px;
      }
    }
  }
  .lineContent {
    width: 100%;
    height: calc(100% - 45px);
    padding: 0 1%;
    .lineTwo {
      width: 98%;
      height: 24%;
      margin-top: 0.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 10%;
        height: 46px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1%;
        border-radius: 5px;
      }
    }
    .lineThree {
      width: 98%;
      height: 24%;
      margin-top: 0.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 10%;
        height: 46px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1%;
        border-radius: 5px;
      }
    }
    .lineFour {
      width: 98%;
      height: 24%;
      margin-top: 0.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 10%;
        height: 46px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1%;
        border-radius: 5px;
      }
    }
    .lineFive {
      width: 98%;
      height: 24%;
      margin-top: 0.5%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item {
        width: 10%;
        height: 46px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1%;
        border-radius: 5px;
      }
      .left {
        width: 10%;
        height: 46px;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        border-radius: 5px;
      }
      .right {
        width: 10%;
        height: 46px;
        background: white;
        margin-left: 1%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      }
    }
  }
}
</style>
