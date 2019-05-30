import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/BeeHome/HomePage'
import { getToken } from '@/utils/auth'

Vue.use(Router)
const router = new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '',
      component: () => import('@/pages/index/BeeHome'),
      meta: {
        // NOTE 需要被缓存
        keepAlive: true
      },
      children: [
        {
          path: '',
          name: 'BeeHome',
          component: Home
        },
        {
          path: 'beeLimit',
          name: 'beeLimit',
          component: () => import('@/pages/index/BeeHome/BeeLimit')
        },
        {
          path: 'beeNotice',
          name: 'beeNotice',
          component: () => import('@/pages/index/BeeHome/BeeNotice')
        },
        {
          path: 'beeAction',
          name: 'beeAction',
          component: () => import('@/pages/index/BeeHome/BeeAction')
        },
        {
          path: 'beefarm',
          name: 'beefarm',
          component: () => import('@/pages/index/BeeHome/BeeFarm')
        },
        {
          path: 'beeTask',
          component: () => import('@/pages/BeeTask'),
          children: [
            {
              path: '',
              name: 'beeTask',
              component: () => import('@/pages/BeeTask/TaskList')
            },
            {
              path: 'taskDetail',
              name: 'taskDetail',
              component: () => import('@/pages/BeeTask/TaskDetail')
            }
          ]
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/pages/BeeError/404')
    },
    {
      path: '/category',
      component: () => import('@/pages/index/BeeCategory'),
      children: [
        {
          path: '',
          name: 'CategoryList',
          component: () => import('@/pages/index/BeeCategory/CategoryList')
        },
        {
          path: 'SecCategoryList',
          name: 'SecCategoryList',
          component: () => import('@/pages/index/BeeCategory/SecCategoryList')
        },
        {
          path: 'details',
          component: () => import('@/pages/index/BeeCategory/CommodityDetails'),
          children: [
            {
              path: '',
              name: 'CommodityDetails',
              component: () =>
                import(
                  '@/pages/index/BeeCategory/CommodityDetails/CommodityDetails'
                )
            },
            {
              path: 'userAssessment',
              name: 'userAssessment',
              component: () =>
                import(
                  '@/pages/index/BeeCategory/CommodityDetails/UserAssessment'
                )
            },
            {
              path: 'confirmOrder',
              name: 'confirmOrder',
              component: () =>
                import(
                  '@/pages/index/BeeCategory/CommodityDetails/ConfirmOrder'
                )
            },
            {
              path: 'giveFirends',
              name: 'giveFirends',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/GiveFirends')
            },
            {
              path: 'payForAnother',
              name: 'payForAnother',
              component: () =>
                import(
                  '@/pages/index/BeeCategory/CommodityDetails/PayForAnother'
                )
            }
          ]
        },
        {
          path: 'store',
          component: () => import('@/pages/index/BeeCategory/Store'),
          children: [
            {
              path: '',
              name: 'store',
              component: () =>
                import('@/pages/index/BeeCategory/Store/StoreHome')
            },
            {
              path: 'license',
              name: 'StoreLicense',
              component: () =>
                import('@/pages/index/BeeCategory/Store/StoreLicense')
            }
          ]
        }
      ]
    },
    {
      path: '/discover',
      component: () => import('@/pages/index/BeeDiscover'),
      children: [
        {
          path: '',
          name: 'DiscoverList',
          component: () => import('@/pages/index/BeeDiscover/DiscoverList')
        },
        {
          path: 'action',
          name: 'ActionDetail',
          component: () => import('@/pages/index/BeeDiscover/ActionDetail')
        },
        {
          path: 'article',
          name: 'ArticleDetail',
          component: () => import('@/pages/index/BeeDiscover/ArticleDetail')
        }
      ]
    },
    {
      path: '/cart',
      component: () => import('@/pages/index/BeeCart'),
      children: [
        {
          path: '',
          name: 'CartList',
          component: () => import('@/pages/index/BeeCart/CartList'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'CartShare',
          name: 'CartShare',
          component: () => import('@/pages/index/BeeCart/CartShare')
        }
      ]
    },
    {
      path: '/persion',
      component: () => import('@/pages/index/BeePersion'),
      children: [
        {
          path: '',
          name: 'PersionalCenter',
          component: () => import('@/pages/index/BeePersion/PersionalCenter')
        },
        {
          path: 'myQrcode',
          name: 'myQrcode',
          component: () => import('@/pages/index/BeePersion/MyQrcode')
        },
        {
          path: 'BeeCommonweal',
          component: () => import('@/pages/BeeCommonweal'),
          children: [
            {
              path: '',
              name: 'BeeCommonweal',
              component: () => import('@/pages/BeeCommonweal/ComVal')
            },
            {
              path: 'detail',
              name: 'CommonwealDetail',
              component: () => import('@/pages/BeeCommonweal/CommonwealDetail')
            }
          ]
        },
        {
          path: 'order',
          component: () => import('@/pages/index/BeePersion/MyOrder'),
          children: [
            {
              path: '',
              name: 'AllOrder',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/AllOrder')
            },
            {
              path: 'comment',
              name: 'Comment',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/Comment')
            },
            {
              path: 'logistics',
              name: 'LogisticsList',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/LogisticsList')
            },
            {
              path: 'logisticsDetail',
              name: 'LogisticsDetail',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/LogisticsDetail')
            },
            {
              path: 'orderDetail',
              name: 'orderDetail',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/OrderDetail')
            },
            {
              path: 'afterList',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/AfterList'),
              children: [
                {
                  path: '',
                  name: 'afterList',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/AfterList/AfterList'
                    )
                },
                {
                  path: 'afterDetail',
                  name: 'afterDetail',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/AfterList/AfterDetail'
                    )
                },
                {
                  path: 'afterProgress',
                  name: 'AfterProgress',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/AfterList/AfterProgress'
                    )
                },
                {
                  path: 'communicationRecord',
                  name: 'CommunicationRecord',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/AfterList/CommunicationRecord'
                    )
                }
              ]
            },
            {
              path: 'applyAfter',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/ApplyAfter'),
              children: [
                {
                  path: '',
                  name: 'applyAfter',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/ApplyAfter/AfterType'
                    )
                },
                {
                  path: 'refund',
                  name: 'refund',
                  component: () =>
                    import('@/pages/index/BeePersion/MyOrder/ApplyAfter/Refund')
                },
                {
                  path: 'exchange',
                  name: 'exchange',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/ApplyAfter/Exchange'
                    )
                },
                {
                  path: 'fill',
                  name: 'fill',
                  component: () =>
                    import('@/pages/index/BeePersion/MyOrder/ApplyAfter/Fill')
                }
              ]
            }
          ]
        },
        {
          path: 'BeeSetting',
          component: () => import('@/pages/index/BeePersion/BeeSetting'),
          children: [
            {
              path: '',
              name: 'functionSetting',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/FunctionSetting')
            },
            {
              path: 'functionFeedBack',
              name: 'functionFeedBack',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/FunctionFeedBack')
            }
          ]
        },
        {
          path: 'ServiceHelper',
          component: () => import('@/pages/index/BeePersion/ServiceHelper'),
          children: [
            {
              path: '',
              name: 'ServiceHelperIndex',
              component: () =>
                import(
                  '@/pages/index/BeePersion/ServiceHelper/ServiceHelperIndex'
                )
            },
            {
              path: 'QustionList',
              name: 'QustionList',
              component: () =>
                import('@/pages/index/BeePersion/ServiceHelper/QustionList')
            }
          ]
        },
        {
          path: 'addressSetting',
          component: () => import('@/pages/index/BeePersion/AddressSetting'),
          children: [
            {
              path: '',
              name: 'addressManage',
              component: () =>
                import('@/pages/index/BeePersion/AddressSetting/AddressManage')
            },
            {
              path: 'addAddress',
              name: 'addAddress',
              component: () =>
                import('@/pages/index/BeePersion/AddressSetting/AddAddress')
            }
          ]
        },
        {
          path: 'history',
          component: () => import('@/pages/index/BeePersion/History'),
          children: [
            {
              path: '',
              name: 'historyIndex',
              component: () =>
                import('@/pages/index/BeePersion/History/HistoryIndex')
            },
            {
              path: 'historyEdit',
              name: 'historyEdit',
              component: () =>
                import('@/pages/index/BeePersion/History/HistoryEdit')
            }
          ]
        },
        {
          path: 'myCollected',
          name: 'myCollected',
          component: () => import('@/pages/index/BeePersion/MyCollected')
        },
        {
          path: 'about',
          component: () => import('@/pages/index/BeePersion/BeeSetting/About'),
          children: [
            {
              path: '',
              name: 'aboutIndex',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About/AboutIndex')
            },
            {
              path: 'useHelp',
              name: 'useHelp',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About/UseHelp')
            },
            {
              path: 'userAgreement',
              name: 'userAgreement',
              component: () =>
                import(
                  '@/pages/index/BeePersion/BeeSetting/About/UserAgreement'
                )
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'BeeLogin',
      component: () => import('@/pages/BeeLogin')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
// TODO 此处需要加个守卫，当用户跳转到需要用户信息的操作界面，如果未登录，跳转登录界面
// router.beforeEach((to, from, next) => {
//   // 判断路由是否在白名单内
//   if (['/login'].includes(to.path)) {
//     next()
//     return
//   }
//   // 判断是否登录
//   if (getToken()) {
//     next()
//   } else {
//     next('/login')
//   }
// })
export default router
