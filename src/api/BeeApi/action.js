// NOTE 发现
import request from '@/utils/request'
// 公益行动列表
export function getActionList(data) {
  return request({
    url: '/action/list',
    method: 'post',
    data
  })
}
// 公益行动详情
export function getActionDetail(data) {
  return request({
    url: '/action/details',
    method: 'get',
    params: data
  })
}
// 集市动态列表
export function getArticleList(data) {
  return request({
    url: '/market/list',
    method: 'post',
    data
  })
}
// 获取文章详情
export function getArticleDetail(data) {
  return request({
    url: '/market/articleDetails',
    method: 'post',
    params: data
  })
}
