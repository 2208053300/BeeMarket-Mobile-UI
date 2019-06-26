import Vue from 'vue'
import App from './index.vue'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
import { NavBar, Icon } from 'vant'

// NOTE 定义rem基准
import '@/utils/flexiable'

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// NOTE 修改页面meta数据
Vue.use(Meta).use(NavBar).use(Icon)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
