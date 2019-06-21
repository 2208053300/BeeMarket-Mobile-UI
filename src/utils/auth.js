import { getOs } from '@/utils'
// import { Base64 } from 'js-base64'
import Cookies from 'js-cookie'
import { auditWechat } from '@/api/BeeApi/auth'
import { GetRequest } from '@/utils/index'
// 获取Token
export async function getToken() {
  const osObj = getOs()
  if (osObj.isWx) {
    const token = localStorage.getItem('BM-App-Token')
    const uriProp = GetRequest('code')
    if (token) {
      return token
    } else if (
      uriProp &&
      !token &&
      localStorage.getItem('BM-App-Token') !== 'waiting'
    ) {
      localStorage.setItem('BM-App-Token', 'waiting')
      // 微信授权登录
      await auditWechat({ code: uriProp })
      // // FIXME 如果CODE已经使用过，没有返回TOKEN，重定向到授权页
      if (
        localStorage.getItem('BM-App-Token') === 'waiting' ||
        !localStorage.getItem('BM-App-Token')
      ) {
        const uriProp2 = GetRequest('state')
        // 只带state后面的参数跳转
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb541620e8a98a7c0&redirect_uri=' +
          encodeURIComponent(
            window.location.origin + window.location.pathname + uriProp2.slice(5)
          ) +
          '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    } else {
      console.log('微信CODE为空')
    }
    return localStorage.getItem('BM-App-Token')
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('token')
  } else {
    return localStorage.getItem('BM-App-Token')
  }
  // return 'eyJhcHAiOiJCZWVNYXJrZXQgLSBBUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzcmMiOiJINSIsInZlciI6MSwiaWF0IjoxNTYxMTA0NDQ4LCJleHAiOjE1NjM2OTY0NDgsImp0aSI6IjljOTg3ODI4OTNmYjExZTliZjQ0MDAwMDVkMGM5MDQwIiwic2VjIjoiNTZhZDhlYmJmOWQzODQ3ODBkNzRhNzY2MjM3OGUzYjciLCJzaWciOiJlZWQ0NWJkMWUwNGFkOTdhM2FiOGYxZTFiOTg2NWU0ZmRhOGUyOTZlMzk5OTQxZDgwOTQ3ZTQxZDhkOTI1YTQ0In0.BhR7v2pVyyy9TSFbjV0QVHl9VrGO5lRQV_sHVqXdaBQ'
}
// 设置Token
// REVIEW sessionStorage才会在关闭浏览器的时候被清除
export function setToken(Token) {
  return localStorage.setItem('BM-App-Token', Token)
}

// 获取多端登陆
export function getVerify() {
  const osObj = getOs()
  if (osObj.isWx) {
    return localStorage.getItem('BM-Verify-Ver')
  } else if ((osObj.isIphone || osObj.isAndroid) && osObj.isApp) {
    return Cookies.get('BM-Verify-Ver')
  } else {
    return localStorage.getItem('BM-Verify-Ver')
  }
}
// 设置多端登陆
export function setVerify(verify) {
  return localStorage.setItem('BM-Verify-Ver', verify)
}

// 判断是否登录
export function isLogin() {
  return getToken() !== null
}
// 清除登录信息
export function removeToken() {
  return localStorage.removeItem('BM-App-Token')
}
// REVIEW 此处判断用户登录情况
export function checkToken() {
  // 如果是微信，并且没有本地Token，则直接拼接跳转获取token
  const osObj = getOs()
  if (osObj.isWx) {
    const uriProp = GetRequest('code')
    if (uriProp) {
      window.location.reload()
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
      location.reload()
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
