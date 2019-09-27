// NOTE 首页
import request from '@/utils/request'
// 首页数据
export function getHome(data) {
  return request({
    url: '/home/index',
    method: 'post',
    data
  })
}

// 用户基本信息获取
export function getBeeLimitList(data) {
  return request({
    url: '/home/limited',
    method: 'post',
    data
  })
}

// 用户基本信息获取
export function getQrcode(data) {
  return request({
    url: '/promote/shareCode',
    method: 'post',
    data
  })
}
