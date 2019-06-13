// NOTE 商品相关
import request from '@/utils/request'
// 商品分类列表
export function getCategory1(data) {
  return request({
    url: '/product/category',
    method: 'post',
    data
  })
}
// 商品分类列表详情
export function getCategory2(data) {
  return request({
    url: '/product/category/content',
    method: 'post',
    data
  })
}
// 商品列表顶部分类信息
export function getSecondCategory(data) {
  return request({
    url: '/product/category/second',
    method: 'post',
    data
  })
}
// 搜索内容建议
export function searchSuggust(data) {
  return request({
    url: '/product/suggest',
    method: 'post',
    data
  })
}
// 商品列表（通用）
export function getProductList(data) {
  return request({
    url: '/product/list',
    method: 'post',
    data
  })
}
// 获取商品基本信息
export function getProductDetail(data) {
  return request({
    url: '/product/info',
    method: 'post',
    data
  })
}
// 加入收藏
export function collectProduct(data) {
  return request({
    url: '/product/collect',
    method: 'post',
    data
  })
}
// 取消收藏
export function cancelCollect(data) {
  return request({
    url: '/product/cancelCollect',
    method: 'post',
    data
  })
}
// 获取商品props信息
export function getProductProps(data) {
  return request({
    url: '/product/props',
    method: 'post',
    data
  })
}
// 获取商品SKU信息
export function getProductSku(data) {
  return request({
    url: '/product/sku',
    method: 'post',
    data
  })
}
// 评价列表
export function getAssessment(data) {
  return request({
    url: '/product/comments',
    method: 'post',
    data
  })
}
