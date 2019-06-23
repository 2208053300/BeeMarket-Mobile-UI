import { getOs } from '@/utils'
// import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'
import { auditWechat } from '@/api/BeeApi/auth'
import { GetRequest } from '@/utils/index'
// 获取Token
export async function getToken() {
  const osObj = getOs()
  if (osObj.isWx) {
    const token = sessionStorage.getItem('BM-App-Token')
    const uriProp = GetRequest('code')
    if (token) {
      return token
    } else if (
      uriProp &&
      !token &&
      sessionStorage.getItem('BM-App-Token') !== 'waiting'
    ) {
      sessionStorage.setItem('BM-App-Token', 'waiting')
      // 微信授权登录
      await auditWechat({ code: uriProp })
      // // FIXME 如果CODE已经使用过，没有返回TOKEN，重定向到授权页
      if (
        sessionStorage.getItem('BM-App-Token') === 'waiting' ||
        !sessionStorage.getItem('BM-App-Token')
      ) {
        const uriProp2 = GetRequest('state')
        // 只带state后面的参数跳转
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
          encodeURIComponent(
            window.location.origin +
              window.location.pathname +
              uriProp2.slice(5)
          ) +
          '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    } else {
      checkToken()
    }
    return sessionStorage.getItem('BM-App-Token')
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('token')
  } else {
    return sessionStorage.getItem('BM-App-Token')
  }
  // sessionStorage.setItem('BM-Verify-Ver', 1)
  // return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzcmMiOiJpT1MiLCJ2ZXIiOjEsImlhdCI6MTU2MTE4Mzg2MSwiZXhwIjoxNTYzNzc1ODYxLCJqdGkiOiI4MmIxZDQ5MDk0YjQxMWU5OGRjMzAwMDA1ZDBkYzY3NSIsInNlYyI6ImRmZGExYjk1NDRhZmI0Nzg0ZGQ4MGNiMWY1MmNkZTk0Iiwic2lnIjoiNzU4OWZhOGFmMDE5YjhlMGRhNzBhNjM4M2YyNmQ5YzQ0N2YwZWNjMzExYTk0YmU1ZTJhY2QyNGI1MzhhOWI4NSJ9.T3P6MIBhNlJQbBg3k_tZoNuaUu7u-6yGhRaFdYk0V8k'
}
// 设置Token
// REVIEW sessionStorage才会在关闭浏览器的时候被清除
export function setToken(Token) {
  window.onunload = function() {
    removeToken()
  }
  return sessionStorage.setItem('BM-App-Token', Token)
}

// 获取多端登陆
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
// 清除登录信息
export function removeToken() {
  return sessionStorage.removeItem('BM-App-Token')
}
// REVIEW 此处判断用户登录情况
export function checkToken() {
  // 如果是微信，并且没有本地Token，则直接拼接跳转获取token
  const osObj = getOs()
  if (osObj.isWx) {
    const uriProp = GetRequest('code')
    if (uriProp) {
      const uriProp2 = GetRequest('state')
      // 只带state后面的参数跳转
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
        encodeURIComponent(
          window.location.origin + window.location.pathname + uriProp2.slice(5)
        ) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    } else {
      window.location.href =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
        encodeURIComponent(window.location.href) +
        '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    // 如果是APP，获取APP放在cookie里的token
    const token = Cookies.get('token')
    if (token) {
      setToken(token)
    } else {
      console.log('没得到token', Cookies.get())
    }
  } else {
    // 如果是网页端，没有token弹出手机号登录界面
    import('@/route/index').then(module => {
      module.default.push('/login')
    })
  }
}
