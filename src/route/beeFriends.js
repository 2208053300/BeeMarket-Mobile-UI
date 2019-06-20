import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      component: () => import('@/pages/BeeFriends'),
      children: [
        {
          path: '',
          name: 'beeIndex',
          component: () => import('@/pages/BeeFriends/beeIndex')
        },
        {
          path: 'beeFriends',
          name: 'beeFriends',
          component: () => import('@/pages/BeeFriends/MyBeeFriends')
        },
        {
          path: 'myEarn',
          name: 'myEarn',
          component: () => import('@/pages/BeeFriends/MyEarn')
        },
        {
          path: 'introduction',
          name: 'introduction',
          component: () => import('@/pages/BeeFriends/Introduction')
        },
        {
          path: 'apply',
          name: 'apply',
          component: () => import('@/pages/BeeFriends/Apply')
        },
        {
          path: 'waitAudit',
          name: 'waitAudit',
          component: () => import('@/pages/BeeFriends/WaitAudit')
        },
        {
          path: 'freeze',
          name: 'freeze',
          component: () => import('@/pages/BeeFriends/Freeze')
        }
      ]
    }
  ]
})
