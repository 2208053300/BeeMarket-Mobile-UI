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
          name: 'CommodityDetails',
          component: () => import('@/pages/index/BeeCategory/CommodityDetails'),
          children: [
            {
              path: '',
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
            },
            {
              path: 'giveFirends',
              name: 'giveFirends',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/GiveFirends')
            }, {
              path: 'payForAnother',
              name: 'payForAnother',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/PayForAnother')
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
          path: 'order',
          name: 'MyOrder',
          component: () => import('@/pages/index/BeePersion/MyOrder')
        },
        {
          path: 'BeeSetting',
          component: () => import('@/pages/index/BeePersion/BeeSetting'),
          children: [
            {
              path: '/',
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
                import('@/pages/index/BeePersion/ServiceHelper/ServiceHelperIndex')
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
