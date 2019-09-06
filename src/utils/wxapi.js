/**
 * 微信js-sdk
 */
import wx from 'weixin-js-sdk'
import { getWechatSign } from '@/api/BeeApi/auth'
import { getOs } from '@/utils/index'

const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  async wxRegister(callback) {
    const osObj = getOs()
    if (!osObj.isWx) {
      console.log('非微信环境')
      return
    }
    const res = await getWechatSign({
      url: window.location.href.split('#')[0]
    })
    const data = res.data // PS: 这里根据你接口的返回值来使用
    wx.config({
      debug: false, // 开启调试模式
      appId: data.appId, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'chooseWXPay',
        'updateAppMessageShareData',
        'updateTimelineShareData',
        'openAddress',
        'onMenuShareAppMessage',
        'onMenuShareTimeline'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(res => {
      // 如果需要定制ready回调方法
      if (callback) {
        callback()
      }
    })
  },
  /**
   * [ShareTimeline 微信分享到朋友圈，qq分享到空间 1.4.0版本]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline(option) {
    wx.updateTimelineShareData({
      title: option.title, // 分享标题
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  /**
   * [ShareAppMessage qq、微信分享给朋友 1.4.0版本]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage(option) {
    wx.updateAppMessageShareData({
      title: option.title, // 分享标题
      desc: option.desc, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success() {
        // 用户成功分享后执行的回调函数
        option.success()
      },
      cancel() {
        // 用户取消分享后执行的回调函数
        option.error()
      }
    })
  },
  // 微信分享
  wxShare(option) {
    const osObj = getOs()
    if (!osObj.isWx) {
      console.log('非微信环境')
      return
    }
    this.wxRegister(() => {
      this.ShareAppMessage(option)
      this.ShareTimeline(option)
    })
  }
}
export default wxApi
