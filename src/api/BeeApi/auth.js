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
// NOTE 用户登录,检查是否已注册
export function checkPhone(data) {
  return request({
    url: '/auth/register/first',
    method: 'post',
    data
  })
}
// NOTE 用户登录,发送验证码
export function sendSms(data) {
  return request({
    url: '/auth/sendSms',
    method: 'post',
    data
  })
}
// NOTE 用户登录,验证验证码
export function userLogin(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}
