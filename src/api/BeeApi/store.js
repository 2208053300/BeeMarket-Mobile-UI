// NOTE 店铺
import request from '@/utils/request'
// 店铺主页
export function getStoreDetail(data) {
  return request({
    url: '/store/main',
    method: 'post',
    data
  })
}
// 获取店铺经营许可
export function getStoreLicense(data) {
  return request({
    url: '/store/license',
    method: 'post',
    data
  })
}
// 商家入驻
export function entering(data) {
  return request({
    url: '/merchant/joinus',
    method: 'post',
    data
  })
}
