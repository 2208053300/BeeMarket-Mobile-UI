// NOTE 登录权限部分
import request from '@/utils/request'
// NOTE 微信认证
export function auditWechat(data) {
  return request({
    url: '/auth/h5login',
    method: 'post',
    data
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
// NOTE 用户登录,发送验证码
export function h5register(data) {
  return request({
    url: '/auth/h5register',
    method: 'post',
    data
  })
}
// NOTE 用户首次绑定手机号,验证短信验证码
export function bindPhone(data) {
  return request({
    url: '/auth/bind',
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

// 设置/修改 登录密码第一步，验证短信
export function forgotFirst(data) {
  return request({
    url: '/auth/forgot/first',
    method: 'post',
    data
  })
}
// 账户安全信息 获取手机号码
export function forgot(data) {
  return request({
    url: '/auth/forgot',
    method: 'post',
    data
  })
}
// 获取微信签名
export function getWechatSign(data) {
  return request({
    url: '/wechat/getSign',
    method: 'post',
    data
  })
}
