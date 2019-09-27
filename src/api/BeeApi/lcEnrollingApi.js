// 联创大赛接口
import request from '@/utils/request'

// 报名接口
export function join(data) {
  return request({
    url: '/lianchuang/join',
    method: 'post',
    data
  })
}

// 获取验证码
export function getSmsCode(data) {
  return request({
    url: '/lianchuang/getSmsCode',
    method: 'post',
    data
  })
}

// 检查是否报名
export function isJoin(data) {
  return request({
    url: '/lianchuang/checkUser',
    method: 'post',
    data
  })
}
