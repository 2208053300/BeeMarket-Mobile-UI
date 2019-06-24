import { getOs } from '@/utils'
// import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'
import { auditWechat } from '@/api/BeeApi/auth'
import { GetRequest, getQueryString } from '@/utils/index'

// SECTION 获取Token
export async function getToken() {
  const osObj = getOs()
  if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('token')
  }
  // 微信授权登录
  if (osObj.isWx) {
    const token = sessionStorage.getItem('BM-App-Token')
    const uriProp = GetRequest('code')
    const uid = getQueryString('uid')
    if (!uriProp && !token) {
      await checkToken()
    }
    if (token && token !== 'waiting') {
      return token
    } else if (uriProp && token !== 'waiting') {
      sessionStorage.setItem('BM-App-Token', 'waiting')
      await auditWechat({ code: uriProp, uid: uid })
      // FIXME 如果CODE已经使用过，没有返回TOKEN，重定向到授权页
      if (sessionStorage.getItem('BM-App-Token') === 'waiting') {
        console.log('微信授权失败，code')
        await checkToken()
      }
    }
  }
  return sessionStorage.getItem('BM-App-Token')
}
// REVIEW 此处判断用户登录情况
export function checkToken() {
  // 如果是微信，并且没有本地Token，则直接拼接跳转获取token
  const osObj = getOs()
  if (osObj.isWx) {
    const uriProp = GetRequest('code')
    if (uriProp) {
      const uriProp2 = window.location.href.slice(
        window.location.href.indexOf('STATE') + 5
      )
      // 只带state后面的参数跳转
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
        encodeURIComponent(
          window.location.origin + window.location.pathname + uriProp2
        ) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    } else {
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
        encodeURIComponent(window.location.href) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  } else {
    // 如果是网页端，没有token弹出手机号登录界面
    import('@/route/index').then(module => {
      module.default.replace('/login')
    })
  }
}
// 设置Token
// REVIEW sessionStorage才会在关闭浏览器的时候被清除
export function setToken(Token) {
  return sessionStorage.setItem('BM-App-Token', Token)
}
// 清除登录信息
export function removeToken() {
  return sessionStorage.removeItem('BM-App-Token')
}

// SECTION 获取多端登陆
export function getVerify() {
  const osObj = getOs()
  if (osObj.isWx) {
    return sessionStorage.getItem('BM-Verify-Ver')
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('BM-Verify-Ver')
  } else {
    return sessionStorage.getItem('BM-Verify-Ver')
  }
}
// 设置多端登陆
export function setVerify(verify) {
  return sessionStorage.setItem('BM-Verify-Ver', verify)
}

// 判断是否登录
export async function isLogin() {
  return (await getToken()) !== null
}
