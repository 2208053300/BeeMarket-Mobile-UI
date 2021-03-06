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

// NOTE 编辑我的礼包
export function packageEdit(data) {
  return request({
    url: '/package/edit',
    method: 'post',
    data
  })
}

// NOTE 清空我的礼包
export function packageEmpty(data) {
  return request({
    url: '/package/empty',
    method: 'post',
    data
  })
}

// NOTE 礼包充值
export function recharge() {
  return request({
    url: '/package/recharge',
    method: 'post'
  })
}
