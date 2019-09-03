/* REVIEW 新增多页打包页面：例（BeeLimit）
  1.page目录下新建目录
  2.复制一份main.js
  3.复制一份index.vue(内含router-view)
  4.在route目录下新增路由文件
  5.在此处新增打包后的HTML配置
*/
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
    title: '我的公益值'
  },
  // 蜂公益行动详情
  beePublic: {
    entry: 'src/pages/BeePublic/main.js',
    title: '公益详情'
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
    title: '​​​​​'
  },
  // 好友代付
  beeReplace: {
    entry: 'src/pages/BeeReplace/main.js',
    title: '好友代付'
  },
  // 客服帮助
  beeHelper: {
    entry: 'src/pages/BeeHelper/main.js',
    title: '客服帮助'
  },
  // 活动模板
  beeActiveTpl: {
    entry: 'src/pages/BeeActiveTpl/main.js',
    title: '加载中...'
  },
  // 完善资料
  beeCompleteInfo: {
    entry: 'src/pages/BeeCompleteInfo/main.js',
    title: '完善资料'
  },
  // 蜂工厂
  beeFactory: {
    entry: 'src/pages/BeeFactory/main.js',
    title: '商家入驻'
  },
  // 关于我们 二维码注册
  beeRegister: {
    entry: 'src/pages/BeeRegister/main.js',
    title: '蜂集市'
  },
  // 公告
  beeAnnouncement: {
    entry: 'src/pages/BeeAnnouncement/main.js',
    title: '公告'
  },
  // 关于集市
  beeAbout: {
    entry: 'src/pages/BeeAbout/main.js',
    title: '关于集市'
  },
  // 新手攻略.
  beeNoviceGuide: {
    entry: 'src/pages/BeeNoviceGuide/main.js',
    title: '新手攻略'
  },
  // 集市课堂
  beeClassroom: {
    entry: 'src/pages/BeeClassroom/main.js',
    title: '集市课堂'
  },
  // 成为达人
  beeTalent: {
    entry: 'src/pages/BeeTalent/main.js',
    title: '成为达人'
  },
  // 经营许可
  beeStoreLicense: {
    entry: 'src/pages/BeeStoreLicense/main.js',
    title: '经营许可'
  },
  // 免费送礼活动
  beeFreeGift: {
    entry: 'src/pages/BeeFreeGift/main.js',
    title: '免费送礼'
  },
  // 农礼包
  beeGiftPackage: {
    entry: 'src/pages/BeeGiftPackage/main.js',
    title: '农礼包'
  },
  // 公益动态
  beeActionList: {
    entry: 'src/pages/BeeActionList/main.js',
    title: '公益动态'
  }
}
