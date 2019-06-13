# Beemarket-Web

## Project setup

```shell
yarn install
```

### Compiles and hot-reloads for development

```shell
yarn run serve
```

### Compiles and minifies for production

```shell
yarn run build
```

### Run your tests

```shell
yarn run test
```

### Lints and fixes files

```shell
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目目录说明

### **src**：项目源码

* api：存放项目接口，根目录为MOCK测试接口，BeeApi为线上接口
* assets：icon与切图等素材文件存放目录
* components：vue项目公共组件存放位置（可能在多个页面都会用到的组件）
* _config：项目打包配置_

* route：vue-router路由文件
* store：vuex文件，用作组件通讯
* style：存放项目基础样式，项目颜色变量样式，less方法等
* utils：公共方法目录

#### **pages** ：项目页面

> 此处根据webpack多页面打包，区分出了需要独立出来的html页面，主页面为index目录。
> 每个需要单独打包的目录下都需要放置main.js和入口app

* BeeArticle —— 相关活动文章详情
* BeeCommonweal —— 公益值页面
* BeeError —— 统一错误页面
* BeeFriends —— 蜂友圈
* BeeGift —— 赠送好友商品，微信打开
* BeeHelper —— 帮助中心
* BeeLogin —— 统一登录界面
* BeePublic —— 蜂公益行动详情
* BeeReplace —— 好友代付
* BeeTask —— 蜂任务
* index —— 蜂集市主页

> * BeeCart —— 购物车列表、 购物车分享  
> * BeeCategory —— 分类列表、二级分类列表、商品详情、立即购买下单、搜索商品、店铺详情
> 赠送好友、好友支付等待、支付订单、用户评价列表
> * BeeDiscover —— 发现活动列表、详情、发现文章列表、详情
> * BeeHome —— 蜂集市首页、蜂集市活动、农副产品、消息中心
> * BeePersion —— 收货地址列表、编辑收货地址、设置、浏览足迹、我的收藏、我的订单、我的 > 分享二维码、个人中心、服务中心

### **dist**：项目编译输出目录

### **public**：项目基础HTML文件，基础ico

### **其他根目录文件为项目基础配置文件**

* vue.config.js：webpack配置文件，主要用于多页配置和项目接口根路径

> 多页应用页面配置在config/pages.js

* eslintrc.js：配置项目风格eslint
* babel.config.js：此处有vuecli3的BUG，需要配置core-js
