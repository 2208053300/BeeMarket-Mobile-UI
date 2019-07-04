// NOTE 免费送礼
import request from '@/utils/request'

// NOTE 活动首页数据
export function getIndexData(data) {
  return request({
    url: 'http://192.168.0.241:1314/freeGift/index',
    method: 'post',
    data
  })
}
