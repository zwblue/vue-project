const vuxLoader = require('vux-loader')

module.exports = {
  configureWebpack: config => {
    vuxLoader.merge(config, {
      devServer: {
        open: true
      },
      plugins: ['vux-ui', 'duplicate-style']
    })
  }
}
// 这是用户根据自己的配置新建的
// indexPath Default: 'index.html'
// pages 多页面 详情请关注文档
/*
module.exports = {
  baseUrl: './', // 指定打包输出路径
  outputDir: 'dist', // 指定打包输出路径
  assetsDir: 'assets', // 静态资源目录 default: ''
  filenameHashing: false, // 不随机起名字吧 default: true
  productionSourceMap: false, // 打包map文件  default: true
  css: {
    sourceMap: false, // 打包css-map文件  default: true
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      sass: {
        data: `@import "@/styles/variables.scss";`
      },
      less: {
      },
      stylus: {
      }
    },
    modules: true // css模块化，具体作用未知
  },
  devServer: {
    port: '8088', // default: 8080
    compress: true, // 为所服务的一切启用gzip压缩
    open: 'Google Chrome'
  }
}
*/
