const path = require('path')
module.exports = {
  lintOnSave: undefined,
  pages: {
    index: {
      // page 的入口
      entry: 'src/pages/index/main.js'
      // 模板来源
      // template: 'public/index.html',
      // // 在 dist/index.html 的输出
      // filename: 'index.html',
      // // 当使用 title 选项时，
      // // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page',
      // // 在这个页面中包含的块，默认情况下会包含
      // // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // NOTE 新增活动页
    // active: 'src/pages/active/main.js'
  },
  // FIXME 注入全局环境变量BASE_API
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      config.plugin('define').tap(definitions => {
        Object.assign(definitions[0]['process.env'], {
          BASE_API:
            '"http://192.168.0.196:7300/mock/5c9af05716daf1002030e891/BeeMarket-Web"'
        })
        return definitions
      })
    }
    // NOTE 引入less全局变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  }
  // css: {
  //   loaderOptions: {
  //     less: {
  //       data: `@/styles/index/variables.less`
  //     }
  //   }
  // }
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [path.resolve(__dirname, './src/styles/index/variables.less')]
  //   }
  // }
}
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/index/variables.less')]
    })
}
