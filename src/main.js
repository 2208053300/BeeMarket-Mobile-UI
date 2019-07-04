import store from '@/store'
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1000) {
    // TODO 回到顶部按钮，设计个小蜜蜂？
    store.commit('SET_BACKTOP', true)
  } else {
    store.commit('SET_BACKTOP', false)
  }
})
