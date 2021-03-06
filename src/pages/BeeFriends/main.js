import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeFriends'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import { Popup, Icon, List, Button, Field, NoticeBar, Tab, Tabs, Swipe, SwipeItem } from 'vant'

Vue.use(Popup)
  .use(Icon)
  .use(List)
  .use(Button)
  .use(Field)
  .use(NoticeBar)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

import vueTencentCaptcha from '@carpenter/vue-tencent-captcha'
Vue.use(vueTencentCaptcha)
// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
