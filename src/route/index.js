import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index/BeeHome/HomePage'
import { getToken } from '@/utils/auth'
import { getOs } from '@/utils'

Vue.use(Router)
const router = new Router({
  // NOTE 返回后再次进入定位到最顶部
  scrollBehavior: () => ({ y: 0 }),
  // mode: 'history',
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
          path: 'beeActiveTpl',
          component: () => import('@/pages/BeeActiveTpl'),
          children: [
            {
              path: '',
              name: 'beeActiveTpl',
              component: () => import('@/pages/BeeActiveTpl/ActiveTpl')
            }
          ]
        },
        {
          path: 'beeLimit',
          component: () => import('@/pages/BeeLimit'),
          children: [
            {
              path: '',
              name: 'beeLimit',
              component: () => import('@/pages/BeeLimit/productList')
            }
          ]
        },
        {
          path: 'beeCompleteInfo',
          component: () => import('@/pages/BeeCompleteInfo'),
          children: [
            {
              path: 'phone',
              name: 'beeCompleteInfo',
              component: () =>
                import('@/pages/BeeCompleteInfo/CompleteInfo/bindPhone')
            },
            {
              path: 'wechat',
              name: 'wechat',
              component: () =>
                import('@/pages/BeeCompleteInfo/CompleteInfo/bindWechat')
            }
          ]
        },
        {
          path: 'beeHelper',
          component: () => import('@/pages/BeeHelper'),
          children: [
            {
              path: '',
              name: 'ServiceHelperIndex',
              component: () => import('@/pages/BeeHelper/ServiceHelperIndex')
            },
            {
              path: 'qustionList',
              name: 'qustionList',
              component: () => import('@/pages/BeeHelper/QustionList')
            }
          ]
        },
        {
          path: 'beeFactory',
          component: () => import('@/pages/BeeFactory'),
          children: [
            {
              path: '',
              name: 'beeFactory',
              component: () => import('@/pages/BeeFactory/Factory')
            },
            {
              path: 'enterPolicty',
              name: 'enterPolicty',
              component: () => import('@/pages/BeeFactory/EnterPolicty')
            }
          ]
        },
        {
          path: 'beeFriends',
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
              path: 'pay',
              name: 'friendPay',
              component: () => import('@/pages/BeeFriends/Pay')
            },
            {
              path: 'freeze',
              name: 'freeze',
              component: () => import('@/pages/BeeFriends/Freeze')
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
        },
        {
          path: 'beeRegister',
          component: () => import('@/pages/BeeRegister'),
          children: [
            {
              path: '',
              name: 'beeRegister',
              component: () => import('@/pages/BeeRegister/Register')
            },
            {
              path: 'download',
              name: 'download',
              component: () => import('@/pages/BeeRegister/Download')
            },
            {
              path: 'agreement',
              name: 'agreement',
              component: () => import('@/pages/BeeRegister/UserAgreement')
            }
          ]
        },
        {
          path: 'beeNotice',
          name: 'beeNotice',
          component: () => import('@/pages/index/BeeHome/BeeNotice')
        },
        {
          path: 'beeAnnouncement',
          component: () => import('@/pages/BeeAnnouncement'),
          children: [
            {
              path: '',
              name: 'beeAnnouncement',
              component: () => import('@/pages/BeeAnnouncement/Announcement')
            }
          ]
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
        },
        {
          path: 'beeClassroom',
          component: () => import('@/pages/BeeClassroom'),
          children: [
            {
              path: '',
              component: () => import('@/pages/BeeClassroom/ClassroomList')
            },
            {
              path: 'detail/:id',
              name: 'classroomDetail',
              component: () => import('@/pages/BeeClassroom/ClassroomDetail')
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
          path: 'SearchCommodity',
          name: 'SearchCommodity',
          component: () => import('@/pages/index/BeeCategory/SearchCommodity')
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
              path: 'payOrder',
              component: () =>
                import('@/pages/index/BeeCategory/CommodityDetails/PayOrder'),
              children: [
                {
                  path: '',
                  name: 'payOrder',
                  component: () =>
                    import(
                      '@/pages/index/BeeCategory/CommodityDetails/PayOrder/PaySelf'
                    )
                },
                {
                  path: 'payResult',
                  name: 'payResult',
                  component: () =>
                    import('@/pages/index/BeeCategory/CommodityDetails/PayOrder/PayResult')
                }
              ]
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
                import('@/pages/BeeStoreLicense')
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
          component: () => import('@/pages/BeeActionList/ActionDetail')
        },
        {
          path: 'completeDetail',
          name: 'completeDetail',
          component: () => import('@/pages/BeeActionList/CompleteDetail')
        },
        {
          path: 'joinSuccess',
          name: 'joinSuccess',
          component: () => import('@/pages/index/BeeDiscover/JoinSuccess')
        },
        {
          path: 'article/:id',
          name: 'ArticleDetail',
          component: () => import('@/pages/BeeArticle/ArticleDetail')
        },
        {
          path: 'actionList',
          name: 'beeActionList',
          component: () => import('@/pages/BeeActionList/ActionList')
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
          component: () => import('@/pages/index/BeeCart/CartList')
          // meta: {
          //   keepAlive: true
          // }
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
          path: 'profile',
          component: () => import('@/pages/index/BeePersion/Profile'),
          children: [
            {
              path: '',
              name: 'profile',
              component: () =>
                import('@/pages/index/BeePersion/Profile/ProfileIndex')
            },
            {
              path: 'baseInfo',
              name: 'baseInfo',
              component: () =>
                import('@/pages/index/BeePersion/Profile/BaseInfo')
            },
            {
              path: 'accountSafe',
              name: 'accountSafe',
              component: () =>
                import('@/pages/index/BeePersion/Profile/AccountSafe')
            },
            {
              path: 'changePhone',
              component: () =>
                import('@/pages/index/BeePersion/Profile/ChangePhone'),
              children: [
                {
                  path: '',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/Profile/ChangePhone/GetSms'
                    )
                },
                {
                  path: 'bindPhone',
                  name: 'changePhone',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/Profile/ChangePhone/BindPhone'
                    )
                }
              ]
            },
            {
              path: 'setPayPw',
              component: () =>
                import('@/pages/index/BeePersion/Profile/SetPayPw'),
              children: [
                {
                  path: '',
                  component: () =>
                    import('@/pages/index/BeePersion/Profile/SetPayPw/RemindPw')
                },
                {
                  path: 'getSms',
                  name: 'setPayPwGetSms',
                  component: () =>
                    import('@/pages/index/BeePersion/Profile/SetPayPw/GetSms')
                },
                {
                  path: 'inputOldPw',
                  name: 'inputOldPw',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/Profile/SetPayPw/InputOldPw'
                    )
                },
                {
                  path: 'setPw',
                  name: 'setPayPw',
                  component: () =>
                    import('@/pages/index/BeePersion/Profile/SetPayPw/SetPw')
                }
              ]
            },
            {
              path: 'setLoginPw',
              component: () =>
                import('@/pages/index/BeePersion/Profile/SetLoginPw'),
              children: [
                {
                  path: '',
                  component: () =>
                    import('@/pages/index/BeePersion/Profile/SetLoginPw/GetSms')
                },
                {
                  path: 'setPw',
                  name: 'setLoginPw',
                  component: () =>
                    import('@/pages/index/BeePersion/Profile/SetLoginPw/SetPw')
                }
              ]
            },
            {
              path: 'accountBind',
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
            }
          ]
        },
        {
          path: 'myQrcode',
          name: 'myQrcode',
          component: () => import('@/pages/index/BeePersion/MyQrcode')
        },
        {
          path: 'beeCommonweal',
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
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/Comment'),
              children: [
                {
                  path: '',
                  name: 'CommentProduct',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/Comment/CommentIndex'
                    )
                },
                {
                  path: 'waitCommentOrder',
                  name: 'waitCommentOrder',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/MyOrder/Comment/WaitCommentOrder'
                    )
                }
              ]
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
              path: 'fillLogisticsInfo',
              name: 'fillLogisticsInfo',
              component: () =>
                import('@/pages/index/BeePersion/MyOrder/FillLogisticsInfo')
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
            },
            {
              path: 'about',
              component: () =>
                import('@/pages/index/BeePersion/BeeSetting/About'),
              children: [
                {
                  path: '',
                  name: 'aboutIndex',
                  component: () =>
                    import(
                      '@/pages/index/BeePersion/BeeSetting/About/AboutIndex'
                    )
                }
                // {
                //   path: 'useHelp',
                //   name: 'useHelp',
                //   component: () => import('@/pages/BeeHelper')
                // },
                // {
                //   path: 'userAgreement',
                //   name: 'userAgreement',
                //   component: () =>
                //     import(
                //       '@/pages/index/BeePersion/BeeSetting/About/UserAgreement'
                //     )
                // }
              ]
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
          path: 'beeAbout',
          name: 'beeAbout',
          component: () => import('@/pages/BeeAbout')
        }
      ]
    },
    {
      path: '/login',
      name: 'BeeLogin',
      component: () => import('@/pages/BeeLogin')
    },
    {
      path: '/beeGiftPackage',
      name: 'beeGiftPackage',
      component: () => import('@/pages/BeeGiftPackage'),
      children: [
        {
          path: '',
          component: () => import('@/pages/BeeGiftPackage/Home')
        },
        {
          path: 'detail',
          name: 'giftPackagePDetail',
          component: () => import('@/pages/BeeGiftPackage/CommodityDetails')
        }
      ]
    },
    {
      path: '*',
      redirect: '/404'
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
