import Vue from 'vue'
import App from './index.vue'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
// NOTE 定义rem基准
import '@/utils/flexiable'

// NOTE 引入Vant懒加载
import { Lazyload, NavBar, Icon } from 'vant'
import 'vant/lib/index.css'
// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Lazyload, {
  preLoad: 2
})

// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
