import Vue from 'vue'
import App from './index.vue'
import router from '@/route/beeAlcohol'
import Meta from 'vue-meta'
import store from '@/store'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'
// NOTE 定义rem基准
import '@/utils/flexiable'

// NOTE 引入Vant懒加载
import { Button, Cell, CellGroup, Checkbox, CheckboxGroup, Field, Icon, Lazyload, Popup, Row, Col } from 'vant'

Vue.use(Lazyload, {
  preLoad: 2
})
Vue.use(Popup).use(Row).use(Col)

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// NOTE 修改页面meta数据
Vue.use(Meta)
  .use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Button)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Field)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
