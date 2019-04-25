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
