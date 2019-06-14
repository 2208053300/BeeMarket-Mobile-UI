import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'beeCompleteInfo',
      component: () => import('@/pages/BeeCompleteInfo'),
      children: [
        {
          path: 'phone',
          component: () => import('@/pages/BeeCompleteInfo/CompleteInfo/bindPhone')
        },
        {
          path: 'wechat',
          component: () => import('@/pages/BeeCompleteInfo/CompleteInfo/bindWechat')
        }
      ]
    }
  ]
})
