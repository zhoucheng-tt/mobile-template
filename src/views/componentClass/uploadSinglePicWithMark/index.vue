<!--
 * @Description:上传带水印的图片
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-03-17 09:48:31
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="$router.go(-1)" />
    <!-- 上传图片 -->
    <div class="content">
      <van-uploader class="uploadBack"
                    v-model="fileList"
                    :after-read="afterRead"
                    @delete="deletePic"
                    max-count="1">
        <van-image v-if="!picUrl"
                   :src="require('@/assets/parkCar/carimg.png')"></van-image>
        <van-image v-else
                   :src="picUrl"></van-image>
      </van-uploader>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// npm install --save compressorjs
import Compressor from 'compressorjs'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      value1: '第一行内容',
      value2: '第二行内容',
      value3: '第三行内容',
      fileList: [],
      contentList: ['第一行内容', '第二行内容', '第三行内容'],
      picUrl: '' // 图片地址
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
  },
  // 方法集合
  methods: {
    // 文件读取完成
    afterRead (file) {
      if (file instanceof Array) {
        file = file[0]
      }
      file.status = 'uploading'
      file.message = '上传中...'

      // base64
      const reader = new FileReader()
      reader.readAsDataURL(file.file)
      reader.onload = () => {
        this.getImgUrl({
          base64: reader.result,
          cb: (base64) => {
            const newForm = file
            newForm.content = base64
            this.upload(newForm)
          }
        })
      }
    },
    // 加水印
    async getImgUrl ({ base64, cb = null }) {
      // 1.图片路径转成canvas
      const tempCanvas = await this.imgToCanvas(base64, 'van-uploader')
      // 2.canvas添加水印
      this.drawWaterMark(tempCanvas, this.contentList)
      // 3.canvas转成img
      this.picUrl = this.convasToImg(tempCanvas)
      // 上传图片
      cb && cb(this.picUrl)
    },
    // 图片路径转成canvas
    async imgToCanvas (base64, className) {
      // 创建img元素
      const img = document.createElement('img')
      img.src = base64
      // 防止跨域引起的 Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
      img.setAttribute('crossOrigin', 'anonymous')
      await new Promise((resolve) => (img.onload = resolve))
      // 创建canvas DOM元素，并设置其宽高和图片一样
      const canvas = document.createElement('canvas')
      canvas.width = document.getElementsByClassName(className)[0].offsetWidth
      canvas.height = document.getElementsByClassName(className)[0].offsetHeight
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
      return canvas
    },
    // 给图片添加水印
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
      arrayX.push(stepPx)
      ctx.save()
      ctx.translate(20, 30) // 画布旋转原点 移到 图片
      if (wmConfig.textArray.length > 3) { // 最多显示三行水印，也可以根据需要自定义
        wmConfig.textArray = wmConfig.textArray.slice(0, 3)
      }
      wmConfig.textArray.forEach((el, index) => {
        const offsetY = fontSize * index + 2
        ctx.fillText(el, arrayX[0], arrayX[0] + offsetY)
      })
      ctx.restore()
    },
    // canvas转成img
    convasToImg (canvas) {
      // 新建Image对象，可以理解为DOM
      var image = new Image()
      // canvas.toDataURL 返回的是一串Base64编码的URL 指定格式 PNG
      image.src = canvas.toDataURL('image/png')
      return image.src
    },
    // base64转file
    dataURItoBlob (base64Data) {
      var byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        // window.atob
        byteString = atob(base64Data.split(',')[1])
      } else {
        // decodeURIComponent
        byteString = unescape(base64Data.split(',')[1])
      }
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
      var ia = new Uint8Array(byteString.length)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    },
    // 上传
    upload (file) {
      // const formData = new FormData()
      // const blob = this.dataURItoBlob(file.content)
      // formData.append('file', blob, 'image.png')
      // this.$commonApi.upFile(formData).then(res => {
      //   file.status = 'done'
      //   this.picUrl = res.resultEntity
      //   console.log('图片上传成功', this.picUrl, this.fileList)
      // }).catch(err => {
      //   file.status = 'failed'
      //   file.message = '上传失败'
      //   console.log('图片上传失败', err)
      // })

      const self = this
      /* eslint-disable no-new */
      new Compressor(file.file, {
        quality: 1,
        success (result) {
          // 二进制
          // const formData = new FormData()
          // const blob = self.dataURItoBlob(file.content)
          // formData.append('file', blob, 'image.png')
          // 二进制
          const formData = new FormData()
          const blob = self.dataURItoBlob(file.content)
          // 将 Blob 对象转换成 File 对象
          result = new window.File([blob], blob.name, { type: blob.type })
          formData.append('file', result, 'image.png')
          // 上传
          self.$commonApi.upFile(formData).then(res => {
            file.status = 'done'
            self.picUrl = res.resultEntity
            // 设置预览
            self.fileList[0].url = file.content
            console.log('图片上传成功', self.picUrl)
          }).catch(err => {
            file.status = 'failed'
            file.message = '上传失败'
            console.log('图片上传失败', err)
          })
        },
        error (err) {
          file.status = 'failed'
          file.message = '图片压缩失败'
          console.log('压缩失败', err)
        }
      })
    },
    // 图片删除
    deletePic () {
      this.fileList = []
      this.picUrl = ''
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
    width: 93.6%;
    height: 245px;
    margin: 20px auto;
    .uploadBack {
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 10px;
      background: #e7eaee;
      /deep/.van-uploader__wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /deep/.van-uploader__preview {
        width: 100%;
        height: 100%;
        margin: 0;
        cursor: pointer;
      }
      /deep/.van-uploader__preview-image {
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
      }
      /deep/.van-uploader__preview-delete {
        width: 20px;
        height: 20px;
      }
      /deep/.van-uploader__preview-delete-icon {
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
