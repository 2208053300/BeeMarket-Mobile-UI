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
      component: () => import('@/pages/BeeRegister'),
      children: [
        {
          path: '',
          name: 'beeRegister',
          component: () => import('@/pages/BeeRegister/Register')
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('@/pages/BeeRegister/Download')
        },
        {
          path: 'agreement',
          name: 'agreement',
          component: () => import('@/pages/BeeRegister/UserAgreement')
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
