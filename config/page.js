// NOTE 多页应用打包

module.exports = {
  // 主页
  index: {
    // page 的入口
    entry: 'src/pages/index/main.js',
    // // 当使用 title 选项时，
    // // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    title: '蜂集市'
    // 模板来源
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // template: 'public/index.html',
    // // 在 dist/index.html 的输出
    // filename: 'index.html',
    // // 在这个页面中包含的块，默认情况下会包含
    // // 提取出来的通用 chunk 和 vendor chunk。
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
  },
  // 蜂任务
  beeTask: {
    entry: 'src/pages/BeeTask/main.js',
    title: '蜂任务'
  },
  // 赠送好友
  beeGift: {
    entry: 'src/pages/BeeGift/main.js',
    title: '赠送好友'
  },
  // 蜂公益值
  beeCommonweal: {
    entry: 'src/pages/BeeCommonweal/main.js',
    title: '蜂公益值'
  },
  // 蜂公益行动详情
  beePublic: {
    entry: 'src/pages/BeePublic/main.js',
    title: '行动详情'
  },
  // 文章详情
  beeArticle: {
    entry: 'src/pages/BeeArticle/main.js',
    title: '文章详情'
  },
  // 限量蜂抢
  beeLimit: {
    entry: 'src/pages/BeeLimit/main.js',
    title: '限量蜂抢'
  },
  // 蜂友圈
  beeFriends: {
    entry: 'src/pages/BeeFriends/main.js',
    title: '蜂友圈'
  },
  // 好友代付
  beeReplace: {
    entry: 'src/pages/BeeReplace/main.js',
    title: '好友代付'
  }
}
