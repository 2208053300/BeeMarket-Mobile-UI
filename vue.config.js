const path = require('path')
const pageList = require('./config/page')
module.exports = {
  lintOnSave: true,
  pages: pageList,
  // FIXME 注入全局环境变量BASE_API
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.plugin('define').tap(definitions => {
        Object.assign(definitions[0]['process.env'], {
          BASE_API:
            // '"http://192.168.0.248:7300/mock/5c9af05716daf1002030e891/BeeMarket-Web"'
            '"https://api2.fengjishi.com.cn"'
        })
        return definitions
      })
    } else {
      config.plugin('define').tap(definitions => {
        Object.assign(definitions[0]['process.env'], {
          BASE_API: '"https://api2.fengjishi.com.cn"'
        })
        return definitions
      })
    }
    // NOTE 引入less全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  // 内网穿透
  devServer: {
    disableHostCheck: true
  }
}
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/index/variables.less')]
    })
}
