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
      component: () => import('@/pages/BeeFreeGift'),
      children: [
        {
          path: '',
          name: 'beeFreeGift',
          component: () => import('@/pages/BeeFreeGift/Home')
        },
        {
          path: 'history',
          component: () => import('@/pages/BeeFreeGift/History')
        },
        {
          path: 'history/detail',
          component: () => import('@/pages/BeeFreeGift/History/detail')
        },
        {
          path: 'detail',
          component: () => import('@/pages/BeeFreeGift/CommodityDetails')
        },
        {
          path: 'prizeDraw',
          component: () => import('@/pages/BeeFreeGift/PrizeDraw')
        },
        {
          path: 'confirmOrder',
          name: 'confirmOrder',
          component: () => import('@/pages/BeeFreeGift/ConfirmOrder')
        },
        {
          path: 'payResult',
          name: 'payResult',
          component: () => import('@/pages/BeeFreeGift/PayResult')
        },
        {
          path: 'addressManage',
          name: 'addressManage',
          component: () => import('@/pages/BeeFreeGift/AddressManage')
        },
        {
          path: 'addAddress',
          name: 'addAddress',
          component: () => import('@/pages/BeeFreeGift/AddAddress')
        },
        {
          path: 'success',
          name: 'success',
          component: () => import('@/pages/BeeFreeGift/Success')
        },
        {
          path: 'downloadApp',
          name: 'downloadApp',
          component: () => import('@/pages/BeeFreeGift/DownloadApp')
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
