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
      component: () => import('@/pages/BeeGiftPackage'),
      children: [
        {
          path: '',
          name: 'giftPackageWelcome',
          component: () => import('@/pages/BeeGiftPackage/Welcome')
        },
        {
          path: 'home',
          name: 'giftPackageHome',
          component: () => import('@/pages/BeeGiftPackage/Home')
        },
        {
          path: 'detail',
          name: 'giftPackagePDetail',
          component: () => import('@/pages/BeeGiftPackage/CommodityDetails')
        },
        {
          path: 'buySuccess',
          name: 'buySuccess',
          component: () => import('@/pages/BeeGiftPackage/BuySuccess')
        },
        {
          path: 'buyGiftPackage',
          name: 'buyGiftPackage',
          component: () => import('@/pages/BeeGiftPackage/PaySelf')
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
