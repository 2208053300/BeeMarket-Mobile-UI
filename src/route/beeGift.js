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
      name: 'beeGift',
      component: () => import('@/pages/BeeGift'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeGift/GiftDetail')
        },
        {
          path: 'login',
          name: 'BeeLogin',
          component: () => import('@/pages/BeeGift/BeeLogin')
        },
        {
          path: 'addressManage',
          name: 'AddressSetting',
          component: () => import('@/pages/BeeGift/AddressSetting'),
          children: [
            {
              path: '',
              component: () =>
                import('@/pages/BeeGift/AddressSetting/AddressManage')
            },
            {
              path: 'addAddress',
              name: 'addAddress',
              component: () =>
                import('@/pages/BeeGift/AddressSetting/AddAddress')
            }
          ]
        },
        {
          path: 'GetResult',
          name: 'GetResult',
          component: () => import('@/pages/BeeGift/GetResult'),
          children: [
            {
              path: 'GetSuccess',
              name: 'GetSkuccess',
              component: () => import('@/pages/BeeGift/GetResult/GetSuccess')
            },
            {
              path: 'GetFreight',
              name: 'GetFreight',
              component: () => import('@/pages/BeeGift/GetResult/GetFreight')
            },
            {
              path: 'GetFailed',
              name: 'GetFailed',
              component: () => import('@/pages/BeeGift/GetResult/GetFailed')
            }
          ]
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
