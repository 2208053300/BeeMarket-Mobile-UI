import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeTask'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import {
  Icon,
  Button,
  Popup,
  NoticeBar,
  Dialog,
  Cell,
  CellGroup,
  Switch,
  Checkbox,
  CheckboxGroup,
  Field
} from 'vant'

Vue.use(Icon)
  .use(Button)
  .use(Popup)
  .use(NoticeBar)
  .use(Dialog)
  .use(Cell)
  .use(CellGroup)
  .use(Switch)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Field)

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
