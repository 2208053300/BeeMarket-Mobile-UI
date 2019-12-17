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
      component: () => import('@/pages/BeeAlcohol/index/index')
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: () => import('@/pages/BeeAlcohol/PaySuccess')
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('@/pages/BeeAlcohol/TicketList')
    },
    {
      path: '/earningWay',
      name: 'earningWay',
      component: () => import('@/pages/BeeAlcohol/EarningWay')
    },
    {
      path: '/redPacket',
      name: 'redPacket',
      component: () => import('@/pages/BeeAlcohol/RedPacket')
    },
    {
      path: '/cashTip',
      name: 'cashTip',
      component: () => import('@/pages/BeeAlcohol/CashTip')
    },
    {
      path: '/confirmOrder',
      name: 'alcoholConfirmOrder',
      component: () =>
        import(
          '@/pages/BeeAlcohol/ConfirmOrder'
        )
    },
    {
      path: '/addressSetting',
      name: 'addressSetting',
      component: () => import('@/pages/BeeAddress'),
      children: [
        {
          path: '',
          name: 'addressManage',
          component: () => import('@/pages/BeeAddress/AddressManage')
        },
        {
          path: 'addAddress',
          name: 'addAddress',
          component: () => import('@/pages/BeeAddress/AddAddress')
        }
      ]
    },
    {
      path: '/login',
      name: 'BeeLogin',
      component: () => import('@/pages/BeeLogin')
    },
    {
      path: '/accountBind',
      name: 'accountBind',
      component: () =>
        import('@/pages/index/BeePersion/Profile/AccountBind'),
      children: [
        {
          path: '',
          component: () =>
            import(
              '@/pages/index/BeePersion/Profile/AccountBind/BindIndex'
            )
        },
        {
          path: 'bindPhone',
          name: 'bindPhone',
          component: () =>
            import(
              '@/pages/index/BeePersion/Profile/AccountBind/BindPhone'
            )
        }
      ]
    },
    {
      path: '/shareActive',
      name: 'shareActive',
      component: () => import('@/pages/BeeAlcohol/ShareActive')
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
// 将router暴露到全局，方便request引用
window.theRouter = router
export default router
