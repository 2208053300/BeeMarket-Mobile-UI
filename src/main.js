import store from '@/store'
// 不使用时需要注释掉VConsole，以免占用资源
// import VConsole from 'vconsole' // 引入移动端VConsole
// new VConsole() // 启动VConsole
// 防抖
function debounce(fn, wait) {
  var timeout = null
  return function() {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
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
