<!--
 * @Description: 上传图片 uploadSinglePic
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2023-02-20 14:51:47
 * @LastEditors: zhoucheng
-->
<template>
  <div class='mainbody'>
    <van-nav-bar :title=$route.query.titleName
                 left-text="返回"
                 left-arrow
                 @click-left="handleClickTitleLeft" />
    <!-- 上传图片 -->
    <div class="content">
      <van-uploader class="uploadBack"
                    v-model="fileList"
                    :before-read="beforeRead"
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
      fileList: [],
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
  mounted () { },
  // 方法集合
  methods: {
    // 文件读取前
    beforeRead (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      // 图片加载
      reader.onload = () => {
        if (file.type !== 'image/webp') {
          this.$toast('请上传 webp 格式图片')
          return false
        }
      }
      // 加载失败
      reader.onerror = error => {
        console.log(error)
      }
      return true
    },
    // 文件读取完成
    afterRead (file) {
      if (file instanceof Array) {
        file = file[0]
      }
      file.status = 'uploading'
      file.message = '上传中...'
      const self = this
      /* eslint-disable no-new */
      new Compressor(file.file, {
        // 图片压缩
        quality: 0.3,
        success (result) {
          // 将 Blob 对象转换成 File 对象
          result = new window.File([result], result.name, { type: result.type })
          const formData = new FormData()
          formData.append('file', result)
          self.$commonApi.upFile(formData).then(res => {
            file.status = 'done'
            self.picUrl = res.resultEntity
            console.log('图片上传成功', res)
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
      this.picUrl = ''
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
