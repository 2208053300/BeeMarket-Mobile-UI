import Vue from 'vue'
import App from './App.vue'
import router from '@/route/router'
import store from '@/store'
import '@/styles/normalize.min.css'
import './styles/index.less'
// NOTE 定义rem基准
import '@/utils/flexiable'
// NOTE 全局引入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
