import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/BeeHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BeeHome',
      component: Home,
      meta: {
        // NOTE 需要被缓存
        keepAlive: true
      }
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
          path: '/',
          name: 'CategoryList',
          component: () =>
            import('@/pages/index/BeeCategory/CategoryList')
        },
        {
          path: '/SecCategoryList',
          name: 'SecCategoryList',
          component: () =>
            import('@/pages/index/BeeCategory/SecCategoryList')
        },
        {
          path: 'details',
          name: 'CommodityDetails',
          component: () =>
            import('@/pages/index/BeeCategory/CommodityDetails'),
          children: [
            {
              path: '/',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/CommodityDetails')
            },
            {
              path: 'userAssessment',
              name: 'userAssessment',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/UserAssessment')
            },
            {
              path: 'confirmOrder',
              name: 'confirmOrder',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/ConfirmOrder')
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
          path: '/',
          name: 'DiscoverList',
          component: () =>
            import('@/pages/index/BeeDiscover/DiscoverList')
        }
      ]
    },
    {
      path: '/cart',
      component: () => import('@/pages/index/BeeCart'),
      children: [
        {
          path: '/',
          name: 'CartList',
          component: () => import('@/pages/index/BeeCart/CartList'),
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/CartShare',
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
          path: '/',
          name: 'PersionalCenter',
          component: () =>
            import('@/pages/index/BeePersion/PersionalCenter')
        },
        {
          path: '/persion/order',
          name: 'MyOrder',
          component: () => import('@/pages/index/BeePersion/MyOrder')
        },
        {
          path: '/persion/BeeSetting',
          component: () => import('@/pages/index/BeePersion/BeeSetting'),
          children: [
            {
              path: '/',
              name: 'functionSetting',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/FunctionSetting')
            },
            {
              path: '/persion/BeeSetting/functionFeedBack',
              name: 'functionFeedBack',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/FunctionFeedBack')
            }
          ]
        },
        {
          path: '/persion/ServiceHelper',
          component: () =>
            import('@/pages/index/BeePersion/ServiceHelper'),
          children: [
            {
              path: '/',
              name: 'ServiceHelperIndex',
              component: () =>
                import('@/pages/index/BeePersion/ServiceHelper/ServiceHelperIndex')
            },
            {
              path: '/persion/ServiceHelper/QustionList',
              name: 'QustionList',
              component: () =>
                import('@/pages/index/BeePersion/ServiceHelper/QustionList')
            }
          ]
        },
        {
          path: '/persion/addressSetting',
          component: () =>
            import('@/pages/index/BeePersion/AddressSetting'),
          children: [
            {
              path: '/',
              name: 'addressManage',
              component: () =>
                import('@/pages/index/BeePersion/AddressSetting/AddressManage')
            },
            {
              path: '/persion/addressSetting/addAddress',
              name: 'addAddress',
              component: () =>
                import('@/pages/index/BeePersion/AddressSetting/AddAddress')
            }
          ]
        },
        {
          path: '/persion/history',
          component: () => import('@/pages/index/BeePersion/History'),
          children: [
            {
              path: '/',
              name: 'historyIndex',
              component: () =>
                import('@/pages/index/BeePersion/History/HistoryIndex')
            },
            {
              path: '/persion/history/historyEdit',
              name: 'historyEdit',
              component: () =>
                import('@/pages/index/BeePersion/History/HistoryEdit')
            }
          ]
        },
        {
          path: '/persion/myCollected',
          name: 'myCollected',
          component: () => import('@/pages/index/BeePersion/MyCollected')
        },
        {
          path: '/persion/beeSetting/about',
          component: () =>
            import('@/pages/index/BeePersion/BeeSetting/About'),
          children: [
            {
              path: '/',
              name: 'aboutIndex',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About/AboutIndex')
            },
            {
              path: '/persion/beeSetting/about/useHelp',
              name: 'useHelp',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About/UseHelp')
            },
            {
              path: '/persion/beeSetting/about/userAgreement',
              name: 'userAgreement',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About/UserAgreement')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'BeeLogin',
      component: () => import('@/pages/index/BeeLogin')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
