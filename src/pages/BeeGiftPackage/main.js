import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeGiftPackage'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import {
  List,
  Button,
  Swipe,
  SwipeItem,
  Popup,
  ImagePreview,
  NavBar,
  Icon,
  Stepper,
  Checkbox,
  Cell,
  CellGroup
} from 'vant'

Vue
  .use(List)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Popup)
  .use(ImagePreview)
  .use(NavBar)
  .use(Icon)
  .use(Stepper)
  .use(Checkbox)
  .use(Cell)
  .use(CellGroup)

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
