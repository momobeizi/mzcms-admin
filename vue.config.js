const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    // 自动打开浏览器
    open: true,
    host: 'localhost',
    // 端口
    port: 3001,
    // 使用代理
    proxy: {
      '/api': {
        // 目标代理服务器地址
        target: 'http://localhost:3000/',
        // 开启代理，本地创建一个虚拟服务器 允许跨域
        changeOrigin: true,
      },
    },
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'MZCms内容管理系统'
        return args
      })
  },
})
