// NOTE 免费送礼
import request from '@/utils/request'

// NOTE 获取免费送礼首页数据
export function getIndexData(data) {
  return request({
    url: '/present/list',
    method: 'post',
    data
  })
}
// NOTE 选择sku后点击免费送礼
export function postSku(data) {
  return request({
    url: '/present/giveData ',
    method: 'post',
    data
  })
}
// NOTE 根据 sku_id 获取分享数据
export function freeGiftInvite(data) {
  return request({
    url: '/present/invite',
    method: 'post',
    data
  })
}
// NOTE 根据 送礼记录 id 获取分享数据
export function getShareData(data) {
  return request({
    url: '/present/share',
    method: 'post',
    data
  })
}

// NOTE 开奖页弹框数据
export function linkData(data) {
  return request({
    url: '/present/linkData',
    method: 'post',
    data
  })
}

// NOTE 开奖页点击抽奖
export function participate(data) {
  return request({
    url: '/present/participate',
    method: 'post',
    data
  })
}

// NOTE 开奖页 详情
export function getDetail(data) {
  return request({
    url: '/present/detail',
    method: 'post',
    data
  })
}
// NOTE 开奖引导下载 详情
export function downInfo(data) {
  return request({
    url: '/present/downInfo',
    method: 'post',
    data
  })
}

// NOTE 获取免费送礼 送礼历史列表数据
export function getHistoryData(data) {
  return request({
    url: '/present/record',
    method: 'post',
    data
  })
}
