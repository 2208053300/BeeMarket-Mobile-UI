import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'beeTask',
      component: () => import('@/pages/BeeTask'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeTask/TaskList')
        },
        {
          path: 'taskDetail',
          name: 'taskDetail',
          component: () => import('@/pages/BeeTask/TaskDetail')
        },
        {
          path: 'taskPerfectData/phone',
          name: 'taskPerfectDataWithPhone',
          component: () => import('@/pages/BeeTask/TaskPerfectData/bindPhone')
        },
        {
          path: 'taskPerfectData/wechat',
          name: 'taskPerfectDataWithWechat',
          component: () => import('@/pages/BeeTask/TaskPerfectData/bindWechat')
        },
        {
          path: 'talent',
          name: 'becomeTalent',
          component: () => import('@/pages/BeeTask/TaskTalent')
        }
      ]
    }
  ]
})
