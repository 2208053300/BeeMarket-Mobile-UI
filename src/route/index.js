import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/views/BeeHome'

Vue.use(Router)

export default new Router({
  routes: [{
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
    component: () => import('@/pages/index/views/BeeCategory'),
    children: [{
      path: '/',
      name: 'CategoryList',
      component: () => import('@/pages/index/views/BeeCategory/CategoryList')
    },
    {
      path: '/SecCategoryList',
      name: 'SecCategoryList',
      component: () => import('@/pages/index/views/BeeCategory/SecCategoryList')
    },
    {
      path: 'details',
      name: 'CommodityDetails',
      component: () => import('@/pages/index/views/BeeCategory/CommodityDetails')
    }, {
      path: 'userAssessment',
      name: 'userAssessment',
      component: () => import('@/pages/index/views/BeeCategory/UserAssessment')
    }, {
      path: 'confirmOrder',
      name: 'confirmOrder',
      component: () => import('@/pages/index/views/BeeCategory/ConfirmOrder')
    }]
  },
  {
    path: '/discover',
    component: () => import('@/pages/index/views/BeeDiscover'),
    children: [{
      path: '/',
      name: 'DiscoverList',
      component: () => import('@/pages/index/views/BeeDiscover/DiscoverList')
    }]
  },
  {
    path: '/cart',
    component: () => import('@/pages/index/views/BeeCart'),
    children: [{
      path: '/',
      name: 'CartList',
      component: () => import('@/pages/index/views/BeeCart/CartList'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/CartShare',
      name: 'CartShare',
      component: () => import('@/pages/index/views/BeeCart/CartShare')
    }

    ]
  },
  {
    path: '/persion',
    component: () => import('@/pages/index/views/BeePersion'),
    children: [{
      path: '/',
      name: 'PersionalCenter',
      component: () => import('@/pages/index/views/BeePersion/PersionalCenter')
    },
    {
      path: '/persion/order',
      name: 'MyOrder',
      component: () => import('@/pages/index/views/BeePersion/MyOrder')
    },
    {
      path: '/persion/BeeSetting',
      component: () => import('@/pages/index/views/BeePersion/BeeSetting'),
      children: [{
        path: '/',
        name: 'functionSetting',
        component: () => import('@/pages/index/views/BeePersion/BeeSetting/FunctionSetting')
      },
      {
        path: '/persion/BeeSetting/functionFeedBack',
        name: 'functionFeedBack',
        component: () => import('@/pages/index/views/BeePersion/BeeSetting/FunctionFeedBack')
      }
      ]
    },
    {
      path: '/persion/ServiceHelper',
      component: () => import('@/pages/index/views/BeePersion/ServiceHelper'),
      children: [
        {
          path: '/',
          name: 'ServiceHelperIndex',
          component: () => import('@/pages/index/views/BeePersion/ServiceHelper/ServiceHelperIndex')
        },
        {
          path: '/persion/ServiceHelper/QustionList',
          name: 'QustionList',
          component: () => import('@/pages/index/views/BeePersion/ServiceHelper/QustionList')
        }]

    },
    {
      path: '/persion/addressSetting',
      component: () => import('@/pages/index/views/BeePersion/AddressSetting'),
      children: [{
        path: '/',
        name: 'addressManage',
        component: () => import('@/pages/index/views/BeePersion/AddressSetting/AddressManage')
      }, {
        path: '/persion/addressSetting/addAddress',
        name: 'addAddress',
        component: () => import('@/pages/index/views/BeePersion/AddressSetting/AddAddress')
      }]
    },
    {
      path: '/persion/history',
      component: () => import('@/pages/index/views/BeePersion/History'),
      children: [{
        path: '/',
        name: 'historyIndex',
        component: () => import('@/pages/index/views/BeePersion/History/HistoryIndex')
      }, {
        path: '/persion/history/historyEdit',
        name: 'historyEdit',
        component: () => import('@/pages/index/views/BeePersion/History/HistoryEdit')
      }]
    },
    {
      path: '/persion/myCollected',
      name: 'myCollected',
      component: () => import('@/pages/index/views/BeePersion/MyCollected')
    },
    {
      path: '/persion/beeSetting/about',
      component: () => import('@/pages/index/views/BeePersion/BeeSetting/About'),
      children: [{
        path: '/',
        name: 'aboutIndex',
        component: () => import('@/pages/index/views/BeePersion/BeeSetting/About/AboutIndex')
      },
      {
        path: '/persion/beeSetting/about/useHelp',
        name: 'useHelp',
        component: () => import('@/pages/index/views/BeePersion/BeeSetting/About/UseHelp')
      },
      {
        path: '/persion/beeSetting/about/userAgreement',
        name: 'userAgreement',
        component: () => import('@/pages/index/views/BeePersion/BeeSetting/About/UserAgreement')
      }
      ]
    }
    ]
  },
  {
    path: '/login',
    name: 'BeeLogin',
    component: () => import('@/pages/index/views/BeeLogin')
  }, {
    path: '*',
    redirect: '/404'
  }
  ]
})
