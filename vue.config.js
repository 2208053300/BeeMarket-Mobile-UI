const path = require('path')
const pageList = require('./config/page')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  pages: pageList,
  configureWebpack: {
    devtool:
      process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            // 删除注释
            output: {
              comments: false
            },
            // 删除console 和 debugger  删除警告
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ]
    }
  },
  // FIXME 注入全局环境变量BASE_API
  chainWebpack: config => {
    // NOTE 引入less全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  // 内网穿透
  devServer: {
    disableHostCheck: true
  },
  // 该插件忽略Babel
  transpileDependencies: [
    'jimp'
  ]
}
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/index/variables.less')]
    })
}
