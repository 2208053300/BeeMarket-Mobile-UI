// NOTE 商品分类列表接口
import request from '@/utils/request'
// NOTE 获取一级分类
export function getCategory1(data) {
  return request({
    url: '/category/getCategory1',
    method: 'get',
    params: data
  })
}
// NOTE 获取二级分类
export function getCategory2(data) {
  return request({
    url: '/category/getCategory2',
    method: 'get',
    params: data
  })
}
// NOTE 根据二级分类 id 获取三级分类
export function getCategoryThird(data) {
  return request({
    url: '/category/getCategoryThird',
    method: 'post',
    params: data
  })
}
// NOTE 根据三级分类 id 获取商品列表分类
export function getCategoryGoodsList(data) {
  return request({
    url: '/category/getCategoryGoodsList',
    method: 'post',
    params: data
  })
}
// NOTE 获取搜索历史
export function getSearchHistory(data) {
  return request({
    url: '/category/getSearchHistory',
    method: 'get',
    params: data
  })
}
// NOTE 获取为你推荐
export function getRecommendData(data) {
  return request({
    url: '/category/getRecommendData',
    method: 'get',
    params: data
  })
}
// NOTE 获取商品详情
export function getCommodityDetails(data) {
  return request({
    url: '/category/getCommodityDetails',
    method: 'get',
    params: data
  })
}
// NOTE 获取评价
export function getAssessment(data) {
  return request({
    url: '/category/getAssessment',
    method: 'get',
    params: data
  })
}
// NOTE 获取默认收货地址
export function getDefaultAddress(data) {
  return request({
    url: '/category/getDefaultAddress',
    method: 'get',
    params: data
  })
}
// NOTE 获取订单商品详情
export function getOrderCommodity(data) {
  return request({
    url: '/category/getOrderCommodity',
    method: 'get',
    params: data
  })
}
// NOTE 获取店铺详情
export function getStoreDetails(data) {
  return request({
    url: '/category/getStoreDetails',
    method: 'get',
    params: data
  })
}
