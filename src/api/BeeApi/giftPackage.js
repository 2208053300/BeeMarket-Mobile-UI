// NOTE 农礼包
import request from '@/utils/request'

// NOTE 活动首页数据
export function getIndexData(data) {
  return request({
    url: '/package/list',
    method: 'post',
    data
  })
}

// NOTE 添加商品到农礼包
export function packageAdd(data) {
  return request({
    url: '/package/add',
    method: 'post',
    data
  })
}

// NOTE 我的礼包
export function packageMine(data) {
  return request({
    url: '/package/mine',
    method: 'post',
    data
  })
}
