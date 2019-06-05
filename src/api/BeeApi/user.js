// NOTE 用户信息
import request from '@/utils/request'
// 用户基本信息获取
export function baseinfo(data) {
  return request({
    url: '/user/baseinfo',
    method: 'post',
    data
  })
}
// 用户基本信息获取
export function getPersionalCenter(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}
// 用户基本信息修改、更新
export function updateBaseinfo(data) {
  return request({
    url: '/user/baseinfo/update',
    method: 'post',
    data
  })
}
// 用户基本信息 - 头像更新
export function updateHeadImage(data) {
  return request({
    url: '/user/baseinfo/headImage',
    method: 'post',
    data
  })
}
// 获取区域及子区域列表
export function getArea(data) {
  return request({
    url: '/user/addr/sub',
    method: 'post',
    data
  })
}
// 用户收货地址列表
export function getAddressList(data) {
  return request({
    url: '/user/addr',
    method: 'post',
    data
  })
}
// 用户收货地址详情
export function getAddressDetail(data) {
  return request({
    url: '/user/addr/detail',
    method: 'post',
    data
  })
}
// 用户收货地址新增
export function addAddress(data) {
  return request({
    url: '/user/addr/add',
    method: 'post',
    data
  })
}
// 用户收货地址更新
export function updateAddress(data) {
  return request({
    url: '/user/addr/update',
    method: 'post',
    data
  })
}
// 用户收货地址删除
export function delAddress(data) {
  return request({
    url: '/user/addr/del',
    method: 'post',
    data
  })
}
// 用户收货地址设置为默认地址
export function defaultAddress(data) {
  return request({
    url: '/user/addr/default',
    method: 'post',
    data
  })
}
// 购物车商品列表
export function getShopcartList(data) {
  return request({
    url: '/user/shopcart/list',
    method: 'post',
    data
  })
}
// 购物车商品数量修改
export function updateShopcartProductNum(data) {
  return request({
    url: '/user/shopcart/quantity',
    method: 'post',
    data
  })
}
// 购物车商品勾选状态切换
export function checkShopcartProduct(data) {
  return request({
    url: '/user/shopcart/check',
    method: 'post',
    data
  })
}
// 购物车商品删除
export function delShopcartProduct(data) {
  return request({
    url: '/user/shopcart/del',
    method: 'post',
    data
  })
}
// 修改购物车商品 SKU
export function updateShopcartProductSku(data) {
  return request({
    url: '/user/shopcart/sku',
    method: 'post',
    data
  })
}
// 添加商品至购物车
export function addShopcartProduct(data) {
  return request({
    url: '/user/shopcart/add',
    method: 'post',
    data
  })
}
// 消息中心-首页
export function getNewestNews(data) {
  return request({
    url: '/user/news/newestNews',
    method: 'post',
    data
  })
}
// 消息中心-列表
export function getNewestNewsList(data) {
  return request({
    url: '/user/news/list',
    method: 'post',
    data
  })
}
// 我的公益值
export function mineCharityValue(data) {
  return request({
    url: '/user/mineCharityValue',
    method: 'post',
    data
  })
}
// 公益值明细
export function mineCharityValueDetail(data) {
  return request({
    url: '/user/mineCharityValue/detail',
    method: 'post',
    data
  })
}
