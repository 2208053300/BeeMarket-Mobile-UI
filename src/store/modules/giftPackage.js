import { packageMine } from '@/api/BeeApi/giftPackage'
const giftPackage = {
  state: {
    selectedTotalNum: 0, // 选择总数量
    selectedTotalAmount: 0, // 选择总金额
    showTip: true, // 是否显示提示
    productList: [], // 礼包中的商品
    package_recharge_balance: 0 // 礼包余额
  },
  mutations: {
    SET_SELECTED_TOTAL_NUM(state, num) {
      state.selectedTotalNum = num
    },
    SET_SELECTED_TOTAL_AMOUNT(state, amount) {
      state.selectedTotalAmount = amount
    },
    SET_SHOW_TIP(state, bool) {
      state.showTip = bool
    }
  },
  actions: {
    // 获取我的礼包信息
    async GET_GIFT_PACKAGE_INFO({ state }) {
      const res = await packageMine()
      state.selectedTotalNum = res.data.selected_total_num
      state.selectedTotalAmount = res.data.selected_total_amount
      state.productList = res.data.product_list
      state.package_recharge_balance = res.data.pgpackage_recharge_balance
    }
  }
}

export default giftPackage
