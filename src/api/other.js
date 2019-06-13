// NOTE 微信页面
import request from '@/utils/request'

// NOTE 获取赠送礼物详情
export function getBeeGiftList(data) {
  return request({
    url: '/other/getBeeGiftList',
    method: 'get',
    params: data
  })
}
