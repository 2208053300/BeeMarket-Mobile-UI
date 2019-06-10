import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      component: () => import('@/pages/BeeReplace'),
      children: [
        {
          path: '',
          name: 'beeReplace',
          component: () => import('@/pages/BeeReplace/ReplacePay')
        },
        {
          path: 'payResult',
          name: 'payResult',
          component: () => import('@/pages/BeeReplace/PayResult')
        }
      ]
    }
  ]
})
