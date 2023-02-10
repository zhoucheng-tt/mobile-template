/*
 * @Description: 全局配置文件
 * @Author: zhoucheng
 * @Github: https://github.com/zhoucheng-tt
 * @Date: 2022-09-05 11:57:26
 * @LastEditors: zhoucheng
 */

const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://192.168.1.228:10001/', // 不可为空
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      AMap: 'AMap', // 高德地图配置
      AMapUI: 'AMapUI'
    },
    name: 'mobile-template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            hack: 'true; @import "@/styles/index.less";'
          }
        }
      }
    }
  }
}
