import Vue from 'vue'
import App from './App.vue'
import router from '@/route/index'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import './styles/index.less'
// NOTE 定义rem基准
import '@/utils/flexiable'
// NOTE 全局引入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)
Vue.use(Vant)
// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
