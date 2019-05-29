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
// 获取商品基本信息
export function getProductDetail(data) {
  return request({
    url: '/product/info',
    method: 'post',
    data
  })
}
