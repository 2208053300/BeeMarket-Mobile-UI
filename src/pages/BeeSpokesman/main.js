import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeSpokesman'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

// Vue.use(VueAwesomeSwiper, /* { default global options } */)

import {
  Tab,
  Tabs,
  Button,
  Collapse,
  CollapseItem,
  Icon,
  Uploader,
  Popup
} from 'vant'

Vue.use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Button)
  .use(Collapse)
  .use(CollapseItem)
  .use(Icon)
  .use(Uploader)
  .use(Popup)
  .use(VueAwesomeSwiper, /* { default global options } */)

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
