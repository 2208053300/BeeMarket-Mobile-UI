// NOTE 登录权限部分
import request from '@/utils/request'
// NOTE 微信认证
export function auditWechat(data) {
  return request({
    url: '/cart/getCartList',
    method: 'get',
    params: data
  })
}
// NOTE 用户登录
export function wechatLogin() {
  const data = {
    type: 3,
    source: 'H5',
    open_id: 'oAJ-A1pZKvOcwefsAlZScoy73fQI'
  }
  return request({
    url: '/auth/login',
    method: 'get',
    data
  })
}
