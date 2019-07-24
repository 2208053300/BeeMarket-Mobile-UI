function goPay(query, type) {
  const appid =
    // ? 'wxb541620e8a98a7c0'
    process.env.NODE_ENV !== 'production'
      ? 'wx55baa3edb8c37fa8'
      : 'wxd0e389ffa2c4f924'
  // 从新手专享领取任务奖励
  const route =
    type !== 'task' ? '/#/category/details/payOrder?' : '/beeTask#/payOrder'
  window.location.href =
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=` +
    encodeURIComponent(window.location.origin + route + query) +
    '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}
export function goPayFromOrder(orderNo) {
  goPay('orderNo=' + orderNo)
}
export function goPayFromPayInfo(payInfo, type) {
  let query = 'balance=' + payInfo.balance
  query += '&count_down=' + payInfo.count_down
  query += '&pay_amount=' + payInfo.pay_amount
  query += '&alipay=' + payInfo.pay_methods.alipay
  query += '&blpay=' + payInfo.pay_methods.blpay
  query += '&wxpay=' + payInfo.pay_methods.wxpay
  query += '&trade_no=' + payInfo.trade_no
  goPay(query, type)
}
