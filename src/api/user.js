// NOTE 数据统计接口
import request from '@/utils/request'

// NOTE 获取用户收货地址
export function getAddressList(data) {
  return request({
    url: '/persion/getAddressList',
    method: 'get',
    params: data
  })
}
// NOTE 获取用户已收藏商品
export function getProductCollected(data) {
  return request({
    url: '/user/favorite/list',
    method: 'post',
    data
  })
}
// NOTE 取消用户已收藏商品
export function cancelCollect(data) {
  return request({
    url: '/product/cancelCollect',
    method: 'post',
    data
  })
}
// history 历史足迹
// 获取历史足迹列表
export function getHistoryList(data) {
  return request({
    url: '/persion/getHistoryList',
    method: 'get',
    params: data
  })
}
// 从历史记录加入收藏
export function collectProduct(data) {
  return request({
    url: '/persion/collectProduct',
    method: 'get',
    params: data
  })
}
// 从历史记录中删除
export function delHistoryItem(data) {
  return request({
    url: '/persion/delHistoryItem',
    method: 'get',
    params: data
  })
}
// NOTE 获取用户已收藏店铺
export function getStoreCollected(data) {
  return request({
    url: '/persion/getStoreCollected',
    method: 'get',
    params: data
  })
}
// NOTE 获取用户订单列表
export function getOrderList(data) {
  return request({
    url: '/persion/getOrderList',
    method: 'get',
    params: data
  })
}
// NOTE 获取用户订单详情
export function getOrderDetail(data) {
  return request({
    url: '/persion/getOrderDetail',
    method: 'get',
    params: data
  })
}
// NOTE 获取售后商品详情
export function getCommodityDetail(data) {
  return request({
    url: '/persion/getCommodityDetail',
    method: 'get',
    params: data
  })
}
// NOTE 获取售后订单列表
export function getAfterList(data) {
  return request({
    url: '/persion/getAfterList',
    method: 'get',
    params: data
  })
}
// NOTE 获取售后单订单列表
export function getAfterDetail(data) {
  return request({
    url: '/persion/getAfterDetail',
    method: 'get',
    params: data
  })
}
