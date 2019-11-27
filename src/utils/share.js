import { getOs } from '@/utils'
import wxapi from '@/utils/wxapi'

// 使APP显示分享图标
export function showShareIcon() {
  const osObj = getOs()
  if (osObj.isIphone && osObj.isApp) {
    window.webkit.messageHandlers.showShareIcon.postMessage({ mark: true })
  } else if (osObj.isAndroid && osObj.isApp) {
    window.beeMarket.showShareIcon(true)
  }
}

// 使APP显示分享图标
export function hideShareIcon() {
  const osObj = getOs()
  if (osObj.isIphone && osObj.isApp) {
    window.webkit.messageHandlers.showShareIcon.postMessage({ mark: false })
  } else if (osObj.isAndroid && osObj.isApp) {
    window.beeMarket.showShareIcon(false)
  }
}

// 设置点击分享后的回调
/**
 * 对微信和app设置分享配置
 * @param options
 * {
 *   title: '标题',
 *   desc: '描述',
 *   imgUrl: '分享图标链接(可选)',
 *   link: '分享链接'
 * }
 */
export function setShareOptions(options) {
  const osObj = getOs()
  options.imgUrl = options.imgUrl || 'https://img.fengjishi.com/app/images/share_logo.jpg'
  wxapi.wxShare({
    title: options.title,
    desc: options.desc,
    imgUrl: options.imgUrl,
    link: options.link
  })
  window.appShare = () => {
    if (osObj.isIphone && osObj.isApp) {
      window.webkit.messageHandlers.ToShare.postMessage({
        title: options.title,
        desc: options.desc,
        img_path: options.imgUrl,
        // 地址应该放 web 站 网页
        url: options.link
      })
    } else if (osObj.isAndroid && osObj.isApp) {
      window.beeMarket.ToShare(
        options.title,
        options.desc,
        options.imgUrl,
        options.link
      )
    }
  }
}
