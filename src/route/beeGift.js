import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
