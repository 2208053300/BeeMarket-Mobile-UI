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
// 公益行动 参与助力
export function joinAction(data) {
  return request({
    url: '/action/shareJoinBoost',
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
// 公益行动 - 分享详情
export function getShareDetail(data) {
  return request({
    url: '/action/shareDetail',
    method: 'post',
    data
  })
}
// 公益行动分享详情 - 参与助力
export function helpAction(data) {
  return request({
    url: '/action/shareJoinBoost',
    method: 'post',
    data
  })
}
// 活动详情
export function activityDetail(data) {
  return request({
    url: '/market/planDetails',
    method: 'post',
    data
  })
}
