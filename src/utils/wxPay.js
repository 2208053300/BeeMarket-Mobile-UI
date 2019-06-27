function goPay(query) {
  window.location.href =
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd0e389ffa2c4f924&redirect_uri=' +
    encodeURIComponent(
      window.location.origin + '/#/category/details/payOrder?' + query
    ) +
    '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
}
export function goPayFromOrder(orderNo) {
  goPay('orderNo=' + orderNo)
}
export function goPayFromPayInfo(payInfo) {
  let query = 'balance=' + payInfo.balance
  query += '&count_down=' + payInfo.count_down
  query += '&pay_amount=' + payInfo.pay_amount
  query += '&alipay=' + payInfo.pay_methods.alipay
  query += '&blpay=' + payInfo.pay_methods.blpay
  query += '&wxpay=' + payInfo.pay_methods.wxpay
  query += '&trade_no=' + payInfo.trade_no
  goPay(query)
}
