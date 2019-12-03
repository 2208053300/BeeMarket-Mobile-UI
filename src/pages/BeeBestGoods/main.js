// NOTE 好物优选
import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeBestGoods'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import { Button, Swipe, SwipeItem, Popup, List } from 'vant'

Vue.use(Swipe)
  .use(SwipeItem)
  .use(Popup)
  .use(Button)
  .use(List)

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
