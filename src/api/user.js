// NOTE 数据统计接口
import request from '@/utils/request'
// ANCHOR 商品
// NOTE 获取用户收货地址
export function getAddressList(data) {
  return request({
    url: '/persion/getAddressList',
    method: 'get',
    params: data
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
