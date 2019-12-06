// 官网首页
import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeWebIndex'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import { Tab, Tabs, Button, Row, Col, Swipe, SwipeItem } from 'vant'

Vue.use(Tab).use(Tabs).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem)

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
