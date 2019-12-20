// NOTE 首页
import request from '@/utils/request'
// 首页数据
export function getHome(data) {
  return request({
    url: '/home/index',
    method: 'post',
    timeout: 10000,
    data
  })
}

// 限量蜂抢
export function getBeeLimitList(data) {
  return request({
    url: '/home/limited',
    method: 'post',
    data
  })
}
// 好物优选
export function getPreferenceData(data) {
  return request({
    url: '/product/preference',
    method: 'post',
    data
  })
}

