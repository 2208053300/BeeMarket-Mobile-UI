import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/views/BeeHome'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'BeeHome',
    component: Home
  },
  {
    path: '/category',
    name: 'BeeCategory',
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
    name: 'BeeDiscover',
    component: () => import('@/pages/index/views/BeeDiscover'),
    children: [{
      path: '/',
      name: 'DiscoverList',
      component: () => import('@/pages/index/views/BeeDiscover/DiscoverList')
    }]
  },
  {
    path: '/cart',
    name: 'BeeCart',
    component: () => import('@/pages/index/views/BeeCart'),
    children: [{
      path: '/',
      name: 'CartList',
      component: () => import('@/pages/index/views/BeeCart/CartList')
    },
    {
      path: '/share',
      name: 'CartShare',
      component: () => import('@/pages/index/views/BeeCart/CartShare')
    }
    ]
  },
  {
    path: '/persion',
    name: 'BeePersion',
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
    }
    ]
  },
  {
    path: '/login',
    name: 'BeeLogin',
    component: () => import('@/pages/index/views/BeeLogin')
  }
  ]
})
