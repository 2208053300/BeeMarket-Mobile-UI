// NOTE 用户信息
import request from '@/utils/request'
// 用户基本信息获取
export function baseinfo(data) {
  return request({
    url: '/user/baseinfo',
    method: 'post',
    data
  })
}
// 用户基本信息获取
export function getPersionalCenter(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data
  })
}
// 个人资料 用户基本信息获取
export function getPorfileData(data) {
  return request({
    url: '/user/baseinfo',
    method: 'post',
    data
  })
}
// 用户基本信息修改、更新
export function updateBaseinfo(data) {
  return request({
    url: '/user/baseinfo/update',
    method: 'post',
    data
  })
}
// 用户基本信息 - 头像更新
export function updateHeadImage(data) {
  return request({
    url: '/user/baseinfo/headImage',
    method: 'post',
    data
  })
}
// 获取区域及子区域列表
export function getArea(data) {
  return request({
    url: '/user/addr/sub',
    method: 'post',
    data
  })
}
// 用户收货地址列表
export function getAddressList(data) {
  return request({
    url: '/user/addr',
    method: 'post',
    data
  })
}
// 用户收货地址详情
export function getAddressDetail(data) {
  return request({
    url: '/user/addr/detail',
    method: 'post',
    data
  })
}
// 用户收货地址新增
export function addAddress(data) {
  return request({
    url: '/user/addr/add',
    method: 'post',
    data
  })
}
// 用户收货地址更新
export function updateAddress(data) {
  return request({
    url: '/user/addr/update',
    method: 'post',
    data
  })
}
// 用户收货地址删除
export function delAddress(data) {
  return request({
    url: '/user/addr/del',
    method: 'post',
    data
  })
}
// 用户收货地址设置为默认地址
export function defaultAddress(data) {
  return request({
    url: '/user/addr/default',
    method: 'post',
    data
  })
}
// 购物车商品列表
export function getShopcartList(data) {
  return request({
    url: '/user/shopcart/list',
    method: 'post',
    data
  })
}
// 购物车商品数量修改
export function updateShopcartProductNum(data) {
  return request({
    url: '/user/shopcart/quantity',
    method: 'post',
    data
  })
}
// 购物车商品勾选状态切换
export function checkShopcartProduct(data) {
  return request({
    url: '/user/shopcart/check',
    method: 'post',
    data
  })
}
// 购物车商品删除
export function delShopcartProduct(data) {
  return request({
    url: '/user/shopcart/del',
    method: 'post',
    data
  })
}
// 修改购物车商品 SKU
export function updateShopcartProductSku(data) {
  return request({
    url: '/user/shopcart/sku',
    method: 'post',
    data
  })
}
// 添加商品至购物车
export function addShopcartProduct(data) {
  return request({
    url: '/user/shopcart/add',
    method: 'post',
    data
  })
}
// 我的售后单
export function getAfterList(data) {
  return request({
    url: '/user/customer',
    method: 'post',
    data
  })
}
// 消息中心-首页
export function getNewestNews(data) {
  return request({
    url: '/user/news/newestNews',
    method: 'post',
    data
  })
}
// 我的售后单详情
export function getAfterDetail(data) {
  return request({
    url: '/user/customer/detail',
    method: 'post',
    data
  })
}
// 消息中心-列表
export function getNewestNewsList(data) {
  return request({
    url: '/user/news/list',
    method: 'post',
    data
  })
}
// 我的售后单物流详情
export function getAfterLogDetail(data) {
  return request({
    url: '/user/customer/express',
    method: 'post',
    data
  })
}
// 我的公益值
export function mineCharityValue(data) {
  return request({
    url: '/user/mineCharityValue',
    method: 'post',
    data
  })
}
// 我的售后单进度详情
export function getAfterProgressDetail(data) {
  return request({
    url: '/user/customer/schedule',
    method: 'post',
    data
  })
}
// 公益值明细
export function mineCharityValueDetail(data) {
  return request({
    url: '/user/mineCharityValue/detail',
    method: 'post',
    data
  })
}
// 我的售后单沟通详情
export function getAftercommunicationDetail(data) {
  return request({
    url: '/user/customer/interflow',
    method: 'post',
    data
  })
}
// 我的订单
export function getOrderList(data) {
  return request({
    url: '/user/order',
    method: 'post',
    data
  })
}
// 我的售后单删除售后单
export function delAfterOrder(data) {
  return request({
    url: '/user/customer/delete',
    method: 'post',
    data
  })
}
// 我的售后单撤销售后单
export function cancelAfterOrder(data) {
  return request({
    url: '/user/customer/cancel',
    method: 'post',
    data
  })
}
// 我的售后单确认完成售后单
export function confirmAfterOrder(data) {
  return request({
    url: '/user/customer/confirm',
    method: 'post',
    data
  })
}
// 我的售后单 填写物流信息
export function fillLogisticsInfo(data) {
  return request({
    url: '/user/customer/write',
    method: 'post',
    data
  })
}
// 我的售后单 获取物流公司列表数据
export function getExpressData(data) {
  return request({
    url: '/user/customer/getExpress',
    method: 'post',
    data
  })
}
// 我的售后单 选择售后类型
export function selectAfterType(data) {
  return request({
    url: '/user/customer/select',
    method: 'post',
    data
  })
}
// 我的售后单 申请页数据
export function applyPageData(data) {
  return request({
    url: '/user/customer/applyPage',
    method: 'post',
    data
  })
}
// 我的售后单 申请页数据
export function submitApplyData(data) {
  return request({
    url: '/user/customer/submit',
    method: 'post',
    data
  })
}
// 邀请二维码
export function getQrcode(data) {
  return request({
    url: '/user/invite/qrcode',
    method: 'post',
    data
  })
}

// 个人中心 获取历史足迹数据
export function getHistoryList(data) {
  return request({
    url: '/user/history',
    method: 'post',
    data
  })
}
// NOTE 获取用户已收藏商品/店铺
export function getCollected(data) {
  return request({
    url: '/user/favorite/list',
    method: 'post',
    data
  })
}
// 个人中心 删除历史
export function delHistoryItem(data) {
  return request({
    url: '/user/history/delete',
    method: 'post',
    data
  })
}
// NOTE 取消用户已收藏商品/店铺
export function cancelCollect(data) {
  return request({
    url: '/product/cancelCollect',
    method: 'post',
    data
  })
}
// NOTE 获取客服帮助首页数据
export function getServiceIndex(data) {
  return request({
    url: '/user/customerService/list',
    method: 'post',
    data
  })
}
// NOTE 客服帮助 根据问题类型ID获取列表
export function getSortList(data) {
  return request({
    url: '/user/customerService/problemTypeList',
    method: 'post',
    data
  })
}
// NOTE 客服帮助 根据问题ID获取答案
export function getAnswer(data) {
  return request({
    url: '/user/customerService/detail',
    method: 'post',
    data
  })
}
// NOTE 客服帮助 问题有用
export function solved(data) {
  return request({
    url: '/user/customerService/solved',
    method: 'post',
    data
  })
}
// NOTE 客服帮助 问题没用
export function unsolved(data) {
  return request({
    url: '/user/customerService/unsolved',
    method: 'post',
    data
  })
}
// 蜂友圈 - 首页API
export function getPartner(data) {
  return request({
    url: '/user/partner/index',
    method: 'post',
    data
  })
}
// 蜂友圈 - 首页的好友列表
export function getFriends(data) {
  return request({
    url: '/user/partner/friends_list',
    method: 'post',
    data
  })
}
// 蜂友圈 - 返回可领取余额
export function getReceiveNum(data) {
  return request({
    url: '/user/partner/can_receive',
    method: 'post',
    data
  })
}
// 蜂友圈 - 领取余额
export function harvestBalance(data) {
  return request({
    url: '/user/partner/receive',
    method: 'post',
    data
  })
}
// 蜂友圈 - 我的收益
export function getMyEarning(data) {
  return request({
    url: '/user/partner/profit_record',
    method: 'post',
    data
  })
}
// 蜂友圈 - 我的收益
export function remindLogin(data) {
  return request({
    url: '/user/partner/remind_user',
    method: 'post',
    data
  })
}
// 返回用户是否有未读消息
export function getUserMsg(data) {
  return request({
    url: '/user/news/get_msg',
    method: 'post',
    data
  })
}
