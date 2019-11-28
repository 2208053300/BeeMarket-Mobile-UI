import store from '@/store'
import { debounce } from '@/utils'

// 处理函数
function handle() {
  if (window.pageYOffset > 1000) {
    // TODO 回到顶部按钮，设计个小蜜蜂？
    store.commit('SET_BACKTOP', true)
  } else {
    store.commit('SET_BACKTOP', false)
  }
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000))

// 引入控制台插件
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  // eslint-disable-next-line
  const my_console = new VConsole()
}
