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
    }, {
      path: 'details',
      name: 'CommodityDetails',
      component: () => import('@/pages/index/views/BeeCategory/CommodityDetails')
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
      path: '/order',
      name: 'MyOrder',
      component: () => import('@/pages/index/views/BeePersion/MyOrder')
    },
    {
      path: '/functionFeedBack',
      name: 'functionFeedBack',
      component: () => import('@/pages/index/views/BeePersion/FunctionFeedBack')
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
      path: '/functionSetting',
      name: 'functionSetting',
      component: () => import('@/pages/index/views/BeePersion/FunctionSetting')
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
