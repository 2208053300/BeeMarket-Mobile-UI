import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeFactory'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import { Cell, CellGroup, Uploader, Popup, Picker } from 'vant'

Vue.use(Cell)
  .use(CellGroup)
  .use(Uploader)
  .use(Popup)
  .use(Picker)

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
