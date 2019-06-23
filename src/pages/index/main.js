import Vue from 'vue'
import App from './App.vue'
import router from '@/route/index'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
// NOTE 定义rem基准
import '@/utils/flexiable'

// NOTE 全局引入vant所有组件
import Vant from 'vant'
// NOTE 引入Vant懒加载
import { Lazyload } from 'vant'
import 'vant/lib/index.css'
// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
// 腾讯防水墙
import vueTencentCaptcha from '@carpenter/vue-tencent-captcha'
Vue.use(vueTencentCaptcha)

Vue.use(Vant)
Vue.use(Lazyload, {
  preLoad: 2
})
// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
