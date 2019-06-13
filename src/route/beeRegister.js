import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'beeRegister',
      component: () => import('@/pages/BeeRegister'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeRegister/Register')
        },
        {
          path: 'download',
          component: () => import('@/pages/BeeRegister/Download')
        },
        {
          path: 'agreement',
          component: () => import('@/pages/BeeRegister/UserAgreement')
        }
      ]
    }
  ]
})
