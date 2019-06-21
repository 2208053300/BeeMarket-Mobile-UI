import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'beeFactory',
      component: () => import('@/pages/BeeFactory'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeFactory/Factory')
        },
        {
          path: 'enterPolicty',
          name: 'enterPolicty',
          component: () => import('@/pages/BeeFactory/EnterPolicty')
        }
      ]
    }
  ]
})
