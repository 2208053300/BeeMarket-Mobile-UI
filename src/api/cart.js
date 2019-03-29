// NOTE 购物车接口
import request from '@/utils/request'
// NOTE 获取猜你喜欢
export function getGuess(data) {
  return request({
    url: '/card/getGuess',
    method: 'get',
    params: data
  })
}
