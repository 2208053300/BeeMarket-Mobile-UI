import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'
import { getOs } from '@/utils'
Vue.use(Router)

const router = new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '',
      name: 'beeAnnouncement',
      component: () => import('@/pages/BeeAnnouncement'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeAnnouncement/Announcement')
        }
      ]
    }
  ]
})
router.beforeEach(async(to, from, next) => {
  // 如果是微信未授权，等待跳转
  const token = await getToken()
  const osObj = getOs()
  if (osObj.isWx && token) {
    next()
  } else if (!osObj.isWx) {
    next()
  }
})
export default router
