// NOTE 免费送礼
import request from '@/utils/request'
const baseUrl = 'http://localhost:7310/mock/5d24313e04717440c4e50ad9'
// NOTE 免费送礼首页数据
// export function getIndexData(data) {
//   return request({
//     url: 'http://192.168.0.241:1314/freeGift/index',
//     method: 'post',
//     data
//   })
// }

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
// NOTE 获取分享数据
export function freeGiftInvite(data) {
  return request({
    url: '/present/invite',
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

// NOTE 获取免费送礼 送礼历史列表数据
export function getHistoryData(data) {
  return request({
    url: '/present/record',
    method: 'post',
    data
  })
}
