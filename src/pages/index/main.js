import Vue from 'vue'
import App from './App.vue'
import router from '@/route/index'
import store from '@/store'
import Meta from 'vue-meta'
import '@/styles/normalize.min.css'
import '@/styles/index/index.less'
import '@/main'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

// NOTE 定义rem基准
import '@/utils/flexiable'

// 全局引入vant组件
import {
  Icon,
  NavBar,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  List,
  Popup,
  Lazyload,
  Search,
  Button,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  PullRefresh,
  Progress,
  Checkbox,
  CheckboxGroup,
  Card,
  Stepper,
  ImagePreview,
  Row,
  Col,
  Cell,
  CellGroup,
  ActionSheet,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Field,
  Uploader,
  NoticeBar,
  NumberKeyboard,
  PasswordInput,
  SubmitBar,
  SwitchCell,
  Loading,
  Dialog,
  Picker,
  Rate,
  RadioGroup,
  Radio,
  DatetimePicker,
  Switch,
  Collapse,
  CollapseItem
} from 'vant'

Vue.use(Icon)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(List)
  .use(Popup)
  .use(Lazyload, {
    preLoad: 2
  })
  .use(Search)
  .use(Button)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Tab)
  .use(Tabs)
  .use(PullRefresh)
  .use(Progress)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Card)
  .use(Stepper)
  .use(ImagePreview)
  .use(Row)
  .use(Col)
  .use(Cell)
  .use(CellGroup)
  .use(ActionSheet)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Field)
  .use(Uploader)
  .use(NoticeBar)
  .use(NumberKeyboard)
  .use(PasswordInput)
  .use(SubmitBar)
  .use(Switch)
  .use(SwitchCell)
  .use(Loading)
  .use(Dialog)
  .use(Picker)
  .use(Rate)
  .use(RadioGroup)
  .use(Radio)
  .use(DatetimePicker)
  .use(Switch)
  .use(Collapse)
  .use(CollapseItem)
  .use(VueAwesomeSwiper, /* { default global options } */)

// NOTE 移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

// 腾讯防水墙
import vueTencentCaptcha from '@carpenter/vue-tencent-captcha'
Vue.use(vueTencentCaptcha)

// NOTE 修改页面meta数据
Vue.use(Meta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
