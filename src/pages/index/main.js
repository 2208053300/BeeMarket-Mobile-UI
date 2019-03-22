import Vue from 'vue'
import App from '@/App.vue'
import router from '@/route/router'
import store from '@/store'

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
