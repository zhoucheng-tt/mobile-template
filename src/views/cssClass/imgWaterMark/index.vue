<!--
 * @Description:图片水印
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-11-19 22:26:24
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <div id="img"
         style="width:100;height:100"></div>
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
    this.run()
  },
  // 方法集合
  methods: {
    // 运行
    async run () {
      const imgUrl = require('@/assets/background/back.jpeg')
      // 1.图片路径转成canvas
      const tempCanvas = await this.imgToCanvas(imgUrl)
      // 2.canvas添加水印
      this.drawWaterMark(tempCanvas, ['人间会一如平常'])
      // 3.canvas转成img
      const img = this.convasToImg(tempCanvas)
      // 查看效果
      document.getElementById('img').appendChild(img, 0, 0, tempCanvas.width, tempCanvas.height)
    },
    // 图片路径转成canvas
    async imgToCanvas (url) {
      // 创建img元素
      const img = document.createElement('img')
      img.src = url
      // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
      img.setAttribute('crossOrigin', 'anonymous')
      await new Promise((resolve) => (img.onload = resolve))
      // 创建canvas DOM元素，并设置其宽高和图片一样
      const canvas = document.createElement('canvas')
      canvas.width = 414
      canvas.height = 300
      canvas.getContext('2d').drawImage(img, 0, 0, 414, 300)
      return canvas
    },
    drawWaterMark (canvas, textArray) {
      const ctx = canvas.getContext('2d')
      const wmConfig = {
        font: 'microsoft yahei',
        textArray: textArray,
        density: 2.5
      }
      const fontSize = 20
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      ctx.fillStyle = 'white'
      ctx.font = `${fontSize}px ${wmConfig.font}`
      ctx.lineWidth = 1
      ctx.fillStyle = 'rgba(255,255,255,1)'
      ctx.textAlign = 'left'
      ctx.textBaseline = 'middle'
      const maxPx = Math.max(imgWidth, imgHeight)
      const stepPx = Math.floor(maxPx / wmConfig.density)
      const arrayX = [0]// 初始水印位置 canvas坐标 0 0 点
      while (arrayX[arrayX.length - 1] < maxPx / 2) {
        arrayX.push(arrayX[arrayX.length - 1] + stepPx)
      }
      arrayX.push(...arrayX.slice(1, arrayX.length).map((el) => {
        return -el
      }))

      for (let i = 0; i < arrayX.length; i++) {
        for (let j = 0; j < arrayX.length; j++) {
          ctx.save()
          ctx.translate(imgWidth / 2, imgHeight / 2) /// 画布旋转原点 移到 图片中心
          ctx.rotate(-Math.PI / 5)
          if (wmConfig.textArray.length > 3) { // 最多显示三行水印，也可以根据需要自定义
            wmConfig.textArray = wmConfig.textArray.slice(0, 3)
          }
          wmConfig.textArray.forEach((el, index) => {
            const offsetY = fontSize * index + 2
            ctx.fillText(el, arrayX[i], arrayX[j] + offsetY)
          })
          ctx.restore()
        }
      }
    },
    // canvas转成img
    convasToImg (canvas) {
      // 新建Image对象，可以理解为DOM
      var image = new Image()
      // canvas.toDataURL 返回的是一串Base64编码的URL
      // 指定格式 PNG
      image.src = canvas.toDataURL('image/png')
      return image
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
