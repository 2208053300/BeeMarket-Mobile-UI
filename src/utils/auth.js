import { getOs } from '@/utils'
import Cookies from 'js-cookie'
import { auditWechat } from '@/api/BeeApi/auth'
import { GetRequest, getQueryString } from '@/utils/index'

// SECTION 获取Token
export async function getToken() {
  const osObj = getOs()
  const appToken = Cookies.get('token') || Cookies.get('BM-App-Token')
  if ((osObj.isAndroid || osObj.isIphone) && osObj.isApp) {
    return appToken
  }
  // 微信授权登录
  if (osObj.isWx) {
    const token = Cookies.get('BM-App-Token')
    // 如果微信链接带CODE
    const uriProp = GetRequest('code')
    const uid = getQueryString('uid') || Cookies.get('uid')
    if (!uriProp && !token) {
      // 正常授权流程，直接跳转获取token
      await checkToken()
    }
    // 正常流程，直接返回token
    if (token) {
      return token
    } else if (uriProp) {
      const res = await auditWechat({ code: uriProp, uid: uid, auditWechat: 1 })
      // FIXME 如果CODE已经使用过，没有返回TOKEN，重定向到授权页
      if (res.status_code !== 200) {
        Cookies.set('BM-App-Token', '')
        await checkToken()
      }
    }
  }
  return Cookies.get('BM-App-Token')
}
// REVIEW 此处判断用户登录情况
export function checkToken() {
  // 如果是微信，并且没有本地Token，则直接拼接跳转获取token
  const osObj = getOs()
  if (osObj.isWx) {
    const uriProp = GetRequest('code')
    // ? 'wxb541620e8a98a7c0'
    const appid =
      process.env.NODE_ENV !== 'production'
        ? 'wx55baa3edb8c37fa8'
        : 'wxd0e389ffa2c4f924'
    if (uriProp) {
      const uriProp2 = window.location.href.slice(
        window.location.href.indexOf('STATE') + 5
      )
      // 只带state后面的参数跳转
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        encodeURIComponent(
          window.location.origin + window.location.pathname + uriProp2
        ) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    } else {
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        appid +
        '&redirect_uri=' +
        encodeURIComponent(window.location.href) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  } else {
    // 如果是网页端，没有token弹出手机号登录界面
    if (window.theRouter.currentRoute.name !== 'BeeLogin') {
      window.theRouter.replace({
        path: '/login',
        query: { redirect: window.theRouter.currentRoute.fullPath }
      })
    }
  }
}
// 设置Token
export function setToken(Token) {
  // 如果TOKEN超过三天
  return Cookies.set('BM-App-Token', Token, { expires: 3 })
}
// 清除登录信息
export function removeToken() {
  return Cookies.remove('BM-App-Token')
}

// SECTION 获取多端登陆
export function getVerify() {
  return Cookies.get('BM-Verify-Ver')
}
// 设置多端登陆
export function setVerify(verify) {
  return Cookies.set('BM-Verify-Ver', verify, { expires: 3 })
}

// 判断是否登录
export async function isLogin() {
  return (await getToken()) !== null
}
