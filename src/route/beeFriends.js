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
      component: () => import('@/pages/BeeFriends'),
      children: [
        {
          path: '',
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
          path: 'agreement',
          name: 'partnerAgreement',
          component: () => import('@/pages/BeeFriends/Agreement')
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
        },
        {
          path: 'pay',
          name: 'friendPay',
          component: () => import('@/pages/BeeFriends/Pay')
        },
        {
          path: 'rule',
          name: 'beeFriendRule',
          component: () => import('@/pages/BeeFriends/Rule')
        },
        {
          path: 'noQualified',
          name: 'noQualified',
          component: () => import('@/pages/BeeFriends/NoQualified')
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
