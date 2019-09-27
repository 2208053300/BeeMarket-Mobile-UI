import Vue from 'vue'
import App from './index.vue'
import router from '@/route/lcEnrolling'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import { Toast, Tab, Tabs, Popup, Sticky, Checkbox, NoticeBar, Button, Icon } from 'vant'

Vue
  .use(Toast)
  .use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Sticky)
  .use(Checkbox)
  .use(NoticeBar)
  .use(Button)
  .use(Icon)

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
