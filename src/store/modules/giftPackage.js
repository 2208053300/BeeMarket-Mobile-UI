import { packageMine } from '@/api/BeeApi/giftPackage'
const giftPackage = {
  state: {
    selectedTotalNum: 0, // 选择总数量
    selectedTotalAmount: 0, // 选择总金额
    showTip: true, // 是否显示提示
    productList: [], // 礼包中的商品
    package_recharge_balance: 0, // 礼包余额
    use_balance: sessionStorage.getItem('use_package_balance') === 'true'
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
    },
    SET_USE_PACKAGE_BALANCE(state, bool) {
      if (state.package_recharge_balance > 0) {
        state.use_balance = bool
        sessionStorage.setItem('use_package_balance', bool)
      }
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
      if (state.package_recharge_balance > 0) {
        const use_balance = sessionStorage.getItem('use_package_balance')
        if (use_balance == null) {
          state.use_balance = true
        } else {
          state.use_balance = use_balance === 'true'
        }
        sessionStorage.setItem('use_package_balance', state.use_balance)
      } else {
        state.use_balance = false
      }
    }
  }
}

export default giftPackage
